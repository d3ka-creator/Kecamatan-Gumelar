import React, { useState, useEffect, useRef } from 'react';
import { 
  MapPin, 
  Search, 
  Filter, 
  Phone, 
  Clock, 
  User, 
  Building2, 
  GraduationCap, 
  HeartPulse, 
  Compass, 
  ShieldAlert, 
  X,
  ExternalLink,
  Layers
} from 'lucide-react';
import { MAP_FACILITIES, TOURISM_DESTINATIONS, KECAMATAN_INFO } from '../data/gumelarData';
import { FacilityMarker, MapFacilityCategory } from '../types';
import L from 'leaflet';

export const InteractiveMap: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFacility, setSelectedFacility] = useState<FacilityMarker | null>(null);

  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  // Combine facilities with tourism destinations into markers
  const allMarkers: FacilityMarker[] = [
    ...MAP_FACILITIES,
    ...TOURISM_DESTINATIONS.map(d => ({
      id: `w-${d.id}`,
      nama: d.nama,
      kategori: 'wisata' as MapFacilityCategory,
      desa: d.desa,
      alamat: `Desa ${d.desa}, Kecamatan Gumelar`,
      koordinat: d.koordinat,
      deskripsi: d.deskripsi,
      kontak: 'Pokdarwis: 0812-2890-5541',
      jamOperasional: d.jamBuka,
      penanggungJawab: `Pengelola Wisata Desa ${d.desa}`
    }))
  ];

  const filteredFacilities = allMarkers.filter(f => {
    const matchCat = selectedCategory === 'semua' || f.kategori === selectedCategory;
    const matchQuery = f.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       f.desa.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       f.alamat.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchQuery;
  });

  // Category visual styles and icons
  const getCategoryColor = (cat: MapFacilityCategory) => {
    switch (cat) {
      case 'kesehatan': return '#e11d48'; // rose
      case 'pendidikan': return '#2563eb'; // blue
      case 'pemerintahan': return '#059669'; // emerald
      case 'wisata': return '#d97706'; // amber
      case 'posko_siaga': return '#dc2626'; // red
      default: return '#475569';
    }
  };

  const getCategoryLabel = (cat: MapFacilityCategory) => {
    switch (cat) {
      case 'kesehatan': return 'Fasilitas Kesehatan';
      case 'pendidikan': return 'Fasilitas Pendidikan';
      case 'pemerintahan': return 'Kantor Pemerintahan';
      case 'wisata': return 'Destinasi Wisata';
      case 'posko_siaga': return 'Posko Siaga Bencana';
      default: return cat;
    }
  };

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: KECAMATAN_INFO.pusatKoordinat,
        zoom: 13,
        scrollWheelZoom: true,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      const markersGroup = L.layerGroup().addTo(map);
      markersLayerRef.current = markersGroup;
      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update map markers when filteredFacilities change
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;

    markersLayerRef.current.clearLayers();

    filteredFacilities.forEach(facility => {
      const color = getCategoryColor(facility.kategori);

      const customIcon = L.divIcon({
        className: 'custom-map-pin',
        html: `
          <div style="
            background-color: ${color};
            width: 30px;
            height: 30px;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            display: flex;
            align-items: center;
            justify-content: center;
            border: 2px solid white;
            box-shadow: 0 4px 6px rgba(0,0,0,0.3);
            cursor: pointer;
          ">
            <div style="
              width: 10px;
              height: 10px;
              background-color: white;
              border-radius: 50%;
              transform: rotate(45deg);
            "></div>
          </div>
        `,
        iconSize: [30, 30],
        iconAnchor: [15, 30],
        popupAnchor: [0, -28]
      });

      const marker = L.marker(facility.koordinat, { icon: customIcon });

      const popupContent = `
        <div style="font-family: inherit; font-size: 12px; max-width: 200px;">
          <strong style="color: #0f172a; display: block; margin-bottom: 2px;">${facility.nama}</strong>
          <span style="display: inline-block; padding: 2px 6px; border-radius: 4px; font-size: 10px; font-weight: bold; background: #e2e8f0; color: #334155; margin-bottom: 4px;">
            Desa ${facility.desa}
          </span>
          <p style="margin: 0; color: #475569; font-size: 11px;">${facility.alamat}</p>
        </div>
      `;

      marker.bindPopup(popupContent);
      marker.on('click', () => {
        setSelectedFacility(facility);
      });

      markersLayerRef.current?.addLayer(marker);
    });

    // If there are markers, fit bounds slightly
    if (filteredFacilities.length > 0 && mapInstanceRef.current) {
      const bounds = L.latLngBounds(filteredFacilities.map(f => f.koordinat));
      mapInstanceRef.current.fitBounds(bounds, { padding: [50, 50], maxZoom: 14 });
    }
  }, [filteredFacilities]);

  const handleCenterOnFacility = (facility: FacilityMarker) => {
    setSelectedFacility(facility);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView(facility.koordinat, 15, { animate: true });
    }
  };

  return (
    <section className="py-12 bg-white border-b border-slate-200">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-2">
              <Compass className="w-3.5 h-3.5" />
              Sistem Informasi Geografis (SIG)
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Peta Digital Fasilitas & Infrastruktur
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Peta interaktif titik lokasi fasilitas kesehatan, sarana pendidikan, kantor pemerintahan desa, posko siaga kebencanaan, serta destinasi wisata di Kecamatan Gumelar.
            </p>
          </div>

          {/* Search box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari puskesmas, sekolah, balai desa..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 focus:ring-2 focus:ring-emerald-500 shadow-2xs"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setSelectedCategory('semua')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedCategory === 'semua' ? 'bg-slate-900 text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Semua Titik ({allMarkers.length})
          </button>
          <button
            onClick={() => setSelectedCategory('kesehatan')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              selectedCategory === 'kesehatan' ? 'bg-rose-600 text-white shadow-xs' : 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100'
            }`}
          >
            <HeartPulse className="w-3.5 h-3.5" />
            Kesehatan
          </button>
          <button
            onClick={() => setSelectedCategory('pendidikan')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              selectedCategory === 'pendidikan' ? 'bg-blue-600 text-white shadow-xs' : 'bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            Pendidikan
          </button>
          <button
            onClick={() => setSelectedCategory('pemerintahan')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              selectedCategory === 'pemerintahan' ? 'bg-emerald-600 text-white shadow-xs' : 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            Pemerintahan & Polsek
          </button>
          <button
            onClick={() => setSelectedCategory('wisata')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              selectedCategory === 'wisata' ? 'bg-amber-600 text-white shadow-xs' : 'bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            Wisata
          </button>
          <button
            onClick={() => setSelectedCategory('posko_siaga')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              selectedCategory === 'posko_siaga' ? 'bg-red-700 text-white shadow-xs' : 'bg-red-50 text-red-800 border border-red-200 hover:bg-red-100'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            Posko Siaga Bencana
          </button>
        </div>

        {/* Map and Directory Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left / Main Map Canvas */}
          <div className="lg:col-span-8 bg-slate-100 rounded-3xl border border-slate-200 overflow-hidden shadow-lg h-[480px] lg:h-[560px] relative">
            <div ref={mapContainerRef} className="w-full h-full" />
            <div className="absolute bottom-4 left-4 z-20 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200 text-[11px] text-slate-700 shadow-md">
              📍 Koordinat Pusat: {KECAMATAN_INFO.pusatKoordinat[0]}, {KECAMATAN_INFO.pusatKoordinat[1]}
            </div>
          </div>

          {/* Right Side Directory List */}
          <div className="lg:col-span-4 bg-slate-50 rounded-3xl border border-slate-200 p-4 h-[480px] lg:h-[560px] flex flex-col">
            <div className="pb-3 border-b border-slate-200 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Daftar Lokasi ({filteredFacilities.length})
              </span>
              <span className="text-[10px] text-slate-400">Klik untuk melihat di peta</span>
            </div>

            <div className="overflow-y-auto flex-1 divide-y divide-slate-100 mt-2 pr-1 space-y-1">
              {filteredFacilities.map((f) => (
                <div
                  key={f.id}
                  onClick={() => handleCenterOnFacility(f)}
                  className={`p-3 rounded-xl transition-all cursor-pointer text-left ${
                    selectedFacility?.id === f.id
                      ? 'bg-emerald-50 border border-emerald-300'
                      : 'hover:bg-white hover:shadow-2xs'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
                      {f.nama}
                    </h4>
                    <span 
                      className="w-2.5 h-2.5 rounded-full shrink-0 mt-1" 
                      style={{ backgroundColor: getCategoryColor(f.kategori) }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                    Desa {f.desa} — {f.alamat}
                  </p>
                  <span className="inline-block mt-1 text-[10px] text-slate-400 capitalize">
                    {getCategoryLabel(f.kategori)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Facility Detail Card (Bottom Float or Modal) */}
        {selectedFacility && (
          <div className="mt-6 p-6 bg-slate-900 text-white rounded-3xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 animate-in fade-in">
            <div className="space-y-2 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <span 
                  className="text-xs font-bold px-2.5 py-0.5 rounded-full text-white"
                  style={{ backgroundColor: getCategoryColor(selectedFacility.kategori) }}
                >
                  {getCategoryLabel(selectedFacility.kategori)}
                </span>
                <span className="text-xs text-slate-400">Desa {selectedFacility.desa}</span>
              </div>
              <h3 className="text-lg font-black text-white">{selectedFacility.nama}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{selectedFacility.deskripsi}</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300 pt-1">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{selectedFacility.alamat}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{selectedFacility.jamOperasional}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Kontak: {selectedFacility.kontak}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Penanggung Jawab: {selectedFacility.penanggungJawab}</span>
                </div>
              </div>
            </div>

            <div className="shrink-0 flex items-center gap-2">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${selectedFacility.koordinat[0]},${selectedFacility.koordinat[1]}`}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl flex items-center gap-2 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Buka Google Maps
              </a>
              <button
                onClick={() => setSelectedFacility(null)}
                className="p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors cursor-pointer"
                aria-label="Tutup Detail"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
