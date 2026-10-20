import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Compass, 
  MapPin, 
  Star, 
  Clock, 
  Ticket, 
  CheckCircle2, 
  ArrowRight, 
  X,
  Sparkles,
  Navigation
} from 'lucide-react';
import { TOURISM_DESTINATIONS } from '../data/gumelarData';
import { TourismDestination } from '../types';

export const TourismSection: React.FC = () => {
  const { setActiveTab } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [activeModal, setActiveModal] = useState<TourismDestination | null>(null);

  const categories = [
    'Semua',
    'Air Terjun',
    'Bukit & Pemandangan',
    'Agrowisata',
    'Rekreasi Keluarga',
    'Budaya & Religi'
  ];

  const filteredDestinations = selectedCategory === 'Semua'
    ? TOURISM_DESTINATIONS
    : TOURISM_DESTINATIONS.filter(item => item.kategori === selectedCategory);

  return (
    <section className="py-12 bg-white border-b border-slate-200">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold mb-2">
              <Compass className="w-3.5 h-3.5" />
              Pesona Wisata Alam Gumelar
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Destinasi Wisata Unggulan
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Eksplorasi keindahan air terjun berundak Curug Nangga, panorama sunrise perbukitan asri, kebun kopi lereng gunung, hingga edukasi gula aren semut kelas dunia.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Tourism Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDestinations.map((dest) => (
            <div
              key={dest.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col group"
            >
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <img
                  src={dest.fotoUrl}
                  alt={dest.nama}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-slate-800 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-xs">
                  {dest.kategori}
                </span>
                <div className="absolute top-3 right-3 bg-amber-500/90 text-white text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-xs">
                  <Star className="w-3 h-3 fill-current" />
                  <span>{dest.rating}</span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="text-base font-bold text-white drop-shadow-xs">
                    {dest.nama}
                  </h3>
                  <p className="text-xs text-emerald-300 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    Desa {dest.desa}
                  </p>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {dest.deskripsi}
                </p>

                <div className="space-y-1.5 text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Ticket className="w-3.5 h-3.5 text-emerald-600" />
                      Tiket:
                    </span>
                    <strong className="text-emerald-700">{dest.tiketMasuk.split(' ')[0]} {dest.tiketMasuk.split(' ')[1]}</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-emerald-600" />
                      Buka:
                    </span>
                    <span className="font-medium text-slate-700">{dest.jamBuka}</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={() => setActiveModal(dest)}
                    className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Informasi Lengkap</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setActiveTab('peta')}
                    className="p-2.5 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 transition-colors cursor-pointer"
                    title="Buka Lokasi di Peta Digital"
                    aria-label="Buka Lokasi di Peta Digital"
                  >
                    <Navigation className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tourism Detail Modal */}
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-2xl w-full overflow-hidden max-h-[90vh] flex flex-col">
              <div className="relative h-60 bg-slate-100 shrink-0">
                <img
                  src={activeModal.fotoUrl}
                  alt={activeModal.nama}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                <button
                  onClick={() => setActiveModal(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors cursor-pointer"
                  aria-label="Tutup"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-6 right-6 text-white">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs bg-emerald-500 text-white px-2.5 py-0.5 rounded-full font-bold">
                      {activeModal.kategori}
                    </span>
                    <span className="text-xs bg-amber-500 text-white px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current" />
                      {activeModal.rating} ({activeModal.jumlahUlasan} Ulasan)
                    </span>
                  </div>
                  <h3 className="text-2xl font-black text-white">{activeModal.nama}</h3>
                  <p className="text-xs text-emerald-200 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5" />
                    Desa {activeModal.desa}, Kecamatan Gumelar, Banyumas
                  </p>
                </div>
              </div>

              <div className="p-6 overflow-y-auto space-y-5">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Deskripsi Lengkap
                  </h4>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {activeModal.deskripsi}
                  </p>
                </div>

                {/* Daya Tarik Utama */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Daya Tarik & Aktivitas Pengunjung
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {activeModal.dayaTarik.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 flex items-start gap-2"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tiket & Jam Operasional */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-100">
                    <span className="text-[10px] font-bold uppercase text-emerald-800 block">
                      Harga Tiket Masuk & Parkir
                    </span>
                    <p className="text-emerald-950 font-semibold mt-1">{activeModal.tiketMasuk}</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-teal-50 border border-teal-100">
                    <span className="text-[10px] font-bold uppercase text-teal-800 block">
                      Waktu Kunjungan Wisata
                    </span>
                    <p className="text-teal-950 font-semibold mt-1">{activeModal.jamBuka}</p>
                  </div>
                </div>

                {/* Fasilitas */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Fasilitas Tersedia
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {activeModal.fasilitas.map((f, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-lg font-medium flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        {f}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Rute Akses */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
                  <span className="font-bold text-slate-900 block flex items-center gap-1.5">
                    <Navigation className="w-3.5 h-3.5 text-emerald-600" />
                    Panduan Rute & Aksesibilitas
                  </span>
                  <p>{activeModal.ruteAkses}</p>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
                <button
                  onClick={() => {
                    setActiveModal(null);
                    setActiveTab('peta');
                  }}
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  Lihat Posisi di Peta Interaktif
                </button>
                <button
                  onClick={() => setActiveModal(null)}
                  className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl font-bold text-xs cursor-pointer"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
