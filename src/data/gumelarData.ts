import {
  VillageProfile,
  TourismDestination,
  LayananItem,
  PermohonanLayanan,
  PengaduanItem,
  ForumTopic,
  FacilityMarker,
  AgendaEvent,
  CitizenRecord,
  NotificationItem
} from '../types';

export const KECAMATAN_INFO = {
  nama: 'Kecamatan Gumelar',
  kabupaten: 'Kabupaten Banyumas',
  provinsi: 'Jawa Tengah',
  kodePos: '53165',
  camatNama: 'Drs. Arif Triyanto, M.Si.',
  sekcamNama: 'H. Sudarsono, S.Sos.',
  alamatKantor: 'Jl. Raya Gumelar No. 1, Kecamatan Gumelar, Kabupaten Banyumas, Jawa Tengah 53165',
  telepon: '(0281) 6570012',
  whatsappAduan: '0812-2890-5541',
  email: 'kecamatan.gumelar@banyumaskab.go.id',
  jamPelayanan: 'Senin - Kamis: 07.30 - 15.30 WIB | Jumat: 07.30 - 14.30 WIB',
  luasWilayahKm2: 93.95,
  jumlahDesa: 10,
  jumlahPenduduk: 56420,
  jumlahKeluarga: 17280,
  semboyan: 'Gumelar Gemah Ripah, Guyub Rukun, lan Tumata',
  visi: 'Terwujudnya Pelayanan Publik Kecamatan Gumelar yang Transparan, Akuntabel, dan Inklusif Menuju Masyarakat Mandiri dan Sejahtera Berbasis Potensi Lokal dan Kearifan Budaya Banyumas.',
  pusatKoordinat: [-7.3785, 108.9832] as [number, number]
};

export const DEMO_CITIZENS: CitizenRecord[] = [
  {
    nik: '3302171508920001',
    kk: '3302170102120001',
    nama: 'Bambang Supriyanto',
    jenisKelamin: 'L',
    tempatLahir: 'Banyumas',
    tanggalLahir: '1992-08-15',
    desa: 'Gumelar',
    rt: '03',
    rw: '02',
    alamat: 'Dusun Krajan, RT 03 / RW 02, Desa Gumelar',
    agama: 'Islam',
    pekerjaan: 'Petani & Pengusaha Gula Kelapa',
    telepon: '081392817263',
    email: 'bambang.supriyanto@gmail.com',
    role: 'warga',
    isVerified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
  },
  {
    nik: '3302175205980002',
    kk: '3302170104150005',
    nama: 'Siti Nurjanah',
    jenisKelamin: 'P',
    tempatLahir: 'Banyumas',
    tanggalLahir: '1998-05-12',
    desa: 'Petahunan',
    rt: '02',
    rw: '04',
    alamat: 'Grumbul Semingkir, RT 02 / RW 04, Desa Petahunan',
    agama: 'Islam',
    pekerjaan: 'Pengelola Pokdarwis Curug Nangga',
    telepon: '085726198421',
    email: 'siti.nurjanah@gmail.com',
    role: 'warga',
    isVerified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80'
  },
  {
    nik: '3302172103850003',
    kk: '3302170208100008',
    nama: 'Drs. Arif Triyanto, M.Si.',
    jenisKelamin: 'L',
    tempatLahir: 'Purwokerto',
    tanggalLahir: '1985-03-21',
    desa: 'Gumelar',
    rt: '01',
    rw: '01',
    alamat: 'Jl. Raya Gumelar No. 12',
    agama: 'Islam',
    pekerjaan: 'Camat Gumelar / Pembina Tk. I',
    telepon: '081228905541',
    email: 'camat@gumelar.banyumaskab.go.id',
    role: 'petugas',
    isVerified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80'
  },
  {
    nik: '3302171011880004',
    kk: '3302170305140012',
    nama: 'Rohmat Hidayat, S.Sos.',
    jenisKelamin: 'L',
    tempatLahir: 'Banyumas',
    tanggalLahir: '1988-11-10',
    desa: 'Petahunan',
    rt: '01',
    rw: '01',
    alamat: 'Balai Desa Petahunan, RT 01 / RW 01',
    agama: 'Islam',
    pekerjaan: 'Kepala Desa Petahunan',
    telepon: '082133445566',
    email: 'kades.petahunan@banyumaskab.go.id',
    role: 'kades',
    isVerified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
  }
];

export const VILLAGES_DATA: VillageProfile[] = [
  {
    id: 'gumelar',
    nama: 'Desa Gumelar',
    kepalaDesa: 'Teguh Sujarwo, S.Pd.',
    sekretarisDesa: 'Wahidin',
    populasi: 7240,
    luasWilayahKm2: 9.85,
    jumlahRt: 28,
    jumlahRw: 6,
    komoditasUnggulan: ['Pusat Perdagangan & Jasa', 'Padi Sawah Irigasi', 'Kerajinan Logam & Mebel', 'Kuliner Tradisional Mendoan'],
    deskripsi: 'Desa Gumelar merupakan ibukota dan pusat denyut nadi pemerintahan Kecamatan Gumelar. Di sini terdapat Pasar Wage Gumelar, pusat fasilitas kesehatan, SMK/SMP, serta sentra pertokoan warga.',
    visiMisi: 'Mewujudkan Desa Gumelar yang Maju, Bersih, Berdaya Saing melalui Penguatan UMKM dan Modernisasi Pelayanan Terpadu Warga.',
    fotoUrl: 'https://images.unsplash.com/photo-1584810359583-96fc3448beaa?w=800&auto=format&fit=crop&q=80',
    kontak: {
      telepon: '0813-2891-0021',
      email: 'pemdes.gumelar@banyumaskab.go.id',
      alamatKantor: 'Jl. Pemuda No. 04, Desa Gumelar'
    },
    poskoSiagaBencana: 'Posko Siaga Balai Desa & Pendopo Gumelar'
  },
  {
    id: 'cihonje',
    nama: 'Desa Cihonje',
    kepalaDesa: 'Khabib Rohman, S.E.',
    sekretarisDesa: 'Kusworo',
    populasi: 6890,
    luasWilayahKm2: 12.30,
    jumlahRt: 32,
    jumlahRw: 7,
    komoditasUnggulan: ['Gula Kelapa Semut Organik Ekspor', 'Kopi Robusta Lereng Gumelar', 'Peternakan Kambing Perah', 'Kayu Albasia & Mahoni'],
    deskripsi: 'Desa Cihonje dikenal sebagai salah satu sentra industri rumahan gula kelapa semut organik terbaik di Kabupaten Banyumas, dengan kelompok tani peraih sertifikasi organik internasional.',
    visiMisi: 'Menjadikan Cihonje sebagai Desa Mandiri Agribisnis Berkelanjutan dan Berdaya Saing Global.',
    fotoUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&auto=format&fit=crop&q=80',
    kontak: {
      telepon: '0852-2710-8832',
      email: 'pemdes.cihonje@banyumaskab.go.id',
      alamatKantor: 'Jl. Lapangan Desa Cihonje No. 1'
    },
    poskoSiagaBencana: 'Posko TRC Cihonje - Jalur Penghubung Curug'
  },
  {
    id: 'petahunan',
    nama: 'Desa Petahunan',
    kepalaDesa: 'Rohmat Hidayat, S.Sos.',
    sekretarisDesa: 'Titi Suryani',
    populasi: 5430,
    luasWilayahKm2: 11.20,
    jumlahRt: 24,
    jumlahRw: 5,
    komoditasUnggulan: ['Ekowisata Curug Nangga', 'Watu Meja / Bukit Ragas', 'Kapulaga Organik', 'Kopi Arabika/Robusta'],
    deskripsi: 'Desa Petahunan adalah primadona pariwisata alam Kecamatan Gumelar berkat keelokan Curug Nangga bertingkat 7 dan bukit-bukit hijau yang asri dan sejuk berhawa pegunungan.',
    visiMisi: 'Membangun Petahunan sebagai Desa Wisata Berbasis Komunitas dan Konservasi Hutan Alam.',
    fotoUrl: 'https://images.unsplash.com/photo-1546548970-71785318a17b?w=800&auto=format&fit=crop&q=80',
    kontak: {
      telepon: '0821-3344-5566',
      email: 'pemdes.petahunan@banyumaskab.go.id',
      alamatKantor: 'Jl. Wisata Curug Nangga No. 02, Petahunan'
    },
    poskoSiagaBencana: 'Posko Siaga Gerakan Tanggap Longsor Petahunan'
  },
  {
    id: 'samudra',
    nama: 'Desa Samudra',
    kepalaDesa: 'Waris Suyatno',
    sekretarisDesa: 'Sugiarto',
    populasi: 4950,
    luasWilayahKm2: 10.40,
    jumlahRt: 22,
    jumlahRw: 5,
    komoditasUnggulan: ['Curug Pengantin', 'Perkebunan Cengkeh', 'Peternakan Ayam Broiler', 'Anyaman Bambu Tradisional'],
    deskripsi: 'Desa Samudra memiliki bentang alam perbukitan dengan aliran sungai jernih dan air terjun alami Curug Pengantin, serta tradisi guyub rukun gotong royong warga yang masih sangat kental.',
    visiMisi: 'Samudra Lestari, Harmonis dalam Tradisi, Unggul dalam Pertanian Ramah Lingkungan.',
    fotoUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=80',
    kontak: {
      telepon: '0878-1920-3344',
      email: 'pemdes.samudra@banyumaskab.go.id',
      alamatKantor: 'Jl. Balai Desa Samudra No. 05'
    },
    poskoSiagaBencana: 'Posko Relawan Siaga Bencana Samudra'
  },
  {
    id: 'samudra-kulon',
    nama: 'Desa Samudra Kulon',
    kepalaDesa: 'Subur Raharjo',
    sekretarisDesa: 'Ahmad Fauzi',
    populasi: 4320,
    luasWilayahKm2: 8.70,
    jumlahRt: 20,
    jumlahRw: 4,
    komoditasUnggulan: ['Kesenian Ebeg Banyumasan', 'Padi Beras Merah', 'Kolam Ikan Air Tawar Gurame & Nila', 'Gula Jawa'],
    deskripsi: 'Desa Samudra Kulon merupakan benteng pelestarian budaya kesenian tradisional Banyumasan, kelompok Ebeg, calung, serta sentra budidaya perikanan kolam air tawar.',
    visiMisi: 'Mewujudkan Samudra Kulon Berbudaya, Berketahanan Pangan, dan Sejahtera Lahir Batin.',
    fotoUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
    kontak: {
      telepon: '0812-4455-6677',
      email: 'pemdes.samudrakulon@banyumaskab.go.id',
      alamatKantor: 'Jl. Budaya RT 02 / RW 01 Samudra Kulon'
    },
    poskoSiagaBencana: 'Posko Siaga Desa Samudra Kulon'
  },
  {
    id: 'cilangkap',
    nama: 'Desa Cilangkap',
    kepalaDesa: 'Suparman, S.P.',
    sekretarisDesa: 'Dian Fitriani',
    populasi: 5120,
    luasWilayahKm2: 7.90,
    jumlahRt: 22,
    jumlahRw: 5,
    komoditasUnggulan: ['Kerajinan Anyaman Bambu', 'Kripik Pisang & Singkong', 'Padi Organik', 'Sayuran Hortikultura'],
    deskripsi: 'Desa Cilangkap terkenal dengan kelompok perajin anyaman bambu (tampah, besek, caping) yang memasok kebutuhan cinderamata dan pasar tradisional Banyumas.',
    visiMisi: 'Cilangkap Terampil, Mandiri dan Berkeadaban.',
    fotoUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop&q=80',
    kontak: {
      telepon: '0858-7711-2233',
      email: 'pemdes.cilangkap@banyumaskab.go.id',
      alamatKantor: 'Jl. Raya Cilangkap No. 10'
    },
    poskoSiagaBencana: 'Posko Siaga Kebencanaan Cilangkap'
  },
  {
    id: 'gancang',
    nama: 'Desa Gancang',
    kepalaDesa: 'Budi Santoso',
    sekretarisDesa: 'Imam Safii',
    populasi: 4890,
    luasWilayahKm2: 9.15,
    jumlahRt: 21,
    jumlahRw: 4,
    komoditasUnggulan: ['Kapulaga Kering Super', 'Peternakan Kambing Jawarandu', 'Gula Aren Murni', 'Kayu Sengon'],
    deskripsi: 'Desa Gancang merupakan salah satu produsen kapulaga terbesar di Gumelar, dipadukan dengan peternakan kambing potong yang terorganisir rapi melalui kelompok peternak.',
    visiMisi: 'Peternakan dan Rempah Gancang Unggul untuk Kesejahteraan Wong Cilik.',
    fotoUrl: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=800&auto=format&fit=crop&q=80',
    kontak: {
      telepon: '0822-9988-7766',
      email: 'pemdes.gancang@banyumaskab.go.id',
      alamatKantor: 'Jl. Balai Desa Gancang No. 3'
    },
    poskoSiagaBencana: 'Posko Siaga Gancang Waspada'
  },
  {
    id: 'kedungurang',
    nama: 'Desa Kedungurang',
    kepalaDesa: 'Tri Haryanto',
    sekretarisDesa: 'Eko Purnomo',
    populasi: 5310,
    luasWilayahKm2: 8.50,
    jumlahRt: 24,
    jumlahRw: 5,
    komoditasUnggulan: ['Durian Montong & Durian Lokal Banyumas', 'Rambutan Binjai', 'Madu Hutan Klanceng', 'Sawah Terasering'],
    deskripsi: 'Desa Kedungurang menjadi surganya pencinta buah tropis di Gumelar, khususnya musim durian dan rambutan di kebun warga lereng perbukitan.',
    visiMisi: 'Kedungurang Asri, Lumbung Buah Tropis Banyumas Barat.',
    fotoUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=80',
    kontak: {
      telepon: '0813-7766-5544',
      email: 'pemdes.kedungurang@banyumaskab.go.id',
      alamatKantor: 'Jl. Durian Raya No. 1, Kedungurang'
    },
    poskoSiagaBencana: 'Posko Siaga Kedungurang Aman'
  },
  {
    id: 'tlaga',
    nama: 'Desa Tlaga',
    kepalaDesa: 'Agus Salim',
    sekretarisDesa: 'Nur Khasanah',
    populasi: 4720,
    luasWilayahKm2: 10.10,
    jumlahRt: 20,
    jumlahRw: 4,
    komoditasUnggulan: ['Mata Air Alami Pegunungan', 'Sayuran Daun Hijau', 'Peternakan Sapi Potong', 'Pohon Bambu Petung'],
    deskripsi: 'Desa Tlaga berada di kawasan dataran tinggi dengan udara sejuk, menjadi hulu dan sumber mata air penting bagi irigasi sawah di kawasan hilir Gumelar.',
    visiMisi: 'Pelestarian Hulu Alam Tlaga untuk Kesejahteraan Bersama.',
    fotoUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80',
    kontak: {
      telepon: '0856-3322-1100',
      email: 'pemdes.tlaga@banyumaskab.go.id',
      alamatKantor: 'Jl. Telaga Damai No. 8, Desa Tlaga'
    },
    poskoSiagaBencana: 'Posko Siaga Bencana Lereng Tlaga'
  },
  {
    id: 'karangkobar-gumelar',
    nama: 'Desa Karangkobar',
    kepalaDesa: 'Slamet Riyadi',
    sekretarisDesa: 'Mulyanto',
    populasi: 5470,
    luasWilayahKm2: 10.85,
    jumlahRt: 23,
    jumlahRw: 5,
    komoditasUnggulan: ['Padi Gogo Rancah', 'Gula Semut Jahe Merah', 'Sentra Olahan Pisang Sale', 'Peternakan Kambing PE'],
    deskripsi: 'Desa Karangkobar merupakan desa asri di perbatasan barat dengan hamparan bukit terasering hijau dan kelompok wanita tani (KWT) aktif inovatif memproduksi olahan jahe & gula semut.',
    visiMisi: 'Karangkobar Guyub Rukun, KWT Berdaya, Ekonomi Keluarga Sejahtera.',
    fotoUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80',
    kontak: {
      telepon: '0812-9900-1122',
      email: 'pemdes.karangkobar@banyumaskab.go.id',
      alamatKantor: 'Jl. KWT Melati No. 12, Karangkobar'
    },
    poskoSiagaBencana: 'Posko Siaga Tanggap Cepat Karangkobar'
  }
];

export const TOURISM_DESTINATIONS: TourismDestination[] = [
  {
    id: 'curug-nangga',
    nama: 'Curug Nangga (7 Tingkat)',
    desa: 'Petahunan',
    kategori: 'Air Terjun',
    deskripsi: 'Ikon pariwisata alam terpopuler di Kecamatan Gumelar dan Kabupaten Banyumas. Air terjun spektakuler bertingkat tujuh undakan alami diapit bentangan sawah terasering berundak dan perbukitan pinus yang menakjubkan.',
    dayaTarik: [
      'Tujuh undakan air terjun berundak alami yang eksotis',
      'Spot foto jembatan bambu & dek pandang Lembah Nangga',
      'Pemandian air pegunungan alami yang dingin dan menyegarkan',
      'Warung kopi kapulaga & mendoan anget khas Petahunan'
    ],
    tiketMasuk: 'Rp 10.000 / orang (Parkir Motor Rp 3.000, Mobil Rp 5.000)',
    jamBuka: 'Setiap Hari 07.30 - 17.00 WIB',
    fasilitas: ['Area Parkir Luas', 'Mushola Asri', 'Toilet & Kamar Bilas Bersih', 'Warung Makan Warga', 'Gazebo Istirahat', 'Papan Petunjuk'],
    koordinat: [-7.3892, 108.9721],
    fotoUrl: 'https://images.unsplash.com/photo-1546548970-71785318a17b?w=800&auto=format&fit=crop&q=80',
    rating: 4.8,
    jumlahUlasan: 342,
    ruteAkses: 'Dari Pusat Kecamatan Gumelar menuju Desa Petahunan (sekitar 6 km, 15 menit), jalan sudah beraspal dan rabat beton mulus dapat dilalui motor & mobil.'
  },
  {
    id: 'watu-meja-ragas',
    nama: 'Bukit Ragas & Watu Meja Petahunan',
    desa: 'Petahunan',
    kategori: 'Bukit & Pemandangan',
    deskripsi: 'Spot panorama bukit tertinggi untuk menikmati matahari terbit (sunrise), lautan kabut pagi bak negeri di atas awan, serta bentang lanskap hutan lindung pegunungan Gumelar.',
    dayaTarik: [
      'Pemandangan Golden Sunrise dan Samudra Awan kabut pagi',
      'Batu besar alami berbentuk meja (Watu Meja) tempat berteduh',
      'Jalur hiking santai melintasi perkebunan kapulaga',
      'Spot foto matahari terbenam (sunset) berlatar siluet pegunungan'
    ],
    tiketMasuk: 'Rp 5.000 / orang',
    jamBuka: '24 Jam (Camping Ground dengan izin Pokdarwis)',
    fasilitas: ['Camping Ground', 'Toilet Umum', 'Pos Pantau Relawan', 'Warung Kopi Puncak'],
    koordinat: [-7.3945, 108.9654],
    fotoUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=80',
    rating: 4.7,
    jumlahUlasan: 189,
    ruteAkses: 'Terletak di atas kawasan Curug Nangga Petahunan, dilanjutkan treking 15-20 menit melintasi jalan setapak bebatuan yang tertata.'
  },
  {
    id: 'curug-pengantin',
    nama: 'Wisata Alam Curug Pengantin',
    desa: 'Samudra',
    kategori: 'Air Terjun',
    deskripsi: 'Air terjun kembar bersisian yang mengalir jatuh ke dalam kolam alami berwarna kehijauan dengan suasana sunyi dan teduh, dikelilingi pepohonan hutan yang masih sangat alami.',
    dayaTarik: [
      'Aliran dua air terjun kembar sejajar bak pasangan pengantin',
      'Kolam kedung alami untuk berenang dan bermain air',
      'Spot memancing ikan air tawar khas sungai pegunungan',
      'Suasana damai jauh dari kebisingan kota'
    ],
    tiketMasuk: 'Rp 7.000 / orang',
    jamBuka: 'Setiap Hari 08.00 - 16.30 WIB',
    fasilitas: ['Tempat Parkir Roda Dua', 'Warung Kopi & Cemilan', 'Kamar Mandi Sederhana', 'Tempat Duduk Bambu'],
    koordinat: [-7.3712, 108.9634],
    fotoUrl: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=800&auto=format&fit=crop&q=80',
    rating: 4.6,
    jumlahUlasan: 112,
    ruteAkses: 'Akses melalui Desa Samudra, sekitar 5 km dari Balai Desa Gumelar arah barat daya.'
  },
  {
    id: 'agrowisata-gula-cihonje',
    nama: 'Sentra Edukasi Gula Semut & Kopi Cihonje',
    desa: 'Cihonje',
    kategori: 'Agrowisata',
    deskripsi: 'Destinasi wisata edukasi proses produksi gula kelapa kristal organik (gula semut) kelas ekspor dan perkebunan kopi robusta. Pengunjung dapat melihat langsung aksi penderes kelapa, proses kristalisasi, hingga mencicipi olahan gula semut aneka rasa.',
    dayaTarik: [
      'Demonstrasi langsung penderes kelapa tradisional',
      'Workshop membuat gula semut jahe dan gula semut original',
      'Wisata petik dan sangrai kopi robusta lereng Gumelar',
      'Pusat oleh-oleh produk UMKM asli warga Cihonje'
    ],
    tiketMasuk: 'Gratis (Paket Workshop & Edukasi Rp 25.000/orang termasuk tester & produk)',
    jamBuka: 'Senin - Sabtu 08.00 - 16.00 WIB',
    fasilitas: ['Ruang Workshop Koperasi Tani', 'Gerai Oleh-Oleh', 'Mushola', 'Toilet', 'Area Parkir'],
    koordinat: [-7.3688, 108.9950],
    fotoUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&auto=format&fit=crop&q=80',
    rating: 4.9,
    jumlahUlasan: 145,
    ruteAkses: 'Jl. Lapangan Desa Cihonje, 3 menit dari jalur utama Gumelar - Ajibarang.'
  },
  {
    id: 'pemandian-tirta-gumelar',
    nama: 'Taman Tirta Gumelar & River Tubing',
    desa: 'Gumelar',
    kategori: 'Rekreasi Keluarga',
    deskripsi: 'Taman rekreasi air keluarga bersumber dari mata air alami pegunungan yang tidak menggunakan kaporit, dipadukan dengan wahana river tubing melintasi arus sungai jernih yang aman untuk pemula dan keluarga.',
    dayaTarik: [
      'Kolam renang mata air dingin segar tanpa kaporit',
      'Jalur River Tubing sepanjang 1,2 km dengan pemandu bersertifikat',
      'Taman bermain anak dan spot kuliner jajanan tradisional',
      'Penyewaan pelampung dan perlengkapan safety lengkap'
    ],
    tiketMasuk: 'Rp 8.000 / orang (River Tubing Rp 35.000 include helm, pelampung & guide)',
    jamBuka: 'Selasa - Minggu 08.00 - 17.00 WIB',
    fasilitas: ['Kolam Anak & Dewasa', 'Kamar Ganti & Loker', 'Kantin Tirta', 'Penyewaan Ban Tubing', 'Parkir Luas'],
    koordinat: [-7.3754, 108.9811],
    fotoUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80',
    rating: 4.6,
    jumlahUlasan: 204,
    ruteAkses: 'Berada di belakang kompleks Kantor Kecamatan Gumelar, sangat mudah dijangkau.'
  },
  {
    id: 'makam-kyai-gusti',
    nama: 'Wisata Religi Petilasan Kyai Gusti',
    desa: 'Gumelar',
    kategori: 'Budaya & Religi',
    deskripsi: 'Situs cagar budaya dan ziarah religi tokoh penyiar agama Islam dan pembuka sejarah kawasan Gumelar tempo dulu. Tempat ini menjadi tujuan peziarah dari berbagai daerah khususnya pada malam Jumat Kliwon dan bulan Ruwah/Sura.',
    dayaTarik: [
      'Makam bersejarah yang dikelilingi pepohonan rindang ratusan tahun',
      'Mata air suci sumur panguripan yang tidak pernah kering',
      'Suasana spiritual yang teduh dan menenangkan',
      'Tradisi Sadranan dan Sedekah Bumi tahunan'
    ],
    tiketMasuk: 'Infaq Sukarela',
    jamBuka: '24 Jam',
    fasilitas: ['Pendopo Pasarean', 'Tempat Wudhu & Mushola', 'Toilet', 'Area Parkir Peziarah'],
    koordinat: [-7.3820, 108.9785],
    fotoUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
    rating: 4.7,
    jumlahUlasan: 98,
    ruteAkses: 'Akses mudah sekitar 800 meter dari Kantor Camat Gumelar menuju ke arah perbukitan selatan.'
  }
];

export const PUBLIC_SERVICES_LIST: LayananItem[] = [
  {
    id: 'layanan-ktp',
    nama: 'Surat Pengantar Rekam KTP-el / Penggantian Rusak-Hilang',
    kategori: 'Kependudukan',
    deskripsi: 'Pelayanan pengantar administrasi pencetakan dan perekaman KTP-el bagi warga yang baru berusia 17 tahun, pindah domisili, atau KTP lama yang rusak/hilang.',
    syarat: [
      'Surat Pengantar dari Ketua RT/RW dan Balai Desa setempat',
      'Fotokopi Kartu Keluarga (KK) terbaru',
      'KTP-el lama (jika rusak) atau Surat Kehilangan Polsek (jika hilang)',
      'Akta Kelahiran / Ijazah terakhir'
    ],
    durasiSlaHari: 1,
    biaya: 'Gratis (Rp 0,-)',
    outputDokumen: 'Surat Pengantar KTP-el Kecamatan ber-Barcode Digital & Rekomendasi Cetak',
    pjSeksi: 'Seksi Pelayanan Masyarakat (Yanduk)'
  },
  {
    id: 'layanan-kk',
    nama: 'Pengantar Perubahan / Pemecahan Kartu Keluarga (KK)',
    kategori: 'Kependudukan',
    deskripsi: 'Pengajuan pecah KK (karena menikah, berpisah), penambahan anggota keluarga (kelahiran), atau perubahan elemen biodata (pekerjaan, pendidikan).',
    syarat: [
      'Pengantar RT/RW dan Desa (Formulir F-1.01)',
      'Kartu Keluarga asli lama',
      'Buku Nikah / Akta Cerai (bila perubahan status nikah)',
      'Surat Keterangan Kelahiran / Kematian / Ijazah pendukung'
    ],
    durasiSlaHari: 2,
    biaya: 'Gratis (Rp 0,-)',
    outputDokumen: 'Validasi Berkas & Draft Cetak Kartu Keluarga Baru Disdukcapil',
    pjSeksi: 'Seksi Pelayanan Masyarakat'
  },
  {
    id: 'layanan-sktm',
    nama: 'Rekomendasi Surat Keterangan Tidak Mampu (SKTM)',
    kategori: 'Kesejahteraan Sosial',
    deskripsi: 'Penerbitan surat rekomendasi bagi keluarga pra-sejahtera untuk keperluan keringanan biaya rumah sakit (BPJS PBI / KIS) atau pengajuan beasiswa pendidikan sekolah/kuliah.',
    syarat: [
      'Surat Keterangan Tidak Mampu dari Pemerintah Desa asal',
      'Fotokopi KTP dan Kartu Keluarga',
      'Surat Pernyataan Tidak Mampu bermeterai 10.000',
      'Surat pengantar sekolah/kampus/rumah sakit (jika ada)'
    ],
    durasiSlaHari: 1,
    biaya: 'Gratis (Rp 0,-)',
    outputDokumen: 'Surat Rekomendasi SKTM Berstempel Resmi Camat Gumelar',
    pjSeksi: 'Seksi Kesejahteraan Rakyat (Kesra)'
  },
  {
    id: 'layanan-iumk',
    nama: 'Rekomendasi Izin Usaha Mikro Kecil (IUMK)',
    kategori: 'Perizinan Usaha',
    deskripsi: 'Fasilitasi legalitas dan rekomendasi izin bagi pelaku usaha mikro (gula semut, bengkel, warung kelontong, peternakan) untuk permodalan KUR dan pendaftaran NIB OSS.',
    syarat: [
      'Fotokopi KTP dan KK Pelaku Usaha',
      'Surat Pengantar Usaha dari Kepala Desa',
      'Foto produk/tempat usaha 2 lembar',
      'Formulir pendaftaran IUMK Kecamatan'
    ],
    durasiSlaHari: 2,
    biaya: 'Gratis (Rp 0,-)',
    outputDokumen: 'Surat Rekomendasi IUMK & Pendampingan Cetak NIB OSS RBA',
    pjSeksi: 'Seksi Ekonomi dan Pembangunan (Ekbang)'
  },
  {
    id: 'layanan-nikah-n1n4',
    nama: 'Dispensasi & Rekomendasi Pengantar Nikah (N1 - N4)',
    kategori: 'Umum & Rekomendasi',
    deskripsi: 'Pemeriksaan kelengkapan dokumen nikah untuk calon pengantin yang akan melangsungkan akad pernikahan di KUA Gumelar maupun numpang nikah ke luar wilayah.',
    syarat: [
      'Formulir N1 sampai N4 dari Balai Desa asal',
      'Fotokopi KTP, KK calon pengantin dan kedua orang tua',
      'Fotokopi Ijazah / Akta Lahir',
      'Surat Imunisasi TT dari Puskesmas Gumelar 1'
    ],
    durasiSlaHari: 1,
    biaya: 'Gratis (Rp 0,-)',
    outputDokumen: 'Lembar Verifikasi Rekomendasi Pernikahan Kecamatan Gumelar',
    pjSeksi: 'Seksi Pelayanan Masyarakat & Kesra'
  },
  {
    id: 'layanan-pindah',
    nama: 'Surat Keterangan Pindah Warga (SKPWNI Antar-Kecamatan/Kabupaten)',
    kategori: 'Kependudukan',
    deskripsi: 'Pelayanan penerbitan pengantar surat pindah datang atau pindah keluar domisili bagi warga antar kecamatan dalam satu kabupaten maupun ke luar kabupaten.',
    syarat: [
      'Surat Pengantar Pindah dari Desa (Form F-1.08)',
      'Kartu Keluarga asli & KTP asli pemohon',
      'Pas foto 3x4 (2 lembar) latar merah/biru',
      'Alamat tujuan lengkap dengan RT/RW dan kode pos'
    ],
    durasiSlaHari: 1,
    biaya: 'Gratis (Rp 0,-)',
    outputDokumen: 'Surat Keterangan Pindah Warga Negara Indonesia (SKPWNI)',
    pjSeksi: 'Seksi Pelayanan Masyarakat'
  }
];

export const INITIAL_PERMOHONAN: PermohonanLayanan[] = [
  {
    id: 'req-01',
    kodeTiket: 'GML-ADM-2026-4412',
    layananId: 'layanan-ktp',
    namaLayanan: 'Surat Pengantar Rekam KTP-el / Penggantian Rusak-Hilang',
    pemohonNik: '3302171508920001',
    pemohonNama: 'Bambang Supriyanto',
    pemohonTelepon: '081392817263',
    pemohonDesa: 'Gumelar',
    catatanPemohon: 'KTP-el fisik patah pada chip kartu saat bekerja di kebun, mohon rekomendasi cetak ulang.',
    tanggalPengajuan: '2026-10-18',
    estimasiSelesai: '2026-10-19',
    status: 'Selesai & Siap Diambil',
    catatanPetugas: 'Berkas telah diverifikasi lengkap. Surat pengantar rekomendasi cetak ulang telah ditandatangani Camat. Silakan datang ke Loket 2 Kantor Kecamatan dengan membawa KTP lama.',
    berkasLampiran: ['foto_ktp_rusak.jpg', 'kk_bambang.pdf'],
    diperbaruiPada: '2026-10-19 10:15 WIB'
  },
  {
    id: 'req-02',
    kodeTiket: 'GML-ADM-2026-7821',
    layananId: 'layanan-iumk',
    namaLayanan: 'Rekomendasi Izin Usaha Mikro Kecil (IUMK)',
    pemohonNik: '3302175205980002',
    pemohonNama: 'Siti Nurjanah',
    pemohonTelepon: '085726198421',
    pemohonDesa: 'Petahunan',
    catatanPemohon: 'Pendaftaran usaha kedai kopi dan suvenir Pokdarwis Curug Nangga untuk pengajuan KUR BRI.',
    tanggalPengajuan: '2026-10-19',
    estimasiSelesai: '2026-10-21',
    status: 'Diproses',
    catatanPetugas: 'Berkas dalam verifikasi Seksi Ekbang Kecamatan. Menunggu validasi NIB online.',
    berkasLampiran: ['surat_kades_petahunan.pdf', 'foto_kedai_kopi.jpg'],
    diperbaruiPada: '2026-10-19 14:30 WIB'
  }
];

export const INITIAL_PENGADUAN: PengaduanItem[] = [
  {
    id: 'adu-01',
    kodeTiket: 'GML-ADU-2026-1092',
    judul: 'Gorong-gorong Ambles di Ruas Jalan Penghubung Desa Gumelar - Petahunan',
    kategori: 'Infrastruktur & Jalan',
    urgensi: 'Darurat',
    lokasiDesa: 'Petahunan',
    lokasiDetail: 'Tanjakan Grumbul Semingkir KM 2, perbatasan Gumelar - Petahunan dekat jembatan kecil',
    deskripsi: 'Gorong-gorong pembuangan air di bawah jalan ambles sedalam 60 cm setelah hujan deras kemarin sore. Separuh badan jalan tergerus, berbahaya bagi pengendara roda empat dan truk pengangkut hasil tani.',
    fotoUrl: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=800&auto=format&fit=crop&q=80',
    pelaporNik: '3302175205980002',
    pelaporNama: 'Siti Nurjanah',
    isAnonim: false,
    tanggalLapor: '2026-10-18 16:45',
    status: 'Dalam Penanganan',
    tanggapanPetugas: [
      {
        id: 't-1',
        namaPetugas: 'Khabib Rohman (Seksi Trantib)',
        jabatan: 'Kepala Seksi Ketentraman dan Ketertiban Umum',
        isi: 'Laporan telah divalidasi. Tim Trantib Kecamatan bersama Babinsa Koramil Gumelar sudah memasang rambu darurat dan drum peringatan di lokasi tadi pagi.',
        tanggal: '2026-10-19 08:30 WIB'
      },
      {
        id: 't-2',
        namaPetugas: 'Ir. Hendro Cahyono',
        jabatan: 'Koordinator UPTD DPU Wilayah Ajibarang-Gumelar',
        isi: 'Material gorong-gorong beton pracetak (box culvert) dan batu belah sedang dalam pengiriman dari Purwokerto. Pengerjaan perbaikan darurat dimulai esok hari.',
        tanggal: '2026-10-19 13:15 WIB'
      }
    ],
    upvotes: 42,
    hasUpvoted: true
  },
  {
    id: 'adu-02',
    kodeTiket: 'GML-ADU-2026-3390',
    judul: 'Lampu Penerangan Jalan Umum (PJU) Mati di Tikungan Hutan Pinus Cihonje',
    kategori: 'Infrastruktur & Jalan',
    urgensi: 'Sedang',
    lokasiDesa: 'Cihonje',
    lokasiDetail: 'Jalan Raya Cihonje arah Samudra, dekat tikungan gardu ronda RT 03',
    deskripsi: 'Tiga titik lampu PJU bertenaga surya mati total sejak sepekan lalu. Jalur menjadi sangat gelap dan berkabut di malam hari, rawan kecelakaan dan tindak kriminal.',
    fotoUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&auto=format&fit=crop&q=80',
    pelaporNik: '3302171508920001',
    pelaporNama: 'Bambang Supriyanto',
    isAnonim: false,
    tanggalLapor: '2026-10-17 19:20',
    status: 'Diteruskan ke Seksi Terkait',
    tanggapanPetugas: [
      {
        id: 't-3',
        namaPetugas: 'Seksi Ekbang & Fasilitas Umum',
        jabatan: 'Staf Pemeliharaan Jaringan Kecamatan Gumelar',
        isi: 'Laporan telah diteruskan ke Dinas Perhubungan Kabupaten Banyumas posko Wangon/Ajibarang untuk penggantian modul baterai PJU surya.',
        tanggal: '2026-10-18 10:00 WIB'
      }
    ],
    upvotes: 18,
    hasUpvoted: false
  },
  {
    id: 'adu-03',
    kodeTiket: 'GML-ADU-2026-8812',
    judul: 'Tumpukan Sampah Plastik Liar di Tepi Aliran Sungai Tajum Grumbul Kauman',
    kategori: 'Kebersihan & Lingkungan',
    urgensi: 'Sedang',
    lokasiDesa: 'Gumelar',
    lokasiDetail: 'Tepi jembatan penghubung grumbul Kauman dengan Pasar Wage',
    deskripsi: 'Ada oknum pembuang sampah liar yang membuang karung-karung sampah plastik ke tepi jurang sungai Tajum. Mengakibatkan bau tak sedap dan mencemari air.',
    pelaporNik: '3302170000000000',
    pelaporNama: 'Warga Peduli Lingkungan',
    isAnonim: true,
    tanggalLapor: '2026-10-19 09:10',
    status: 'Menunggu Validasi',
    tanggapanPetugas: [],
    upvotes: 9,
    hasUpvoted: false
  }
];

export const FORUM_TOPICS: ForumTopic[] = [
  {
    id: 'forum-01',
    judul: 'Strategi Pemasaran Bersama Gula Semut Gumelar Menembus Pasar Modern & Ekspor',
    kategori: 'UMKM & Usaha Lokal',
    desa: 'Cihonje',
    penulisNik: '3302171508920001',
    penulisNama: 'Bambang Supriyanto',
    isPenulisVerified: true,
    isi: 'Selamat malam sedulur Gumelar kabeh. Sebagai penderes dan pengrajin gula semut di Cihonje, kami ingin mengajak para perajin gula di desa-desa lain (Gancang, Samudra, Kedungurang) untuk menyatukan standar kemasan dan uji laboratorium kadar air. Saat ini ada permintaan pasar supermarket di Jakarta dan distributor herbal. Monggo rembukan bersama di forum ini.',
    tanggalDibuat: '2026-10-18 20:15 WIB',
    upvotes: 35,
    hasUpvoted: true,
    tags: ['GulaSemut', 'UMKM', 'Pertanian', 'Cihonje'],
    komentar: [
      {
        id: 'c-1',
        penulisNik: '3302175205980002',
        penulisNama: 'Siti Nurjanah',
        penulisDesa: 'Petahunan',
        isi: 'Sangat setuju Pak Bambang! Di Petahunan kami juga ada KWT yang memproduksi gula semut varian jahe merah. Kalau ada wadah koperasi bersama se-Kecamatan Gumelar, daya tawar harga kita bisa jauh lebih baik dibanding dijual ke tengkulak.',
        tanggal: '2026-10-18 21:05 WIB',
        isVerified: true
      },
      {
        id: 'c-2',
        penulisNik: '3302172103850003',
        penulisNama: 'Drs. Arif Triyanto, M.Si. (Camat Gumelar)',
        penulisDesa: 'Gumelar',
        isi: 'Apresiasi yang tinggi untuk inisiatif Pak Bambang dan sedulur pegiat UMKM. Pihak Kecamatan bersama Dinperindag Banyumas siap memfasilitasi sertifikasi Halal gratis dan fasilitasi rumah kemasan bagi paguyuban penderes Gumelar.',
        tanggal: '2026-10-19 08:45 WIB',
        isVerified: true
      }
    ]
  },
  {
    id: 'forum-02',
    judul: 'Waspada Musim Penghujan: Gerakan Bersih Selokan & Mitigasi Tebing Rawan Longsor',
    kategori: 'Gotong Royong',
    desa: 'Samudra',
    penulisNik: '3302171011880004',
    penulisNama: 'Rohmat Hidayat, S.Sos.',
    isPenulisVerified: true,
    isi: 'Mengingat topografi wilayah kita yang berbukit curam, BMKG memprakirakan intensitas hujan meningkat di bulan Oktober-November. Mari seluruh warga menggiatkan kerja bakti mingguan membersihkan parit dan melaporkan setiap ada rekahan tanah di tebing pekarangan rumah ke Posko Siaga Bencana Desa masing-masing.',
    tanggalDibuat: '2026-10-17 14:00 WIB',
    upvotes: 28,
    hasUpvoted: false,
    tags: ['SiagaBencana', 'GotongRoyong', 'Samudra', 'Petahunan'],
    komentar: [
      {
        id: 'c-3',
        penulisNik: '3302170011223344',
        penulisNama: 'Kusworo (Relawan Tagana)',
        penulisDesa: 'Cihonje',
        isi: 'Tim Tagana dan Destana Gumelar sudah menyiapkan karung pasir dan terpal darurat di Balai Desa Samudra dan Petahunan. Siap siaga 24 jam.',
        tanggal: '2026-10-17 15:30 WIB',
        isVerified: true
      }
    ]
  },
  {
    id: 'forum-03',
    judul: 'Jadwal Latihan Bersama Paguyuban Kesenian Ebeg Turonggo Se-Kecamatan Gumelar',
    kategori: 'Kepemudaan',
    desa: 'Samudra Kulon',
    penulisNik: '3302173344556677',
    penulisNama: 'Surono Hadi (Karang Taruna)',
    isPenulisVerified: true,
    isi: 'Salam budaya sedulur Banyumas! Menjelang peringatan Hari Jadi Gumelar, kami mengundang grup kesenian Ebeg dari seluruh desa di Gumelar untuk temu teknik dan latihan pentas kolosal di Pendopo Sasana Graha Gumelar hari Minggu depan.',
    tanggalDibuat: '2026-10-19 11:20 WIB',
    upvotes: 19,
    hasUpvoted: false,
    tags: ['KesenianEbeg', 'BudayaBanyumas', 'Pemuda', 'SamudraKulon'],
    komentar: []
  }
];

export const MAP_FACILITIES: FacilityMarker[] = [
  // Fasilitas Kesehatan
  {
    id: 'f-kes-1',
    nama: 'Puskesmas Gumelar 1 (Pusat Rawat Inap & PONED)',
    kategori: 'kesehatan',
    desa: 'Gumelar',
    alamat: 'Jl. Raya Gumelar No. 15, RT 02/01, Desa Gumelar',
    koordinat: [-7.3778, 108.9845],
    deskripsi: 'Puskesmas induk dengan layanan rawat inap 24 jam, persalinan PONED, instalasi gawat darurat (IGD), poli gigi, laboratorium darah, dan USG kehamilan.',
    kontak: '(0281) 6570088 / IGD 0812-2890-7711',
    jamOperasional: 'UGD & Rawat Inap 24 Jam | Rawat Jalan 07.30 - 14.00 WIB',
    penanggungJawab: 'dr. Tri Hartati, M.Kes.'
  },
  {
    id: 'f-kes-2',
    nama: 'Puskesmas Pembantu (Pustu) Cihonje',
    kategori: 'kesehatan',
    desa: 'Cihonje',
    alamat: 'Dusun Wadas, RT 01/RW 03, Desa Cihonje',
    koordinat: [-7.3695, 108.9930],
    deskripsi: 'Melayani pemeriksaan umum, konsultasi gizi, imunisasi balita, dan rujukan Puskesmas induk.',
    kontak: '0857-4433-2211',
    jamOperasional: 'Senin - Sabtu 08.00 - 12.00 WIB',
    penanggungJawab: 'Bdn. Endang Sulastri, S.Tr.Keb.'
  },
  {
    id: 'f-kes-3',
    nama: 'Pos Kesehatan Desa (PKD) Petahunan Sehat',
    kategori: 'kesehatan',
    desa: 'Petahunan',
    alamat: 'Kompleks Balai Desa Petahunan, RT 02/02',
    koordinat: [-7.3875, 108.9715],
    deskripsi: 'Pelayanan bidan desa, posyandu lansia & balita, dan pertolongan pertama kecelakaan wisata Curug Nangga.',
    kontak: '0813-9988-1122',
    jamOperasional: 'Setiap Hari Kerja 08.00 - 13.00 WIB',
    penanggungJawab: 'Bdn. Sri Wahyuni, A.Md.Keb.'
  },
  {
    id: 'f-kes-4',
    nama: 'Klinik Pratama & Apotek Sehat Sejahtera Gumelar',
    kategori: 'kesehatan',
    desa: 'Gumelar',
    alamat: 'Jl. Pasar Wage No. 8, Desa Gumelar',
    koordinat: [-7.3762, 108.9860],
    deskripsi: 'Pelayanan dokter umum, apotek obat resep, cek gula darah, kolesterol, dan asam urat.',
    kontak: '0822-1144-8899',
    jamOperasional: '07.00 - 21.00 WIB',
    penanggungJawab: 'dr. Agung Setiawan'
  },

  // Fasilitas Pendidikan
  {
    id: 'f-pen-1',
    nama: 'SMK Negeri 1 Gumelar (Agribisnis & Otomotif)',
    kategori: 'pendidikan',
    desa: 'Gumelar',
    alamat: 'Jl. Raya Samudra - Gumelar KM 1, Desa Gumelar',
    koordinat: [-7.3750, 108.9790],
    deskripsi: 'Sekolah Menengah Kejuruan unggulan dengan kompetensi keahlian Agribisnis Pengolahan Hasil Pertanian, Teknik Kendaraan Ringan Otomotif, dan Rekayasa Perangkat Lunak.',
    kontak: '(0281) 6570092',
    jamOperasional: 'Senin - Jumat 07.00 - 15.30 WIB',
    penanggungJawab: 'Drs. H. Mulyono, M.Pd.'
  },
  {
    id: 'f-pen-2',
    nama: 'SMP Negeri 1 Gumelar',
    kategori: 'pendidikan',
    desa: 'Gumelar',
    alamat: 'Jl. Pendidikan No. 5, Desa Gumelar',
    koordinat: [-7.3768, 108.9825],
    deskripsi: 'Sekolah adiwiyata dengan fasilitas laboratorium sains, ruang komputer, perpustakaan digital, dan lapangan basket.',
    kontak: '(0281) 6570044',
    jamOperasional: '07.00 - 14.30 WIB',
    penanggungJawab: 'Dra. Siti Aminah'
  },
  {
    id: 'f-pen-3',
    nama: 'SMP Negeri 2 Gumelar (Cihonje)',
    kategori: 'pendidikan',
    desa: 'Cihonje',
    alamat: 'Jl. Karangpucung KM 3, Desa Cihonje',
    koordinat: [-7.3670, 108.9975],
    deskripsi: 'Pusat pendidikan menengah pertama wilayah timur Gumelar, berprestasi dalam pramuka dan sains madya.',
    kontak: '0813-8822-3344',
    jamOperasional: '07.00 - 14.30 WIB',
    penanggungJawab: 'Drs. Bambang Kuncoro'
  },
  {
    id: 'f-pen-4',
    nama: 'SD Negeri 1 Gumelar & Perpustakaan Desa',
    kategori: 'pendidikan',
    desa: 'Gumelar',
    alamat: 'Depan Alun-Alun Mini Gumelar, RT 01/01',
    koordinat: [-7.3790, 108.9835],
    deskripsi: 'Sekolah dasar tertua di Gumelar dengan kegiatan literasi anak desa dan ekstrakurikuler karawitan.',
    kontak: '0857-1122-3344',
    jamOperasional: '07.00 - 13.00 WIB',
    penanggungJawab: 'Pujiono, S.Pd.SD.'
  },

  // Fasilitas Pemerintahan & Keamanan
  {
    id: 'f-pem-1',
    nama: 'Kantor Kecamatan Gumelar & Pelayanan PATEN',
    kategori: 'pemerintahan',
    desa: 'Gumelar',
    alamat: 'Jl. Raya Gumelar No. 1, Desa Gumelar',
    koordinat: [-7.3785, 108.9832],
    deskripsi: 'Pusat administrasi pemerintahan wilayah, ruang pelayanan administrasi terpadu kecamatan (PATEN), pendopo Sasana Graha, dan ruang pertemuan warga.',
    kontak: '(0281) 6570012',
    jamOperasional: 'Senin - Kamis 07.30 - 15.30 | Jumat 07.30 - 14.30 WIB',
    penanggungJawab: 'Camat Gumelar'
  },
  {
    id: 'f-pem-2',
    nama: 'Kepolisian Sektor (Polsek) Gumelar',
    kategori: 'pemerintahan',
    desa: 'Gumelar',
    alamat: 'Jl. Raya Gumelar No. 3 (Sebelah Barat Kantor Camat)',
    koordinat: [-7.3787, 108.9822],
    deskripsi: 'Layanan SPKT, laporan kehilangan, pengurusan SKCK, serta pengamanan ketertiban masyarakat 24 jam.',
    kontak: '(0281) 6570110 / Call Center 110',
    jamOperasional: 'Pelayanan SPKT 24 Jam Penuh',
    penanggungJawab: 'Kapolsek Gumelar'
  },
  {
    id: 'f-pem-3',
    nama: 'Koramil 14 / Gumelar - Kodim 0701 Banyumas',
    kategori: 'pemerintahan',
    desa: 'Gumelar',
    alamat: 'Jl. Raya Gumelar No. 7, Desa Gumelar',
    koordinat: [-7.3783, 108.9818],
    deskripsi: 'Pusat komando teritorial TNI AD dan pembina Babinsa desa se-Kecamatan Gumelar.',
    kontak: '(0281) 6570113',
    jamOperasional: '24 Jam Penuh',
    penanggungJawab: 'Danramil 14 Gumelar'
  },
  {
    id: 'f-pem-4',
    nama: 'Balai Desa Petahunan & Pos Pokdarwis',
    kategori: 'pemerintahan',
    desa: 'Petahunan',
    alamat: 'Jl. Curug Nangga No. 01, Desa Petahunan',
    koordinat: [-7.3878, 108.9710],
    deskripsi: 'Kantor kepala desa dan pusat informasi pariwisata terpadu Desa Petahunan.',
    kontak: '0821-3344-5566',
    jamOperasional: '08.00 - 15.00 WIB',
    penanggungJawab: 'Kades Petahunan'
  },
  {
    id: 'f-pem-5',
    nama: 'Balai Desa Cihonje',
    kategori: 'pemerintahan',
    desa: 'Cihonje',
    alamat: 'Jl. Lapangan Desa Cihonje No. 1',
    koordinat: [-7.3690, 108.9942],
    deskripsi: 'Pusat pelayanan administrasi warga Desa Cihonje dan balai pertemuan kelompok tani.',
    kontak: '0852-2710-8832',
    jamOperasional: '08.00 - 15.00 WIB',
    penanggungJawab: 'Kades Cihonje'
  },

  // Posko Siaga Bencana
  {
    id: 'f-pos-1',
    nama: 'Posko Siaga Bencana & Tagana Kecamatan Gumelar',
    kategori: 'posko_siaga',
    desa: 'Gumelar',
    alamat: 'Gedung Serbaguna Sasana Graha, Jl. Raya Gumelar',
    koordinat: [-7.3792, 108.9830],
    deskripsi: 'Posko induk penanggulangan bencana alam (tanah longsor & angin kencang), dapur umum darurat, dan gudang logistik BPBD Banyumas di Gumelar.',
    kontak: 'Call Center TRC: 0812-2890-5541 / 0813-2700-1122',
    jamOperasional: 'Siaga 24 Jam Penuh',
    penanggungJawab: 'Koordinator TRC BPBD Gumelar'
  },
  {
    id: 'f-pos-2',
    nama: 'Pos Pantau Siaga Longsor Petahunan - Samudra',
    kategori: 'posko_siaga',
    desa: 'Petahunan',
    alamat: 'Gardu Pantau Curug Nangga, Petahunan',
    koordinat: [-7.3895, 108.9718],
    deskripsi: 'Pemantauan dini sensor EWS (Early Warning System) pergerakan tanah pada jalur lereng perbukitan Petahunan.',
    kontak: '0821-3344-5566',
    jamOperasional: '24 Jam Musim Hujan',
    penanggungJawab: 'Destana Petahunan'
  }
];

export const AGENDA_EVENTS: AgendaEvent[] = [
  {
    id: 'ev-1',
    judul: 'Pelayanan Terpadu KTP Keliling & Cek Kesehatan Gratis',
    kategori: 'Pemerintahan',
    desa: 'Petahunan',
    lokasi: 'Balai Desa Petahunan (Depan Lapangan)',
    tanggalMulai: '2026-10-24',
    waktuMulai: '08:30',
    waktuSelesai: '13:30',
    deskripsi: 'Layanan jemput bola Dinas Kependudukan bekerjasama dengan Kecamatan Gumelar: perekaman KTP-el pemula, aktivasi IKD (Identitas Kependudukan Digital), dan cek tensi/gula darah gratis dari tim Puskesmas Gumelar 1.',
    penyelenggara: 'Paten Kecamatan Gumelar & Disdukcapil Banyumas',
    kontakPerson: 'Pak Sugianto (0813-2890-1133)',
    kuotaPeserta: 150,
    pesertaHadirCount: 94,
    isRsvp: false
  },
  {
    id: 'ev-2',
    judul: 'Musrenbang Rencana Kerja Pemerintah Desa & Pembangunan 2027',
    kategori: 'Pemerintahan',
    desa: 'Gumelar',
    lokasi: 'Pendopo Sasana Graha Kecamatan Gumelar',
    tanggalMulai: '2026-10-27',
    waktuMulai: '09:00',
    waktuSelesai: '15:00',
    deskripsi: 'Musyawarah Perencanaan Pembangunan (Musrenbang) tingkat Kecamatan untuk menyelaraskan usulan prioritas perbaikan jalan desa, jembatan, sarana air bersih, dan stimulan UMKM warga.',
    penyelenggara: 'Bappedalitbang & Kecamatan Gumelar',
    kontakPerson: 'Seksi Ekbang (0281-6570012)',
    kuotaPeserta: 100,
    pesertaHadirCount: 68,
    isRsvp: true
  },
  {
    id: 'ev-3',
    judul: 'Festival Kesenian Ebeg Banyumasan & Bazar UMKM Gula Aren',
    kategori: 'Budaya & Tradisi',
    desa: 'Samudra Kulon',
    lokasi: 'Lapangan Sepak Bola Samudra Kulon',
    tanggalMulai: '2026-10-31',
    waktuMulai: '13:00',
    waktuSelesai: '22:00',
    deskripsi: 'Pementasan seni tari Ebeg (kuda lumping) tradisional dengan iringan gamelan calung banyumasan, dimeriahkan stan bazar produk lokal: kopi lereng Gumelar, kripik pisang, jenang, dan aneka cinderamata anyaman bambu.',
    penyelenggara: 'Paguyuban Seni Turonggo Samudra & Karang Taruna',
    kontakPerson: 'Mas Surono (0812-4455-6677)',
    kuotaPeserta: 500,
    pesertaHadirCount: 312,
    isRsvp: false
  },
  {
    id: 'ev-4',
    judul: 'Pelatihan Sertifikasi Organik & Digital Marketing Ekspor Gula Semut',
    kategori: 'Sosial & Gotong Royong',
    desa: 'Cihonje',
    lokasi: 'Aula Koperasi Nira Mandiri Cihonje',
    tanggalMulai: '2026-11-05',
    waktuMulai: '09:00',
    waktuSelesai: '14:30',
    deskripsi: 'Pelatihan teknis bagi para perajin gula nira kelapa mengenai higienitas kemasan ramah lingkungan, pembukuan digital, dan pemasaran via marketplace nasional.',
    penyelenggara: 'Dinas Tenaga Kerja, Koperasi & UKM bekerjasama dg Pemdes Cihonje',
    kontakPerson: 'Khabib Rohman (0852-2710-8832)',
    kuotaPeserta: 60,
    pesertaHadirCount: 52,
    isRsvp: true
  },
  {
    id: 'ev-5',
    judul: 'Posyandu Balita & Skrining Tumbuh Kembang Cegah Stunting',
    kategori: 'Kesehatan',
    desa: 'Gancang',
    lokasi: 'Posyandu Melati 1, Grumbul Karanganyar, Desa Gancang',
    tanggalMulai: '2026-11-08',
    waktuMulai: '08:00',
    waktuSelesai: '11:30',
    deskripsi: 'Penimbangan balita bulanan, pengukuran tinggi badan, imunisasi dasar lengkap, dan pembagian paket makanan tambahan bergizi (PMT telur, bubur kacang hijau & susu).',
    penyelenggara: 'Kader PKK Desa Gancang & Bidan Desa',
    kontakPerson: 'Ibu Budiarti (0858-1122-3399)',
    kuotaPeserta: 80,
    pesertaHadirCount: 71,
    isRsvp: false
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    tipe: 'aduan',
    judul: 'Tindak Lanjut Pengaduan Jalan Ambles',
    pesan: 'Tim Trantib dan DPU telah meninjau lokasi gorong-gorong ambles di Petahunan. Material perbaikan dalam perjalanan.',
    tanggal: '10 menit lalu',
    isRead: false,
    linkTab: 'pengaduan',
    targetId: 'adu-01'
  },
  {
    id: 'notif-2',
    tipe: 'layanan',
    judul: 'Surat Pengantar Rekam KTP-el Siap Diambil',
    pesan: 'Permohonan tiket #GML-ADM-2026-4412 telah selesai diproses oleh Seksi Pelayanan. Silakan ambil di Loket Kantor Camat.',
    tanggal: '1 jam lalu',
    isRead: false,
    linkTab: 'layanan',
    targetId: 'req-01'
  },
  {
    id: 'notif-3',
    tipe: 'darurat',
    judul: 'Peringatan Dini Cuaca BMKG Gumelar',
    pesan: 'Potensi hujan lebat disertai angin kencang di wilayah Gumelar, Samudra, dan Petahunan. Warga lereng bukit diimbau waspada.',
    tanggal: '3 jam lalu',
    isRead: true,
    linkTab: 'peta',
    targetId: 'f-pos-1'
  },
  {
    id: 'notif-4',
    tipe: 'forum',
    judul: 'Komentar Baru dari Camat Gumelar di Forum',
    pesan: 'Bapak Camat Drs. Arif Triyanto menanggapi topik usulan kolaborasi pemasaran Gula Semut Cihonje.',
    tanggal: '5 jam lalu',
    isRead: true,
    linkTab: 'forum',
    targetId: 'forum-01'
  }
];
