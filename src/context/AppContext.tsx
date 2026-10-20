import React, { createContext, useContext, useState } from 'react';
import {
  CitizenRecord,
  PermohonanLayanan,
  PengaduanItem,
  ForumTopic,
  AgendaEvent,
  NotificationItem,
  StatusPelayanan,
  StatusAduan
} from '../types';
import {
  DEMO_CITIZENS,
  INITIAL_PERMOHONAN,
  INITIAL_PENGADUAN,
  FORUM_TOPICS,
  AGENDA_EVENTS,
  INITIAL_NOTIFICATIONS
} from '../data/gumelarData';
import { generateTicketCode, calculateSLADate } from '../utils/ticketGenerator';
import { validateNIK } from '../utils/nikValidator';

interface AppContextType {
  currentUser: CitizenRecord | null;
  setCurrentUser: (user: CitizenRecord | null) => void;
  loginAs: (nik: string) => boolean;
  logout: () => void;
  registerOrVerifyNIK: (formData: Partial<CitizenRecord>) => { success: boolean; message: string; user?: CitizenRecord };
  
  notifications: NotificationItem[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  soundEnabled: boolean;
  toggleSound: () => void;
  playNotificationChime: () => void;

  permohonanList: PermohonanLayanan[];
  submitPermohonan: (data: {
    layananId: string;
    namaLayanan: string;
    pemohonNik: string;
    pemohonNama: string;
    pemohonTelepon: string;
    pemohonDesa: string;
    catatanPemohon: string;
    berkasLampiran: string[];
    slaDays: number;
  }) => PermohonanLayanan;
  updatePermohonanStatus: (id: string, newStatus: StatusPelayanan, catatanPetugas: string) => void;

  pengaduanList: PengaduanItem[];
  submitPengaduan: (data: {
    judul: string;
    kategori: PengaduanItem['kategori'];
    urgensi: PengaduanItem['urgensi'];
    lokasiDesa: string;
    lokasiDetail: string;
    deskripsi: string;
    fotoUrl?: string;
    isAnonim: boolean;
  }) => PengaduanItem;
  upvotePengaduan: (id: string) => void;
  tanggapiPengaduan: (id: string, isiTanggapan: string, status?: StatusAduan) => void;

  forumTopics: ForumTopic[];
  addForumTopic: (data: {
    judul: string;
    kategori: ForumTopic['kategori'];
    desa: string;
    isi: string;
    tags: string[];
  }) => void;
  upvoteForumTopic: (id: string) => void;
  addForumComment: (topicId: string, isi: string) => void;

  agendaEvents: AgendaEvent[];
  toggleRsvpEvent: (eventId: string) => void;

  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<CitizenRecord | null>(DEMO_CITIZENS[0]);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [permohonanList, setPermohonanList] = useState<PermohonanLayanan[]>(INITIAL_PERMOHONAN);
  const [pengaduanList, setPengaduanList] = useState<PengaduanItem[]>(INITIAL_PENGADUAN);
  const [forumTopics, setForumTopics] = useState<ForumTopic[]>(FORUM_TOPICS);
  const [agendaEvents, setAgendaEvents] = useState<AgendaEvent[]>(AGENDA_EVENTS);
  const [activeTab, setActiveTab] = useState<string>('beranda');

  const playNotificationChime = () => {
    if (!soundEnabled || typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } catch {
      // Audio playback fallback
    }
  };

  const addNotification = (item: Omit<NotificationItem, 'id' | 'isRead'>) => {
    const newNotif: NotificationItem = {
      ...item,
      id: `notif-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      isRead: false
    };
    setNotifications(prev => [newNotif, ...prev]);
    playNotificationChime();
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, isRead: true } : n)));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const toggleSound = () => setSoundEnabled(prev => !prev);

  const loginAs = (nik: string): boolean => {
    const found = DEMO_CITIZENS.find(c => c.nik === nik);
    if (found) {
      setCurrentUser(found);
      addNotification({
        tipe: 'layanan',
        judul: 'Autentikasi Berhasil',
        pesan: `Selamat datang kembali, ${found.nama} (${found.desa})`,
        tanggal: 'Baru saja'
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const registerOrVerifyNIK = (formData: Partial<CitizenRecord>) => {
    if (!formData.nik) {
      return { success: false, message: 'Nomor NIK harus diisi.' };
    }
    const valResult = validateNIK(formData.nik);
    if (!valResult.isValid) {
      return { success: false, message: valResult.message };
    }

    const existing = DEMO_CITIZENS.find(c => c.nik === formData.nik);
    if (existing) {
      setCurrentUser(existing);
      return {
        success: true,
        message: `NIK terverifikasi pada data kependudukan Kecamatan Gumelar! Selamat datang ${existing.nama}.`,
        user: existing
      };
    }

    const newCitizen: CitizenRecord = {
      nik: formData.nik,
      kk: formData.kk || '330217' + Math.floor(1000000000 + Math.random() * 9000000000),
      nama: formData.nama || 'Warga Gumelar Terdaftar',
      jenisKelamin: valResult.parsedData?.gender || 'L',
      tempatLahir: 'Banyumas',
      tanggalLahir: valResult.parsedData?.birthDate || '1995-01-01',
      desa: formData.desa || 'Gumelar',
      rt: formData.rt || '01',
      rw: formData.rw || '01',
      alamat: formData.alamat || `RT ${formData.rt || '01'} / RW ${formData.rw || '01'}, Desa ${formData.desa || 'Gumelar'}`,
      agama: formData.agama || 'Islam',
      pekerjaan: formData.pekerjaan || 'Wirausaha Mandiri',
      telepon: formData.telepon || '081234567890',
      email: formData.email || `${formData.nama?.toLowerCase().replace(/\s+/g, '') || 'warga'}@gmail.com`,
      role: 'warga',
      isVerified: true
    };

    DEMO_CITIZENS.push(newCitizen);
    setCurrentUser(newCitizen);

    addNotification({
      tipe: 'layanan',
      judul: 'Pendaftaran NIK Kependudukan Berhasil',
      pesan: `Akun warga kependudukan atas nama ${newCitizen.nama} berhasil diverifikasi.`,
      tanggal: 'Baru saja'
    });

    return {
      success: true,
      message: 'Pendaftaran & validasi NIK berhasil! Anda kini terdaftar sebagai warga terverifikasi.',
      user: newCitizen
    };
  };

  const submitPermohonan = (data: {
    layananId: string;
    namaLayanan: string;
    pemohonNik: string;
    pemohonNama: string;
    pemohonTelepon: string;
    pemohonDesa: string;
    catatanPemohon: string;
    berkasLampiran: string[];
    slaDays: number;
  }): PermohonanLayanan => {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    const slaDate = calculateSLADate(today, data.slaDays || 2);
    const code = generateTicketCode('ADM');

    const newPermohonan: PermohonanLayanan = {
      id: `req-${Date.now()}`,
      kodeTiket: code,
      layananId: data.layananId,
      namaLayanan: data.namaLayanan,
      pemohonNik: data.pemohonNik,
      pemohonNama: data.pemohonNama,
      pemohonTelepon: data.pemohonTelepon,
      pemohonDesa: data.pemohonDesa,
      catatanPemohon: data.catatanPemohon,
      tanggalPengajuan: todayStr,
      estimasiSelesai: slaDate,
      status: 'Menunggu Verifikasi',
      berkasLampiran: data.berkasLampiran.length ? data.berkasLampiran : ['berkas_persyaratan.pdf'],
      diperbaruiPada: 'Hari ini, baru saja'
    };

    setPermohonanList(prev => [newPermohonan, ...prev]);

    addNotification({
      tipe: 'layanan',
      judul: 'Permohonan Layanan Diterima',
      pesan: `Tiket #${code} (${data.namaLayanan}) berhasil diajukan. Estimasi selesai: ${slaDate}.`,
      tanggal: 'Baru saja',
      linkTab: 'layanan',
      targetId: newPermohonan.id
    });

    return newPermohonan;
  };

  const updatePermohonanStatus = (id: string, newStatus: StatusPelayanan, catatanPetugas: string) => {
    setPermohonanList(prev =>
      prev.map(item => {
        if (item.id === id) {
          return {
            ...item,
            status: newStatus,
            catatanPetugas,
            diperbaruiPada: 'Hari ini, ' + new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB'
          };
        }
        return item;
      })
    );

    const target = permohonanList.find(p => p.id === id);
    if (target) {
      addNotification({
        tipe: 'layanan',
        judul: `Status Berubah: ${newStatus}`,
        pesan: `Tiket #${target.kodeTiket} (${target.namaLayanan}) diperbarui: "${catatanPetugas}"`,
        tanggal: 'Baru saja',
        linkTab: 'layanan',
        targetId: id
      });
    }
  };

  const submitPengaduan = (data: {
    judul: string;
    kategori: PengaduanItem['kategori'];
    urgensi: PengaduanItem['urgensi'];
    lokasiDesa: string;
    lokasiDetail: string;
    deskripsi: string;
    fotoUrl?: string;
    isAnonim: boolean;
  }): PengaduanItem => {
    const code = generateTicketCode('ADU');
    const now = new Date();
    const dateFormatted = `${now.toISOString().split('T')[0]} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newAduan: PengaduanItem = {
      id: `adu-${Date.now()}`,
      kodeTiket: code,
      judul: data.judul,
      kategori: data.kategori,
      urgensi: data.urgensi,
      lokasiDesa: data.lokasiDesa,
      lokasiDetail: data.lokasiDetail,
      deskripsi: data.deskripsi,
      fotoUrl: data.fotoUrl,
      pelaporNik: currentUser?.nik || '3302170000000000',
      pelaporNama: data.isAnonim ? 'Warga Peduli (Anonim)' : (currentUser?.nama || 'Masyarakat Gumelar'),
      isAnonim: data.isAnonim,
      tanggalLapor: dateFormatted,
      status: 'Menunggu Validasi',
      tanggapanPetugas: [],
      upvotes: 1,
      hasUpvoted: true
    };

    setPengaduanList(prev => [newAduan, ...prev]);

    addNotification({
      tipe: 'aduan',
      judul: `Pengaduan Baru Terkirim #${code}`,
      pesan: `Laporan "${data.judul}" [Urgensi: ${data.urgensi}] masuk ke antrian sistem kecamatan.`,
      tanggal: 'Baru saja',
      linkTab: 'pengaduan',
      targetId: newAduan.id
    });

    return newAduan;
  };

  const upvotePengaduan = (id: string) => {
    setPengaduanList(prev =>
      prev.map(item => {
        if (item.id === id) {
          const hasVoted = item.hasUpvoted;
          return {
            ...item,
            upvotes: hasVoted ? item.upvotes - 1 : item.upvotes + 1,
            hasUpvoted: !hasVoted
          };
        }
        return item;
      })
    );
  };

  const tanggapiPengaduan = (id: string, isiTanggapan: string, statusUpdate?: StatusAduan) => {
    const now = new Date();
    const dateStr = `${now.toISOString().split('T')[0]} ${now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB`;
    const petugasName = currentUser?.role === 'petugas' || currentUser?.role === 'kades' 
      ? currentUser.nama 
      : 'Tim Pelayanan Kecamatan Gumelar';
    const petugasJabatan = currentUser?.pekerjaan || 'Petugas Tindak Lanjut Lapangan';

    setPengaduanList(prev =>
      prev.map(item => {
        if (item.id === id) {
          const newStatus = statusUpdate || (item.status === 'Menunggu Validasi' ? 'Dalam Penanganan' : item.status);
          return {
            ...item,
            status: newStatus,
            tanggapanPetugas: [
              ...item.tanggapanPetugas,
              {
                id: `resp-${Date.now()}`,
                namaPetugas: petugasName,
                jabatan: petugasJabatan,
                isi: isiTanggapan,
                tanggal: dateStr
              }
            ]
          };
        }
        return item;
      })
    );

    const target = pengaduanList.find(p => p.id === id);
    if (target) {
      addNotification({
        tipe: 'aduan',
        judul: `Tanggapan Resmi #${target.kodeTiket}`,
        pesan: `${petugasName}: "${isiTanggapan.substring(0, 70)}..."`,
        tanggal: 'Baru saja',
        linkTab: 'pengaduan',
        targetId: id
      });
    }
  };

  const addForumTopic = (data: {
    judul: string;
    kategori: ForumTopic['kategori'];
    desa: string;
    isi: string;
    tags: string[];
  }) => {
    const newTopic: ForumTopic = {
      id: `forum-${Date.now()}`,
      judul: data.judul,
      kategori: data.kategori,
      desa: data.desa,
      penulisNik: currentUser?.nik || '3302170000000000',
      penulisNama: currentUser?.nama || 'Warga Gumelar',
      isPenulisVerified: currentUser?.isVerified ?? true,
      isi: data.isi,
      tanggalDibuat: 'Hari ini, baru saja',
      upvotes: 1,
      hasUpvoted: true,
      tags: data.tags.length ? data.tags : ['WargaGumelar', data.desa],
      komentar: []
    };

    setForumTopics(prev => [newTopic, ...prev]);

    addNotification({
      tipe: 'forum',
      judul: 'Topik Rembug Baru Dipublikasikan',
      pesan: `Topik "${data.judul}" telah diterbitkan di Ruang Rembug.`,
      tanggal: 'Baru saja',
      linkTab: 'forum',
      targetId: newTopic.id
    });
  };

  const upvoteForumTopic = (id: string) => {
    setForumTopics(prev =>
      prev.map(t => {
        if (t.id === id) {
          const hasVoted = t.hasUpvoted;
          return {
            ...t,
            upvotes: hasVoted ? t.upvotes - 1 : t.upvotes + 1,
            hasUpvoted: !hasVoted
          };
        }
        return t;
      })
    );
  };

  const addForumComment = (topicId: string, isi: string) => {
    const now = new Date();
    const dateStr = `Hari ini, ${now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB`;
    
    setForumTopics(prev =>
      prev.map(t => {
        if (t.id === topicId) {
          return {
            ...t,
            komentar: [
              ...t.komentar,
              {
                id: `c-${Date.now()}`,
                penulisNik: currentUser?.nik || '3302170000000000',
                penulisNama: currentUser?.nama || 'Warga Gumelar',
                penulisDesa: currentUser?.desa || 'Gumelar',
                isi,
                tanggal: dateStr,
                isVerified: currentUser?.isVerified ?? true
              }
            ]
          };
        }
        return t;
      })
    );

    const topic = forumTopics.find(t => t.id === topicId);
    if (topic) {
      addNotification({
        tipe: 'forum',
        judul: 'Komentar Baru di Diskusi',
        pesan: `${currentUser?.nama || 'Warga'} menanggapi "${topic.judul}".`,
        tanggal: 'Baru saja',
        linkTab: 'forum',
        targetId: topicId
      });
    }
  };

  const toggleRsvpEvent = (eventId: string) => {
    setAgendaEvents(prev =>
      prev.map(ev => {
        if (ev.id === eventId) {
          const isCurrentlyRsvp = ev.isRsvp;
          return {
            ...ev,
            isRsvp: !isCurrentlyRsvp,
            pesertaHadirCount: isCurrentlyRsvp ? ev.pesertaHadirCount - 1 : ev.pesertaHadirCount + 1
          };
        }
        return ev;
      })
    );

    const targetEvent = agendaEvents.find(e => e.id === eventId);
    if (targetEvent) {
      const willAttend = !targetEvent.isRsvp;
      addNotification({
        tipe: 'agenda',
        judul: willAttend ? 'Konfirmasi Kehadiran' : 'Batal RSVP',
        pesan: willAttend
          ? `Terdaftar hadir di "${targetEvent.judul}" (${targetEvent.tanggalMulai}).`
          : `Kehadiran pada "${targetEvent.judul}" dibatalkan.`,
        tanggal: 'Baru saja',
        linkTab: 'agenda',
        targetId: eventId
      });
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        loginAs,
        logout,
        registerOrVerifyNIK,
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        soundEnabled,
        toggleSound,
        playNotificationChime,
        permohonanList,
        submitPermohonan,
        updatePermohonanStatus,
        pengaduanList,
        submitPengaduan,
        upvotePengaduan,
        tanggapiPengaduan,
        forumTopics,
        addForumTopic,
        upvoteForumTopic,
        addForumComment,
        agendaEvents,
        toggleRsvpEvent,
        activeTab,
        setActiveTab
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
