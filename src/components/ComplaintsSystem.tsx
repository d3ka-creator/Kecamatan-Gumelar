import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  AlertTriangle, 
  MapPin, 
  ThumbsUp, 
  MessageSquare, 
  PlusCircle, 
  CheckCircle2, 
  Clock, 
  ShieldAlert, 
  Filter, 
  Camera, 
  EyeOff, 
  Send,
  Building2,
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { PengaduanItem, StatusAduan, UrgensiAduan, KategoriAduan } from '../types';
import { VILLAGES_DATA } from '../data/gumelarData';

export const ComplaintsSystem: React.FC = () => {
  const { 
    currentUser, 
    pengaduanList, 
    submitPengaduan, 
    upvotePengaduan, 
    tanggapiPengaduan 
  } = useApp();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('Semua');
  const [filterDesa, setFilterDesa] = useState<string>('Semua');
  const [filterUrgensi, setFilterUrgensi] = useState<string>('Semua');

  // New complaint form state
  const [formData, setFormData] = useState({
    judul: '',
    kategori: 'Infrastruktur & Jalan' as KategoriAduan,
    urgensi: 'Sedang' as UrgensiAduan,
    lokasiDesa: currentUser?.desa || 'Gumelar',
    lokasiDetail: '',
    deskripsi: '',
    fotoUrl: '',
    isAnonim: false
  });

  // Response input state per complaint item
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [replyStatusUpdate, setReplyStatusUpdate] = useState<StatusAduan>('Dalam Penanganan');

  // Filter complaints
  const filteredComplaints = pengaduanList.filter((item) => {
    const matchStatus = filterStatus === 'Semua' || item.status === filterStatus;
    const matchDesa = filterDesa === 'Semua' || item.lokasiDesa === filterDesa;
    const matchUrgensi = filterUrgensi === 'Semua' || item.urgensi === filterUrgensi;
    return matchStatus && matchDesa && matchUrgensi;
  });

  const handleCreateComplaint = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.judul.trim() || !formData.deskripsi.trim()) {
      alert('Judul dan deskripsi aduan wajib diisi');
      return;
    }

    submitPengaduan({
      judul: formData.judul,
      kategori: formData.kategori,
      urgensi: formData.urgensi,
      lokasiDesa: formData.lokasiDesa,
      lokasiDetail: formData.lokasiDetail || `Wilayah Desa ${formData.lokasiDesa}`,
      deskripsi: formData.deskripsi,
      fotoUrl: formData.fotoUrl || (formData.kategori === 'Infrastruktur & Jalan' 
        ? 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=800&auto=format&fit=crop&q=80' 
        : undefined),
      isAnonim: formData.isAnonim
    });

    // Reset form
    setFormData({
      judul: '',
      kategori: 'Infrastruktur & Jalan',
      urgensi: 'Sedang',
      lokasiDesa: currentUser?.desa || 'Gumelar',
      lokasiDetail: '',
      deskripsi: '',
      fotoUrl: '',
      isAnonim: false
    });
    setIsFormOpen(false);
  };

  const handleSendOfficialReply = (aduanId: string) => {
    if (!replyText.trim()) return;
    tanggapiPengaduan(aduanId, replyText, replyStatusUpdate);
    setReplyText('');
    setActiveReplyId(null);
  };

  const statusCount = {
    total: pengaduanList.length,
    darurat: pengaduanList.filter(p => p.urgensi === 'Darurat').length,
    proses: pengaduanList.filter(p => p.status === 'Dalam Penanganan' || p.status === 'Diteruskan ke Seksi Terkait').length,
    selesai: pengaduanList.filter(p => p.status === 'Selesai').length,
  };

  return (
    <section className="py-12 bg-white border-b border-slate-200">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold mb-2">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
              Lapor Gumelar - E-Aduan Terpadu
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Sistem Pengaduan Online & Respon Lapangan
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Saluran aspirasi dan pengaduan cepat masyarakat Kecamatan Gumelar. Laporan Anda langsung diteruskan ke seksi teknis terkait dengan notifikasi tindak lanjut real-time.
            </p>
          </div>

          <button
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer self-start md:self-auto"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Tulis Pengaduan Baru</span>
          </button>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Aduan Masuk</span>
            <p className="text-2xl font-black text-slate-900 mt-0.5">{statusCount.total}</p>
            <span className="text-[11px] text-slate-500">Transparan & Terdata</span>
          </div>
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200">
            <span className="text-[10px] uppercase font-bold text-rose-700 block">Aduan Darurat (Longsor/Bencana)</span>
            <p className="text-2xl font-black text-rose-800 mt-0.5">{statusCount.darurat}</p>
            <span className="text-[11px] text-rose-600 font-semibold">Prioritas Penanganan TRC</span>
          </div>
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
            <span className="text-[10px] uppercase font-bold text-amber-700 block">Sedang Ditindaklanjuti</span>
            <p className="text-2xl font-black text-amber-800 mt-0.5">{statusCount.proses}</p>
            <span className="text-[11px] text-amber-700 font-medium">Dalam Pengerjaan Tim</span>
          </div>
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
            <span className="text-[10px] uppercase font-bold text-emerald-700 block">Selesai Dikerjakan</span>
            <p className="text-2xl font-black text-emerald-800 mt-0.5">{statusCount.selesai}</p>
            <span className="text-[11px] text-emerald-700 font-medium">Solusi Tuntas Warga</span>
          </div>
        </div>

        {/* Modal / Form Collapse: Tulis Pengaduan Baru */}
        {isFormOpen && (
          <form
            onSubmit={handleCreateComplaint}
            className="mb-8 p-6 sm:p-8 bg-slate-50 rounded-3xl border border-emerald-200 shadow-md space-y-4 animate-in fade-in"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                Formulir Laporan Pengaduan & Keluhan Warga
              </h3>
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="text-xs font-bold text-slate-500 hover:text-slate-800 cursor-pointer"
              >
                Tutup
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Kategori Masalah *</label>
                <select
                  value={formData.kategori}
                  onChange={(e) => setFormData({ ...formData, kategori: e.target.value as KategoriAduan })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Infrastruktur & Jalan">Infrastruktur & Jalan Rusak</option>
                  <option value="Bencana Alam & Longsor">Bencana Alam & Rekahan Tebing</option>
                  <option value="Pelayanan Publik">Pelayanan Publik & PATEN</option>
                  <option value="Kebersihan & Lingkungan">Kebersihan & Sampah Liar</option>
                  <option value="Kesehatan & Bansos">Kesehatan & Penyaluran Bansos</option>
                  <option value="Ketertiban & Keamanan">Ketertiban, Trantib & Keamanan</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tingkat Urgensi *</label>
                <select
                  value={formData.urgensi}
                  onChange={(e) => setFormData({ ...formData, urgensi: e.target.value as UrgensiAduan })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white focus:ring-2 focus:ring-emerald-500 font-semibold"
                >
                  <option value="Sedang">Sedang (Standar Respon 1-2 Hari)</option>
                  <option value="Darurat">Darurat (Ancaman Jiwa/Jalan Putus/Longsor - Respon Segera)</option>
                  <option value="Rendah">Rendah (Aspirasi & Masukan Rutin)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Lokasi Desa *</label>
                <select
                  value={formData.lokasiDesa}
                  onChange={(e) => setFormData({ ...formData, lokasiDesa: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white focus:ring-2 focus:ring-emerald-500"
                >
                  {VILLAGES_DATA.map((v) => (
                    <option key={v.id} value={v.nama.replace('Desa ', '')}>
                      {v.nama}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Judul Laporan *</label>
                <input
                  type="text"
                  value={formData.judul}
                  onChange={(e) => setFormData({ ...formData, judul: e.target.value })}
                  placeholder="Contoh: Gorong-gorong Jalan Ambles Dekat Jembatan Petahunan"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs bg-white focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Rincian Titik Lokasi *</label>
                <input
                  type="text"
                  value={formData.lokasiDetail}
                  onChange={(e) => setFormData({ ...formData, lokasiDetail: e.target.value })}
                  placeholder="Contoh: RT 02 / RW 04, Jl. Raya Curug Nangga KM 2..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs bg-white focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Kronologi / Penjelasan Masalah *</label>
              <textarea
                rows={3}
                value={formData.deskripsi}
                onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
                placeholder="Jelaskan kondisi di lapangan secara objektif, dampak bagi masyarakat, dan hal yang mendesak untuk ditangani..."
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs bg-white focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
              <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isAnonim}
                  onChange={(e) => setFormData({ ...formData, isAnonim: e.target.checked })}
                  className="rounded text-emerald-600 focus:ring-emerald-500"
                />
                <span className="flex items-center gap-1 font-medium">
                  <EyeOff className="w-3.5 h-3.5 text-slate-400" />
                  Kirim sebagai Laporan Anonim (Nama pelapor dirahasiakan ke publik)
                </span>
              </label>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  Kirim Pengaduan Sekarang
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Filter:
            </span>

            {/* Filter Status */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs bg-white text-slate-700 font-medium"
            >
              <option value="Semua">Semua Status ({pengaduanList.length})</option>
              <option value="Menunggu Validasi">Menunggu Validasi</option>
              <option value="Diteruskan ke Seksi Terkait">Diteruskan ke Seksi</option>
              <option value="Dalam Penanganan">Dalam Penanganan</option>
              <option value="Selesai">Selesai</option>
            </select>

            {/* Filter Urgensi */}
            <select
              value={filterUrgensi}
              onChange={(e) => setFilterUrgensi(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs bg-white text-slate-700 font-medium"
            >
              <option value="Semua">Semua Urgensi</option>
              <option value="Darurat">🚨 Darurat</option>
              <option value="Sedang">⚠️ Sedang</option>
              <option value="Rendah">ℹ️ Rendah</option>
            </select>

            {/* Filter Desa */}
            <select
              value={filterDesa}
              onChange={(e) => setFilterDesa(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs bg-white text-slate-700 font-medium"
            >
              <option value="Semua">Semua Desa (10 Desa)</option>
              {VILLAGES_DATA.map((v) => (
                <option key={v.id} value={v.nama.replace('Desa ', '')}>
                  {v.nama}
                </option>
              ))}
            </select>
          </div>

          <span className="text-xs text-slate-500">
            Menampilkan <strong>{filteredComplaints.length}</strong> laporan
          </span>
        </div>

        {/* Complaints Feed List */}
        <div className="space-y-5">
          {filteredComplaints.map((item) => (
            <div
              key={item.id}
              className={`rounded-2xl border p-5 sm:p-6 transition-all ${
                item.urgensi === 'Darurat'
                  ? 'border-rose-300 bg-rose-50/20 shadow-xs'
                  : 'border-slate-200 bg-white shadow-xs'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                      #{item.kodeTiket}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                      {item.kategori}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                      item.urgensi === 'Darurat' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      Urgensi: {item.urgensi}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-1">
                    {item.judul}
                  </h3>

                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                      Desa {item.lokasiDesa} • {item.lokasiDetail}
                    </span>
                    <span>•</span>
                    <span className="text-slate-400">{item.tanggalLapor}</span>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="shrink-0">
                  <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl border ${
                    item.status === 'Selesai'
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                      : item.status === 'Dalam Penanganan'
                      ? 'bg-amber-100 text-amber-800 border-amber-300'
                      : 'bg-slate-100 text-slate-700 border-slate-300'
                  }`}>
                    {item.status === 'Selesai' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                    {item.status === 'Dalam Penanganan' && <Clock className="w-3.5 h-3.5 text-amber-600 animate-spin" />}
                    {item.status}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mt-3">
                {item.deskripsi}
              </p>

              {/* Optional Photo Attachment */}
              {item.fotoUrl && (
                <div className="mt-3 rounded-xl overflow-hidden max-w-md border border-slate-200">
                  <img
                    src={item.fotoUrl}
                    alt={item.judul}
                    className="w-full h-44 object-cover"
                    loading="lazy"
                  />
                </div>
              )}

              {/* Pelapor Info */}
              <div className="mt-3 text-xs text-slate-400 flex items-center justify-between">
                <span>Pelapor: <strong className="text-slate-600">{item.pelaporNama}</strong></span>
              </div>

              {/* Official Responses Section */}
              {item.tanggapanPetugas.length > 0 && (
                <div className="mt-4 pt-4 border-t border-slate-100 space-y-2.5">
                  <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
                    Tindak Lanjut & Respon Resmi Pemerintah:
                  </span>
                  {item.tanggapanPetugas.map((resp) => (
                    <div
                      key={resp.id}
                      className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-emerald-950 flex items-center gap-1.5">
                          <Building2 className="w-3.5 h-3.5 text-emerald-700" />
                          {resp.namaPetugas}
                          <span className="text-[10px] text-emerald-700 font-normal">({resp.jabatan})</span>
                        </span>
                        <span className="text-[10px] text-emerald-600 font-mono">{resp.tanggal}</span>
                      </div>
                      <p className="text-slate-700 pl-5">{resp.isi}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Actions Footer */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => upvotePengaduan(item.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    item.hasUpvoted
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                  aria-label="Dukung Pengaduan Ini"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>Dukung Laporan ({item.upvotes})</span>
                </button>

                {/* Respond button for Petugas or testing */}
                <button
                  onClick={() => setActiveReplyId(activeReplyId === item.id ? null : item.id)}
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-800 hover:underline cursor-pointer flex items-center gap-1"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{currentUser?.role === 'petugas' ? 'Beri Tindak Lanjut Petugas' : 'Tanggapi / Beri Info'}</span>
                </button>
              </div>

              {/* Reply Box if open */}
              {activeReplyId === item.id && (
                <div className="mt-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2.5 animate-in fade-in">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800">
                      Tulis Tanggapan Resmi untuk Laporan #{item.kodeTiket}
                    </span>
                    <select
                      value={replyStatusUpdate}
                      onChange={(e) => setReplyStatusUpdate(e.target.value as StatusAduan)}
                      className="px-2 py-1 rounded-lg border border-slate-300 text-xs bg-white font-semibold"
                    >
                      <option value="Diteruskan ke Seksi Terkait">Status: Diteruskan ke Seksi</option>
                      <option value="Dalam Penanganan">Status: Dalam Penanganan</option>
                      <option value="Selesai">Status: Selesai Ditindaklanjuti</option>
                    </select>
                  </div>

                  <textarea
                    rows={2}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Tuliskan respon resmi tindak lanjut (misal: tim lapangan telah tiba, material sedang dipasang, dll)..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white focus:ring-2 focus:ring-emerald-500"
                  />

                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setActiveReplyId(null)}
                      className="px-3 py-1.5 rounded-lg bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
                    >
                      Batal
                    </button>
                    <button
                      onClick={() => handleSendOfficialReply(item.id)}
                      className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
                    >
                      Kirim Tanggapan & Perbarui Status
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
