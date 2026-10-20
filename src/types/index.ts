export type UserRole = 'warga' | 'petugas' | 'kades';

export interface CitizenRecord {
  nik: string;
  kk: string;
  nama: string;
  jenisKelamin: 'L' | 'P';
  tempatLahir: string;
  tanggalLahir: string;
  desa: string;
  rt: string;
  rw: string;
  alamat: string;
  agama: string;
  pekerjaan: string;
  telepon: string;
  email: string;
  role: UserRole;
  isVerified: boolean;
  avatarUrl?: string;
}

export interface VillageProfile {
  id: string;
  nama: string;
  kepalaDesa: string;
  sekretarisDesa: string;
  populasi: number;
  luasWilayahKm2: number;
  jumlahRt: number;
  jumlahRw: number;
  komoditasUnggulan: string[];
  deskripsi: string;
  visiMisi: string;
  fotoUrl: string;
  kontak: {
    telepon: string;
    email: string;
    alamatKantor: string;
  };
  poskoSiagaBencana: string;
}

export interface TourismDestination {
  id: string;
  nama: string;
  desa: string;
  kategori: 'Air Terjun' | 'Bukit & Pemandangan' | 'Agrowisata' | 'Budaya & Religi' | 'Rekreasi Keluarga';
  deskripsi: string;
  dayaTarik: string[];
  tiketMasuk: string;
  jamBuka: string;
  fasilitas: string[];
  koordinat: [number, number];
  fotoUrl: string;
  rating: number;
  jumlahUlasan: number;
  ruteAkses: string;
}

export type LayananCategory = 
  | 'Kependudukan' 
  | 'Kesejahteraan Sosial' 
  | 'Perizinan Usaha' 
  | 'Pertanahan' 
  | 'Umum & Rekomendasi';

export interface LayananItem {
  id: string;
  nama: string;
  kategori: LayananCategory;
  deskripsi: string;
  syarat: string[];
  durasiSlaHari: number;
  biaya: string;
  outputDokumen: string;
  pjSeksi: string;
}

export type StatusPelayanan = 'Menunggu Verifikasi' | 'Diproses' | 'Perbaikan Berkas' | 'Selesai & Siap Diambil' | 'Ditolak';

export interface PermohonanLayanan {
  id: string;
  kodeTiket: string;
  layananId: string;
  namaLayanan: string;
  pemohonNik: string;
  pemohonNama: string;
  pemohonTelepon: string;
  pemohonDesa: string;
  catatanPemohon: string;
  tanggalPengajuan: string;
  estimasiSelesai: string;
  status: StatusPelayanan;
  catatanPetugas?: string;
  berkasLampiran: string[];
  diperbaruiPada: string;
}

export type StatusAduan = 'Menunggu Validasi' | 'Diteruskan ke Seksi Terkait' | 'Dalam Penanganan' | 'Selesai';
export type UrgensiAduan = 'Rendah' | 'Sedang' | 'Darurat';
export type KategoriAduan = 
  | 'Infrastruktur & Jalan' 
  | 'Bencana Alam & Longsor' 
  | 'Pelayanan Publik' 
  | 'Kebersihan & Lingkungan' 
  | 'Kesehatan & Bansos' 
  | 'Ketertiban & Keamanan';

export interface PengaduanItem {
  id: string;
  kodeTiket: string;
  judul: string;
  kategori: KategoriAduan;
  urgensi: UrgensiAduan;
  lokasiDesa: string;
  lokasiDetail: string;
  deskripsi: string;
  fotoUrl?: string;
  pelaporNik: string;
  pelaporNama: string;
  isAnonim: boolean;
  tanggalLapor: string;
  status: StatusAduan;
  tanggapanPetugas: Array<{
    id: string;
    namaPetugas: string;
    jabatan: string;
    isi: string;
    tanggal: string;
    fotoBuktiTindakLanjut?: string;
  }>;
  upvotes: number;
  hasUpvoted?: boolean;
}

export interface ForumTopic {
  id: string;
  judul: string;
  kategori: 'Kabar Desa' | 'UMKM & Usaha Lokal' | 'Pertanian & Peternakan' | 'Kepemudaan' | 'Gotong Royong';
  desa: string;
  penulisNik: string;
  penulisNama: string;
  isPenulisVerified: boolean;
  isi: string;
  tanggalDibuat: string;
  upvotes: number;
  hasUpvoted?: boolean;
  tags: string[];
  komentar: Array<{
    id: string;
    penulisNik: string;
    penulisNama: string;
    penulisDesa: string;
    isi: string;
    tanggal: string;
    isVerified: boolean;
  }>;
}

export type MapFacilityCategory = 'kesehatan' | 'pendidikan' | 'pemerintahan' | 'wisata' | 'posko_siaga';

export interface FacilityMarker {
  id: string;
  nama: string;
  kategori: MapFacilityCategory;
  desa: string;
  alamat: string;
  koordinat: [number, number]; // lat, lng
  deskripsi: string;
  kontak: string;
  jamOperasional: string;
  penanggungJawab: string;
}

export interface AgendaEvent {
  id: string;
  judul: string;
  kategori: 'Kesehatan' | 'Pemerintahan' | 'Budaya & Tradisi' | 'Sosial & Gotong Royong' | 'Olahraga & Pemuda';
  desa: string;
  lokasi: string;
  tanggalMulai: string; // YYYY-MM-DD
  waktuMulai: string; // HH:mm
  waktuSelesai: string;
  deskripsi: string;
  penyelenggara: string;
  kontakPerson: string;
  kuotaPeserta?: number;
  pesertaHadirCount: number;
  isRsvp?: boolean;
}

export interface NotificationItem {
  id: string;
  tipe: 'aduan' | 'layanan' | 'darurat' | 'forum' | 'agenda';
  judul: string;
  pesan: string;
  tanggal: string;
  isRead: boolean;
  linkTab?: string;
  targetId?: string;
}
