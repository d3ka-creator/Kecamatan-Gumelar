import React, { useState } from 'react';
import { 
  Building2, 
  Users, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldAlert, 
  Search, 
  ArrowRight, 
  Sparkles, 
  X,
  Compass,
  CheckCircle2
} from 'lucide-react';
import { VILLAGES_DATA } from '../data/gumelarData';
import { VillageProfile } from '../types';

export const VillageProfiles: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVillage, setSelectedVillage] = useState<VillageProfile | null>(null);

  const filteredVillages = VILLAGES_DATA.filter(village => {
    const q = searchQuery.toLowerCase();
    const matchName = village.nama.toLowerCase().includes(q);
    const matchKades = village.kepalaDesa.toLowerCase().includes(q);
    const matchCommodity = village.komoditasUnggulan.some(c => c.toLowerCase().includes(q));
    return matchName || matchKades || matchCommodity;
  });

  return (
    <section className="py-12 bg-slate-50 border-b border-slate-200">
      <div className="container mx-auto px-4">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-2">
              <Building2 className="w-3.5 h-3.5" />
              10 Desa Mandiri & Berdaya Saing
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Profil Desa Se-Kecamatan Gumelar
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Mengenal potensi sumber daya alam, demografi kependudukan, kepemimpinan desa, serta komoditas unggulan di setiap wilayah desa.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari desa atau komoditas unggulan..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Village Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVillages.map((village) => (
            <div
              key={village.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col group"
            >
              <div className="relative h-44 overflow-hidden bg-slate-100">
                <img
                  src={village.fotoUrl}
                  alt={village.nama}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="text-lg font-bold text-white drop-shadow-xs">
                    {village.nama}
                  </h3>
                  <p className="text-xs text-emerald-200 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" />
                    Kades: {village.kepalaDesa}
                  </p>
                </div>
                <span className="absolute top-3 right-3 bg-white/90 text-slate-800 backdrop-blur-xs text-[10px] font-bold px-2.5 py-1 rounded-full shadow-xs">
                  {village.luasWilayahKm2} km²
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {village.deskripsi}
                </p>

                {/* Key statistics */}
                <div className="grid grid-cols-2 gap-2 text-[11px] p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                  <div>
                    <span className="text-slate-400 block">Populasi</span>
                    <strong className="text-slate-800">{village.populasi.toLocaleString('id-ID')} Jiwa</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Struktur Wilayah</span>
                    <strong className="text-slate-800">{village.jumlahRw} RW / {village.jumlahRt} RT</strong>
                  </div>
                </div>

                {/* Top Commodities Tags */}
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                    Komoditas Utama:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {village.komoditasUnggulan.slice(0, 3).map((komoditas, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md font-medium border border-emerald-100"
                      >
                        {komoditas}
                      </span>
                    ))}
                    {village.komoditasUnggulan.length > 3 && (
                      <span className="text-[10px] text-slate-400 py-0.5">
                        +{village.komoditasUnggulan.length - 3} lainnya
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => setSelectedVillage(village)}
                  className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-emerald-600 hover:text-white text-slate-700 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer mt-auto"
                >
                  <span>Lihat Detail Profil Desa</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredVillages.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
            <p className="text-sm font-semibold text-slate-700">Tidak ada desa yang cocok dengan pencarian &quot;{searchQuery}&quot;</p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-2 text-xs text-emerald-600 font-bold hover:underline cursor-pointer"
            >
              Tampilkan Seluruh 10 Desa
            </button>
          </div>
        )}

        {/* Detail Village Modal */}
        {selectedVillage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-2xl w-full overflow-hidden max-h-[90vh] flex flex-col">
              {/* Header Image */}
              <div className="relative h-56 bg-slate-100 shrink-0">
                <img
                  src={selectedVillage.fotoUrl}
                  alt={selectedVillage.nama}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                <button
                  onClick={() => setSelectedVillage(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors cursor-pointer"
                  aria-label="Tutup Detail"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-6 right-6 text-white">
                  <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
                    Pemerintah Desa
                  </span>
                  <h3 className="text-2xl font-black text-white">{selectedVillage.nama}</h3>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Kecamatan Gumelar, Kabupaten Banyumas
                  </p>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 overflow-y-auto space-y-6">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Tentang Wilayah
                  </h4>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {selectedVillage.deskripsi}
                  </p>
                </div>

                {/* Visi Misi */}
                <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-100">
                  <h4 className="text-xs font-bold text-emerald-900 mb-1 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    Visi & Misi Pembangunan Desa
                  </h4>
                  <p className="text-xs text-emerald-800 italic">
                    &ldquo;{selectedVillage.visiMisi}&rdquo;
                  </p>
                </div>

                {/* Village Apparatus & Demographics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] text-slate-400 block font-bold uppercase">Kepala Desa (Kades)</span>
                    <strong className="text-slate-800 text-sm">{selectedVillage.kepalaDesa}</strong>
                    <span className="text-[10px] text-slate-400 block font-bold uppercase mt-2">Sekretaris Desa (Sekdes)</span>
                    <span className="text-slate-700 font-medium">{selectedVillage.sekretarisDesa}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] text-slate-400 block font-bold uppercase">Data Kependudukan</span>
                    <div className="mt-1 space-y-0.5 text-slate-700">
                      <div>Total Penduduk: <strong>{selectedVillage.populasi.toLocaleString('id-ID')} Jiwa</strong></div>
                      <div>Luas Wilayah: <strong>{selectedVillage.luasWilayahKm2} km²</strong></div>
                      <div>Rukun Tetangga/Warga: <strong>{selectedVillage.jumlahRw} RW / {selectedVillage.jumlahRt} RT</strong></div>
                    </div>
                  </div>
                </div>

                {/* Komoditas Unggulan */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Komoditas & Produk Unggulan
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedVillage.komoditasUnggulan.map((k, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-teal-50 text-teal-800 border border-teal-200 flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3 h-3 text-teal-600" />
                        {k}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Siaga Bencana & Kontak */}
                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs">
                  <div className="flex items-center gap-2 text-amber-900 font-bold mb-1">
                    <ShieldAlert className="w-4 h-4 text-amber-700" />
                    <span>Titik Siaga Kebencanaan Desa</span>
                  </div>
                  <p className="text-amber-800 font-medium">{selectedVillage.poskoSiagaBencana}</p>
                </div>

                <div className="border-t border-slate-200 pt-4 text-xs space-y-2 text-slate-600">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Kantor Balai Desa: {selectedVillage.kontak.alamatKantor}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Telepon Pelayanan: {selectedVillage.kontak.telepon}</span>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
                <button
                  onClick={() => setSelectedVillage(null)}
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
