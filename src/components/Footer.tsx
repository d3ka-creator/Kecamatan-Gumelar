import React from 'react';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ShieldCheck, 
  ExternalLink,
  Heart
} from 'lucide-react';
import { KECAMATAN_INFO } from '../data/gumelarData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: District Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-700 flex items-center justify-center text-white font-bold">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-white text-base leading-tight">
                  KECAMATAN GUMELAR
                </h3>
                <p className="text-xs text-slate-400">Pemerintah Kabupaten Banyumas</p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {KECAMATAN_INFO.visi}
            </p>
            <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-emerald-400 font-medium">
              &ldquo;{KECAMATAN_INFO.semboyan}&rdquo;
            </div>
          </div>

          {/* Col 2: Contact & Office */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Kantor & Jam Pelayanan
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>{KECAMATAN_INFO.alamatKantor}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{KECAMATAN_INFO.telepon}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{KECAMATAN_INFO.email}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>{KECAMATAN_INFO.jamPelayanan}</span>
              </div>
            </div>
          </div>

          {/* Col 3: Posko Darurat 24 Jam */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Hotline Cepat & Darurat
            </h4>
            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
                <span className="text-[10px] text-slate-400 block font-bold">TRC & Tagana Gumelar (24 Jam)</span>
                <strong className="text-white text-sm">0812-2890-5541</strong>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
                <span className="text-[10px] text-slate-400 block font-bold">IGD Puskesmas Gumelar 1</span>
                <strong className="text-white text-sm">(0281) 6570088</strong>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
                <span className="text-[10px] text-slate-400 block font-bold">SPKT Polsek Gumelar</span>
                <strong className="text-white text-sm">Call Center 110 / (0281) 6570110</strong>
              </div>
            </div>
          </div>

          {/* Col 4: Links & Integrity */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Tautan Terkait
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a
                  href="https://banyumaskab.go.id"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-400 transition-colors flex items-center justify-between"
                >
                  <span>Portal Resmi Pemkab Banyumas</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </li>
              <li>
                <a
                  href="https://dindukcapil.banyumaskab.go.id"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-400 transition-colors flex items-center justify-between"
                >
                  <span>Disdukcapil Kabupaten Banyumas</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </li>
              <li>
                <a
                  href="https://bpbd.banyumaskab.go.id"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-400 transition-colors flex items-center justify-between"
                >
                  <span>BPBD Banyumas (Siaga Bencana)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </li>
              <li>
                <a
                  href="https://dinkes.banyumaskab.go.id"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-400 transition-colors flex items-center justify-between"
                >
                  <span>Dinas Kesehatan Banyumas</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </li>
            </ul>

            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 text-[11px] text-emerald-400 bg-emerald-950/50 px-3 py-1 rounded-full border border-emerald-800">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Zona Integritas Wilayah Bebas Korupsi
              </span>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} Pemerintah Kecamatan Gumelar, Kabupaten Banyumas. Seluruh hak cipta dilindungi.
          </p>
          <div className="flex items-center gap-1">
            <span>Dibangun untuk kemudahan warga Gumelar</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
