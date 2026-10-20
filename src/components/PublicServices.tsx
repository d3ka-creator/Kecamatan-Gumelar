import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  FileText, 
  Clock, 
  CheckCircle2, 
  Search, 
  PlusCircle, 
  Upload, 
  Download, 
  Building2, 
  ArrowRight, 
  AlertCircle, 
  Filter, 
  User, 
  Calendar,
  Sparkles,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { PUBLIC_SERVICES_LIST, VILLAGES_DATA } from '../data/gumelarData';
import { LayananItem, PermohonanLayanan, StatusPelayanan } from '../types';

export const PublicServices: React.FC = () => {
  const { 
    currentUser, 
    permohonanList, 
    submitPermohonan, 
    updatePermohonanStatus 
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'katalog' | 'ajukan' | 'lacak'>('katalog');
  const [selectedLayanan, setSelectedLayanan] = useState<LayananItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');

  // Tracking tab state
  const [trackingCodeInput, setTrackingCodeInput] = useState('');
  const [trackedItem, setTrackedItem] = useState<PermohonanLayanan | null>(null);

  // Form submission state
  const [formData, setFormData] = useState({
    layananId: '',
    pemohonNik: currentUser?.nik || '',
    pemohonNama: currentUser?.nama || '',
    pemohonTelepon: currentUser?.telepon || '',
    pemohonDesa: currentUser?.desa || 'Gumelar',
    catatanPemohon: '',
    berkas: ['ktp_pemohon.pdf', 'kk_keluarga.pdf']
  });
  const [submissionSuccess, setSubmissionSuccess] = useState<PermohonanLayanan | null>(null);

  // Petugas update modal state
  const [petugasUpdateTarget, setPetugasUpdateTarget] = useState<PermohonanLayanan | null>(null);
  const [petugasNewStatus, setPetugasNewStatus] = useState<StatusPelayanan>('Diproses');
  const [petugasNotes, setPetugasNotes] = useState('');

  const categories = [
    'Semua',
    'Kependudukan',
    'Kesejahteraan Sosial',
    'Perizinan Usaha',
    'Umum & Rekomendasi'
  ];

  const filteredServices = PUBLIC_SERVICES_LIST.filter(item => {
    const matchCat = selectedCategory === 'Semua' || item.kategori === selectedCategory;
    const matchQuery = item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       item.deskripsi.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchQuery;
  });

  const handleStartAjukan = (layanan: LayananItem) => {
    setSelectedLayanan(layanan);
    setFormData(prev => ({
      ...prev,
      layananId: layanan.id,
      pemohonNik: currentUser?.nik || prev.pemohonNik,
      pemohonNama: currentUser?.nama || prev.pemohonNama,
      pemohonTelepon: currentUser?.telepon || prev.pemohonTelepon,
      pemohonDesa: currentUser?.desa || prev.pemohonDesa
    }));
    setActiveSubTab('ajukan');
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.pemohonNik || !formData.pemohonNama) {
      alert('Nama dan NIK pemohon wajib diisi');
      return;
    }

    const targetService = PUBLIC_SERVICES_LIST.find(s => s.id === formData.layananId) || PUBLIC_SERVICES_LIST[0];

    const result = submitPermohonan({
      layananId: targetService.id,
      namaLayanan: targetService.nama,
      pemohonNik: formData.pemohonNik,
      pemohonNama: formData.pemohonNama,
      pemohonTelepon: formData.pemohonTelepon,
      pemohonDesa: formData.pemohonDesa,
      catatanPemohon: formData.catatanPemohon || 'Pengajuan permohonan melalui portal layanan online',
      berkasLampiran: formData.berkas,
      slaDays: targetService.durasiSlaHari
    });

    setSubmissionSuccess(result);
  };

  const handleSearchTracking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingCodeInput.trim()) return;
    const found = permohonanList.find(p => 
      p.kodeTiket.toLowerCase() === trackingCodeInput.trim().toLowerCase()
    );
    setTrackedItem(found || null);
  };

  const handlePetugasSubmitUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!petugasUpdateTarget) return;
    updatePermohonanStatus(petugasUpdateTarget.id, petugasNewStatus, petugasNotes || 'Status diperbarui oleh petugas kecamatan.');
    setPetugasUpdateTarget(null);
    setPetugasNotes('');
  };

  return (
    <section className="py-12 bg-slate-50 border-b border-slate-200">
      <div className="container mx-auto px-4">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-2">
              <FileText className="w-3.5 h-3.5" />
              Sistem PATEN Kecamatan Gumelar
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              E-Layanan Publik & Administrasi Warga
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Pengurusan surat pengantar KTP, Kartu Keluarga, SKTM, perizinan UMKM, dan rekomendasi nikah secara transparan dengan jaminan SLA (Standar Waktu Penyelesaian) dan 100% bebas biaya.
            </p>
          </div>

          {/* Subtabs Navigation */}
          <div className="flex rounded-xl bg-slate-200/80 p-1">
            <button
              onClick={() => { setActiveSubTab('katalog'); setSubmissionSuccess(null); }}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeSubTab === 'katalog' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Katalog Layanan
            </button>
            <button
              onClick={() => { setActiveSubTab('ajukan'); setSubmissionSuccess(null); }}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeSubTab === 'ajukan' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Ajukan Mandiri Online
            </button>
            <button
              onClick={() => setActiveSubTab('lacak')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeSubTab === 'lacak' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Lacak Tiket Layanan ({permohonanList.length})
            </button>
          </div>
        </div>

        {/* SUBTAB 1: KATALOG LAYANAN */}
        {activeSubTab === 'katalog' && (
          <div className="space-y-6">
            {/* Filter and search */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200">
              <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari jenis surat atau layanan..."
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* List of Services */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredServices.map((layanan) => (
                <div
                  key={layanan.id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                          {layanan.kategori}
                        </span>
                        <h3 className="text-base font-bold text-slate-900 mt-1.5">
                          {layanan.nama}
                        </h3>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-xl">
                          <Clock className="w-3.5 h-3.5 text-emerald-600" />
                          SLA: {layanan.durasiSlaHari} Hari
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {layanan.deskripsi}
                    </p>

                    {/* Requirements */}
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs space-y-1.5">
                      <span className="font-bold text-slate-700 block text-[11px] uppercase tracking-wider">
                        Persyaratan Berkas:
                      </span>
                      <ul className="space-y-1 text-slate-600">
                        {layanan.syarat.map((syarat, sIdx) => (
                          <li key={sIdx} className="flex items-start gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{syarat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="text-xs text-slate-500 flex items-center justify-between pt-1">
                      <span>Penanggung Jawab: <strong>{layanan.pjSeksi}</strong></span>
                      <span className="font-bold text-emerald-700">{layanan.biaya}</span>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500 truncate max-w-[200px]">
                      Output: {layanan.outputDokumen}
                    </span>
                    <button
                      onClick={() => handleStartAjukan(layanan)}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                    >
                      <span>Ajukan Sekarang</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SUBTAB 2: PENGAJUAN MANDIRI ONLINE */}
        {activeSubTab === 'ajukan' && (
          <div className="max-w-2xl mx-auto">
            {submissionSuccess ? (
              <div className="bg-white rounded-3xl p-8 border border-emerald-200 shadow-xl text-center space-y-4 animate-in fade-in">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-black text-slate-900">
                  Permohonan Berhasil Diajukan!
                </h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  Dokumen dan data Anda telah masuk ke sistem antrian Seksi Pelayanan Kecamatan Gumelar.
                </p>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 max-w-sm mx-auto text-left space-y-2 font-mono text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Nomor Registrasi Tiket:</span>
                    <strong className="text-emerald-700 text-sm font-bold">{submissionSuccess.kodeTiket}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Jenis Layanan:</span>
                    <span className="text-slate-800 font-sans font-medium">{submissionSuccess.namaLayanan}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Estimasi Selesai (SLA):</span>
                    <span className="text-slate-800">{submissionSuccess.estimasiSelesai}</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-center gap-3">
                  <button
                    onClick={() => {
                      setTrackingCodeInput(submissionSuccess.kodeTiket);
                      setTrackedItem(submissionSuccess);
                      setActiveSubTab('lacak');
                    }}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    Lacak Status Permohonan Ini
                  </button>
                  <button
                    onClick={() => setSubmissionSuccess(null)}
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    Ajukan Layanan Lain
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmitForm} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-5">
                <div className="border-b border-slate-100 pb-4">
                  <h3 className="text-lg font-bold text-slate-900">
                    Formulir Permohonan Layanan Publik Online
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Isi data diri pemohon dengan benar sesuai data KTP & Kartu Keluarga.
                  </p>
                </div>

                {/* Pilih Layanan */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Pilih Jenis Pelayanan *
                  </label>
                  <select
                    value={formData.layananId || PUBLIC_SERVICES_LIST[0].id}
                    onChange={(e) => setFormData({ ...formData, layananId: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-emerald-500"
                    required
                  >
                    {PUBLIC_SERVICES_LIST.map((l) => (
                      <option key={l.id} value={l.id}>
                        {l.nama} (SLA: {l.durasiSlaHari} Hari)
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Nomor Induk Kependudukan (NIK) *
                    </label>
                    <input
                      type="text"
                      maxLength={16}
                      value={formData.pemohonNik}
                      onChange={(e) => setFormData({ ...formData, pemohonNik: e.target.value.replace(/\D/g, '') })}
                      placeholder="16 Digit NIK KTP"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-mono focus:ring-2 focus:ring-emerald-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Nama Lengkap Pemohon *
                    </label>
                    <input
                      type="text"
                      value={formData.pemohonNama}
                      onChange={(e) => setFormData({ ...formData, pemohonNama: e.target.value })}
                      placeholder="Nama sesuai KTP"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Asal Desa Domisili *
                    </label>
                    <select
                      value={formData.pemohonDesa}
                      onChange={(e) => setFormData({ ...formData, pemohonDesa: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500"
                    >
                      {VILLAGES_DATA.map((v) => (
                        <option key={v.id} value={v.nama.replace('Desa ', '')}>
                          {v.nama}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Nomor WhatsApp Aktif *
                    </label>
                    <input
                      type="text"
                      value={formData.pemohonTelepon}
                      onChange={(e) => setFormData({ ...formData, pemohonTelepon: e.target.value })}
                      placeholder="0812xxxxxxxx"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Keterangan / Keperluan Dokumen
                  </label>
                  <textarea
                    rows={3}
                    value={formData.catatanPemohon}
                    onChange={(e) => setFormData({ ...formData, catatanPemohon: e.target.value })}
                    placeholder="Contoh: KTP fisik rusak patah karena jatuh, atau pengajuan SKTM untuk persyaratan keringanan biaya operasi..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                {/* Upload attachment simulated dropzone */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Unggah Lampiran Berkas Syarat (PDF / JPG)
                  </label>
                  <div className="p-4 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50 text-center hover:border-emerald-400 transition-colors">
                    <Upload className="w-6 h-6 text-slate-400 mx-auto mb-1.5" />
                    <p className="text-xs text-slate-600 font-medium">
                      Berkas bawaan otomatis terlampir:
                    </p>
                    <div className="flex flex-wrap justify-center gap-1.5 mt-2">
                      {formData.berkas.map((b, idx) => (
                        <span key={idx} className="text-[11px] bg-white border border-slate-200 px-2.5 py-1 rounded-lg text-slate-700 font-mono">
                          📄 {b}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <PlusCircle className="w-4 h-4" />
                  Kirim Permohonan & Dapatkan Nomor Registrasi
                </button>
              </form>
            )}
          </div>
        )}

        {/* SUBTAB 3: LACAK STATUS TIKET */}
        {activeSubTab === 'lacak' && (
          <div className="space-y-6">
            {/* Search ticket bar */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs max-w-xl mx-auto">
              <form onSubmit={handleSearchTracking} className="space-y-3">
                <label className="block text-xs font-bold text-slate-700">
                  Masukkan Nomor Tiket Registrasi Layanan
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={trackingCodeInput}
                    onChange={(e) => setTrackingCodeInput(e.target.value)}
                    placeholder="Contoh: GML-ADM-2026-4412"
                    className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-mono uppercase focus:ring-2 focus:ring-emerald-500"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    Lacak
                  </button>
                </div>
              </form>
            </div>

            {/* List of all active tickets */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900">
                  Daftar Permohonan Layanan Aktif ({permohonanList.length})
                </h3>
                {currentUser?.role === 'petugas' && (
                  <span className="text-[11px] bg-amber-100 text-amber-800 font-bold px-2.5 py-1 rounded-full border border-amber-200">
                    Mode Petugas: Anda dapat mengubah status permohonan warga
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {permohonanList.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-emerald-300 transition-all space-y-4"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                          #{item.kodeTiket}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900 mt-1">
                          {item.namaLayanan}
                        </h4>
                        <p className="text-xs text-slate-500">
                          Pemohon: {item.pemohonNama} (Desa {item.pemohonDesa})
                        </p>
                      </div>

                      {/* Status Badge */}
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                        item.status === 'Selesai & Siap Diambil'
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                          : item.status === 'Diproses'
                          ? 'bg-blue-100 text-blue-800 border-blue-300'
                          : 'bg-amber-100 text-amber-800 border-amber-300'
                      }`}>
                        {item.status}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      &ldquo;{item.catatanPemohon}&rdquo;
                    </p>

                    {item.catatanPetugas && (
                      <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200 text-xs text-emerald-900 space-y-1">
                        <span className="font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          Catatan Petugas Kecamatan:
                        </span>
                        <p>{item.catatanPetugas}</p>
                      </div>
                    )}

                    <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-100">
                      <span>Estimasi: <strong>{item.estimasiSelesai}</strong></span>
                      <span className="text-[11px] text-slate-400">{item.diperbaruiPada}</span>
                    </div>

                    {/* Petugas action trigger */}
                    {(currentUser?.role === 'petugas' || currentUser?.role === 'kades') && (
                      <button
                        onClick={() => {
                          setPetugasUpdateTarget(item);
                          setPetugasNewStatus(item.status);
                        }}
                        className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                      >
                        Perbarui Status Layanan (Petugas Camat)
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Modal Petugas Update Status */}
        {petugasUpdateTarget && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
            <div className="bg-white rounded-3xl p-6 border border-slate-100 max-w-md w-full shadow-2xl space-y-4">
              <h3 className="text-base font-bold text-slate-900">
                Perbarui Status Tiket #{petugasUpdateTarget.kodeTiket}
              </h3>
              <p className="text-xs text-slate-500">
                {petugasUpdateTarget.namaLayanan} — {petugasUpdateTarget.pemohonNama}
              </p>

              <form onSubmit={handlePetugasSubmitUpdate} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Ubah Status Pemrosesan
                  </label>
                  <select
                    value={petugasNewStatus}
                    onChange={(e) => setPetugasNewStatus(e.target.value as StatusPelayanan)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Menunggu Verifikasi">Menunggu Verifikasi</option>
                    <option value="Diproses">Diproses (Verifikasi Dokumen)</option>
                    <option value="Perbaikan Berkas">Perbaikan Berkas</option>
                    <option value="Selesai & Siap Diambil">Selesai & Siap Diambil di Kantor Camat</option>
                    <option value="Ditolak">Ditolak</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Instruksi / Catatan Petugas untuk Pemohon
                  </label>
                  <textarea
                    rows={3}
                    value={petugasNotes}
                    onChange={(e) => setPetugasNotes(e.target.value)}
                    placeholder="Contoh: Berkas telah diverifikasi lengkap dan surat telah ditandatangani Camat. Silakan ambil di loket pelayanan..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setPetugasUpdateTarget(null)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold cursor-pointer shadow-xs"
                  >
                    Simpan & Kirim Notifikasi Warga
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
