import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Building2, 
  MapPin, 
  FileText, 
  AlertTriangle, 
  Compass, 
  Users, 
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Calendar,
  Layers,
  HeartHandshake
} from 'lucide-react';
import { KECAMATAN_INFO } from '../data/gumelarData';

export const HeroBanner: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-emerald-950 to-slate-900 text-white">
      {/* Decorative background image overlay */}
      <div 
        className="absolute inset-0 opacity-20 bg-cover bg-center mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1546548970-71785318a17b?w=1600&auto=format&fit=crop&q=80')`
        }}
      />

      <div className="relative container mx-auto px-4 py-12 lg:py-16">
        {/* Weather alert banner */}
        <div className="mb-6 inline-flex flex-wrap items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-200 text-xs backdrop-blur-md">
          <AlertTriangle className="w-4 h-4 text-amber-400 animate-pulse" />
          <span className="font-semibold text-white">Posko Siaga TRC Gumelar:</span>
          <span>Waspada curah hujan tinggi di lereng Petahunan & Cihonje. Call Center 24 Jam: 0812-2890-5541</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
              <ShieldCheck className="w-4 h-4" />
              Situs Resmi Pemerintah Kecamatan Gumelar - Kabupaten Banyumas
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white">
              Pelayanan Terpadu & Informasi Terbuka{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200">
                Kecamatan Gumelar
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              Mewujudkan tata kelola pemerintahan yang transparan, percepatan pelayanan administrasi kependudukan bebas pungli, integrasi pengaduan warga real-time, serta promosi potensi agribisnis dan pesona wisata alam 10 desa di Banyumas Barat.
            </p>

            {/* Slogan */}
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md max-w-xl flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-emerald-400 shrink-0" />
              <p className="text-xs text-slate-200 italic">
                &ldquo;{KECAMATAN_INFO.semboyan}&rdquo; — Guyub rukun membangun desa mandiri dan sejahtera.
              </p>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setActiveTab('pengaduan')}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-900/40 transition-all flex items-center gap-2 cursor-pointer"
              >
                <AlertTriangle className="w-4 h-4" />
                <span>Buat Pengaduan Warga</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setActiveTab('layanan')}
                className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 backdrop-blur-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <FileText className="w-4 h-4 text-emerald-300" />
                <span>Urus Dokumen (E-Layanan)</span>
              </button>

              <button
                onClick={() => setActiveTab('peta')}
                className="px-4 py-3 rounded-xl bg-white/5 hover:bg-white/15 text-slate-200 font-semibold text-xs sm:text-sm border border-white/10 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Compass className="w-4 h-4 text-teal-400" />
                <span>Peta Digital Fasilitas</span>
              </button>
            </div>
          </div>

          {/* District Highlights Summary Card */}
          <div className="lg:col-span-4">
            <div className="rounded-3xl bg-slate-800/80 border border-slate-700/80 p-6 backdrop-blur-xl shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-700">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Data Pokok Wilayah
                </span>
                <span className="text-[11px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded-full font-mono border border-emerald-800">
                  BPS 2026
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-700/60">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Jumlah Desa</span>
                  <p className="text-2xl font-black text-white mt-0.5">10</p>
                  <span className="text-[10px] text-emerald-400">Semua Terkoneksi</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-700/60">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Populasi Jiwa</span>
                  <p className="text-2xl font-black text-white mt-0.5">56.420+</p>
                  <span className="text-[10px] text-emerald-400">17.280 KK</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-700/60">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Luas Wilayah</span>
                  <p className="text-2xl font-black text-white mt-0.5">93.95</p>
                  <span className="text-[10px] text-slate-400">km² Perbukitan</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-700/60">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Biaya Layanan</span>
                  <p className="text-2xl font-black text-emerald-300 mt-0.5">Rp 0,-</p>
                  <span className="text-[10px] text-emerald-400">100% Gratis</span>
                </div>
              </div>

              <div className="pt-2 text-xs text-slate-300 space-y-1.5 border-t border-slate-700/80">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Camat Gumelar:</span>
                  <span className="font-semibold text-white">{KECAMATAN_INFO.camatNama}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Jam Kantor Pelayanan:</span>
                  <span className="font-medium text-slate-200">07.30 - 15.30 WIB</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
