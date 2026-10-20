import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  ShieldCheck, 
  UserCheck, 
  Search, 
  CreditCard, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight,
  Sparkles,
  Building,
  UserPlus
} from 'lucide-react';
import { validateNIK, validateKK } from '../utils/nikValidator';
import { DEMO_CITIZENS, VILLAGES_DATA } from '../data/gumelarData';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { loginAs, registerOrVerifyNIK } = useApp();
  const [activeTab, setActiveTab] = useState<'masuk' | 'daftar' | 'cek'>('masuk');

  // Input states for login
  const [inputNikLogin, setInputNikLogin] = useState('');
  const [loginError, setLoginError] = useState('');

  // Input states for register
  const [regForm, setRegForm] = useState({
    nik: '',
    kk: '',
    nama: '',
    desa: 'Gumelar',
    rt: '01',
    rw: '01',
    alamat: '',
    pekerjaan: 'Wiraswasta / Petani',
    telepon: ''
  });
  const [regMessage, setRegMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // States for NIK verification preview
  const [nikAnalysis, setNikAnalysis] = useState<any>(null);

  // Cek Dukcapil state
  const [cekNikInput, setCekNikInput] = useState('');
  const [cekResult, setCekResult] = useState<any>(null);

  if (!isOpen) return null;

  const handleQuickLogin = (nik: string) => {
    loginAs(nik);
    onClose();
  };

  const handleManualLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    if (!inputNikLogin) {
      setLoginError('Silakan masukkan nomor NIK Anda');
      return;
    }
    const val = validateNIK(inputNikLogin);
    if (!val.isValid) {
      setLoginError(val.message);
      return;
    }

    const success = loginAs(inputNikLogin);
    if (success) {
      onClose();
    } else {
      setLoginError('NIK tidak terdaftar dalam database kependudukan demo. Silakan gunakan tab "Daftar / Verifikasi NIK" atau pilih Akun Demo di bawah.');
    }
  };

  const handleNikChange = (nik: string) => {
    setRegForm(prev => ({ ...prev, nik }));
    if (nik.length === 16) {
      const res = validateNIK(nik);
      setNikAnalysis(res);
    } else {
      setNikAnalysis(null);
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setRegMessage(null);

    const val = validateNIK(regForm.nik);
    if (!val.isValid) {
      setRegMessage({ type: 'error', text: val.message });
      return;
    }

    if (!regForm.nama.trim()) {
      setRegMessage({ type: 'error', text: 'Nama lengkap wajib diisi sesuai KTP' });
      return;
    }

    const result = registerOrVerifyNIK(regForm);
    if (result.success) {
      setRegMessage({ type: 'success', text: result.message });
      setTimeout(() => {
        onClose();
      }, 1200);
    } else {
      setRegMessage({ type: 'error', text: result.message });
    }
  };

  const handleCekDukcapil = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cekNikInput) return;
    const val = validateNIK(cekNikInput);
    if (!val.isValid) {
      setCekResult({ isValid: false, message: val.message });
      return;
    }

    // Check if in existing citizens
    const found = DEMO_CITIZENS.find(c => c.nik === cekNikInput);
    setCekResult({
      isValid: true,
      data: val.parsedData,
      citizen: found || null,
      message: val.message
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-xl w-full overflow-hidden flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
      >
        {/* Header Modal */}
        <div className="p-5 bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-xs">
              <ShieldCheck className="w-6 h-6 text-emerald-200" />
            </div>
            <div>
              <h2 id="auth-modal-title" className="text-base font-bold text-white">
                Sistem Autentikasi Kependudukan
              </h2>
              <p className="text-xs text-emerald-100">
                Integrasi Data NIK & Layanan Digital Warga Gumelar
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-emerald-100 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Tutup Jendela"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-4 pt-2">
          <button
            onClick={() => setActiveTab('masuk')}
            className={`pb-3 px-4 text-xs font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'masuk'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Masuk / Demo Instan
          </button>
          <button
            onClick={() => setActiveTab('daftar')}
            className={`pb-3 px-4 text-xs font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'daftar'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Daftar / Verifikasi NIK
          </button>
          <button
            onClick={() => setActiveTab('cek')}
            className={`pb-3 px-4 text-xs font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'cek'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Cek Validasi NIK
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* TAB 1: MASUK INSTAN / DEMO */}
          {activeTab === 'masuk' && (
            <div className="space-y-5">
              <form onSubmit={handleManualLogin} className="space-y-3">
                <label className="block text-xs font-bold text-slate-700">
                  Nomor Induk Kependudukan (NIK)
                </label>
                <div className="relative">
                  <CreditCard className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    maxLength={16}
                    value={inputNikLogin}
                    onChange={(e) => setInputNikLogin(e.target.value.replace(/\D/g, ''))}
                    placeholder="Contoh: 3302171508920001 (16 digit)"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500 font-mono"
                  />
                </div>
                {loginError && (
                  <p className="text-xs text-rose-600 flex items-center gap-1.5 mt-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {loginError}
                  </p>
                )}
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                >
                  Masuk dengan NIK
                </button>
              </form>

              {/* 1-Click Demo Profiles */}
              <div className="pt-2">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Pilih Profil Simulasi Instan (1-Klik):
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {DEMO_CITIZENS.map((citizen) => (
                    <button
                      key={citizen.nik}
                      onClick={() => handleQuickLogin(citizen.nik)}
                      className="p-3 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 text-left transition-all group flex items-start justify-between cursor-pointer"
                    >
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-slate-900 group-hover:text-emerald-700">
                            {citizen.nama}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          {citizen.pekerjaan}
                        </p>
                        <span className="inline-block mt-1 text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 capitalize">
                          {citizen.role === 'petugas' ? 'Petugas Camat' : citizen.role === 'kades' ? 'Kades Petahunan' : `Warga Desa ${citizen.desa}`}
                        </span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all mt-1" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DAFTAR / VERIFIKASI BARU */}
          {activeTab === 'daftar' && (
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl text-xs text-emerald-800">
                Pendaftaran warga baru diverifikasi secara otomatis menggunakan algoritma format kependudukan Dukcapil Kabupaten Banyumas.
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nomor Induk Kependudukan (NIK) *
                </label>
                <input
                  type="text"
                  maxLength={16}
                  value={regForm.nik}
                  onChange={(e) => handleNikChange(e.target.value.replace(/\D/g, ''))}
                  placeholder="330217xxxxxxxxxx (16 Digit)"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-mono focus:ring-2 focus:ring-emerald-500"
                  required
                />
                {nikAnalysis && (
                  <div className="mt-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-[11px] space-y-1">
                    <p className="font-semibold text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {nikAnalysis.message}
                    </p>
                    {nikAnalysis.parsedData && (
                      <div className="grid grid-cols-2 gap-1 text-slate-600 mt-1 pt-1 border-t border-slate-200">
                        <div>Jenis Kelamin: <strong>{nikAnalysis.parsedData.gender === 'L' ? 'Laki-Laki' : 'Perempuan'}</strong></div>
                        <div>Tgl Lahir: <strong>{nikAnalysis.parsedData.birthDate}</strong></div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Nama Lengkap (Sesuai KTP) *
                  </label>
                  <input
                    type="text"
                    value={regForm.nama}
                    onChange={(e) => setRegForm({ ...regForm, nama: e.target.value })}
                    placeholder="Nama warga"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Desa Domisili *
                  </label>
                  <select
                    value={regForm.desa}
                    onChange={(e) => setRegForm({ ...regForm, desa: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500"
                  >
                    {VILLAGES_DATA.map((v) => (
                      <option key={v.id} value={v.nama.replace('Desa ', '')}>
                        {v.nama}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">RT</label>
                  <input
                    type="text"
                    maxLength={3}
                    value={regForm.rt}
                    onChange={(e) => setRegForm({ ...regForm, rt: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                    placeholder="01"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">RW</label>
                  <input
                    type="text"
                    maxLength={3}
                    value={regForm.rw}
                    onChange={(e) => setRegForm({ ...regForm, rw: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                    placeholder="02"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">No. WhatsApp</label>
                  <input
                    type="text"
                    value={regForm.telepon}
                    onChange={(e) => setRegForm({ ...regForm, telepon: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                    placeholder="0812xxxx"
                  />
                </div>
              </div>

              {regMessage && (
                <div
                  className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                    regMessage.type === 'success'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-rose-100 text-rose-800'
                  }`}
                >
                  {regMessage.type === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-rose-700 shrink-0" />
                  )}
                  <span>{regMessage.text}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <UserPlus className="w-4 h-4" />
                Daftar & Verifikasi Akun Kependudukan
              </button>
            </form>
          )}

          {/* TAB 3: CEK DATA DUKCAPIL */}
          {activeTab === 'cek' && (
            <div className="space-y-4">
              <form onSubmit={handleCekDukcapil} className="space-y-3">
                <label className="block text-xs font-bold text-slate-700">
                  Uji Validitas Format NIK Kependudukan
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    maxLength={16}
                    value={cekNikInput}
                    onChange={(e) => setCekNikInput(e.target.value.replace(/\D/g, ''))}
                    placeholder="Ketik 16 Digit NIK..."
                    className="flex-1 px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-mono focus:ring-2 focus:ring-emerald-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-emerald-700 text-white rounded-xl text-xs font-bold hover:bg-emerald-800 transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <Search className="w-3.5 h-3.5" />
                    Cek
                  </button>
                </div>
              </form>

              {cekResult && (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 animate-in fade-in">
                  <div className="flex items-center gap-2">
                    {cekResult.isValid ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-rose-600" />
                    )}
                    <span className="text-xs font-bold text-slate-900">
                      {cekResult.message}
                    </span>
                  </div>

                  {cekResult.data && (
                    <div className="grid grid-cols-2 gap-2 text-xs bg-white p-3 rounded-xl border border-slate-200">
                      <div>
                        <span className="text-slate-400 block text-[10px]">Wilayah Asal</span>
                        <span className="font-semibold text-slate-800">
                          {cekResult.data.isBanyumasOrigin ? 'Kab. Banyumas (Jateng)' : `Kode Prov ${cekResult.data.provinceCode}`}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Jenis Kelamin</span>
                        <span className="font-semibold text-slate-800">
                          {cekResult.data.gender === 'L' ? 'Laki-Laki' : 'Perempuan'}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Tanggal Lahir</span>
                        <span className="font-semibold text-slate-800 font-mono">
                          {cekResult.data.birthDate}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Nomor Seri</span>
                        <span className="font-semibold text-slate-800 font-mono">
                          {cekResult.data.serialNumber}
                        </span>
                      </div>
                    </div>
                  )}

                  {cekResult.citizen ? (
                    <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900">
                      <p className="font-bold">Identitas Cocok di Database Kecamatan Gumelar:</p>
                      <p className="mt-1 font-semibold">{cekResult.citizen.nama} - Desa {cekResult.citizen.desa}</p>
                      <p className="text-[11px] text-emerald-700">{cekResult.citizen.alamat}</p>
                      <button
                        onClick={() => handleQuickLogin(cekResult.citizen.nik)}
                        className="mt-2 text-xs bg-emerald-600 text-white px-3 py-1.5 rounded-lg font-bold hover:bg-emerald-700 transition-colors cursor-pointer"
                      >
                        Masuk Menggunakan Akun Ini
                      </button>
                    </div>
                  ) : cekResult.isValid ? (
                    <p className="text-[11px] text-slate-500 italic">
                      NIK ini memiliki format valid secara nasional. Anda dapat mendaftarkannya pada tab &quot;Daftar / Verifikasi NIK&quot;.
                    </p>
                  ) : null}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
