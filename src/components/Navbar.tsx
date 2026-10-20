import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Building2, 
  MapPin, 
  Bell, 
  Volume2, 
  VolumeX, 
  User, 
  Menu, 
  X, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  MessageSquare, 
  LogOut,
  ChevronDown,
  ShieldCheck,
  Compass,
  Calendar,
  Sparkles
} from 'lucide-react';
import { DEMO_CITIZENS } from '../data/gumelarData';

interface NavbarProps {
  onOpenAuth: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAuth }) => {
  const { 
    currentUser, 
    logout, 
    notifications, 
    unreadCount, 
    markAsRead, 
    markAllAsRead, 
    soundEnabled, 
    toggleSound,
    activeTab,
    setActiveTab,
    loginAs
  } = useApp();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'beranda', label: 'Beranda' },
    { id: 'desa', label: 'Profil 10 Desa' },
    { id: 'wisata', label: 'Potensi Wisata' },
    { id: 'layanan', label: 'E-Layanan Publik' },
    { id: 'pengaduan', label: 'Pengaduan Online' },
    { id: 'forum', label: 'Forum Rembug' },
    { id: 'peta', label: 'Peta Fasilitas' },
    { id: 'agenda', label: 'Kalender Acara' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs transition-all">
      {/* Top emergency & quick info bar */}
      <div className="bg-emerald-800 text-emerald-50 text-xs px-4 py-1.5 flex items-center justify-between">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 font-medium">
              <MapPin className="w-3.5 h-3.5 text-emerald-300" />
              Pemerintah Kabupaten Banyumas - Wilayah Barat
            </span>
            <span className="hidden md:inline text-emerald-300">•</span>
            <span className="hidden md:inline text-emerald-200">
              Jl. Raya Gumelar No. 1, Pos 53165
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline text-emerald-200">
              Layanan Hotline/TRC: <strong className="text-white">0812-2890-5541</strong>
            </span>
            <button
              onClick={toggleSound}
              className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
              title={soundEnabled ? 'Matikan Notifikasi Suara' : 'Nyalakan Notifikasi Suara'}
              aria-label={soundEnabled ? 'Matikan Notifikasi Suara' : 'Nyalakan Notifikasi Suara'}
            >
              {soundEnabled ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-emerald-300" />
                  <span className="text-[11px] hidden lg:inline">Suara: On</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-[11px] hidden lg:inline">Suara: Off</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main navigation container */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-2">
          {/* Brand Logo & Title */}
          <button 
            onClick={() => setActiveTab('beranda')}
            className="flex items-center gap-3 text-left focus:outline-hidden group cursor-pointer"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-800 flex items-center justify-center text-white shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-slate-900 tracking-tight text-lg">KECAMATAN GUMELAR</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                  BANYUMAS
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Portal Pelayanan Terpadu & Aspirasi Warga
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1" aria-label="Menu Utama">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-700 shadow-xs ring-1 ring-emerald-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons: Notification Bell & User Auth */}
          <div className="flex items-center gap-2">
            {/* Real-time Notification Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsNotifOpen(!isNotifOpen);
                  setIsUserMenuOpen(false);
                }}
                className="relative p-2.5 rounded-xl hover:bg-slate-100 text-slate-700 transition-colors cursor-pointer"
                aria-label={`Notifikasi ${unreadCount > 0 ? `(${unreadCount} baru)` : ''}`}
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 flex h-4 min-w-4 px-1 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Drawer Popover */}
              {isNotifOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="p-3.5 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900">Notifikasi Real-Time</span>
                      {unreadCount > 0 && (
                        <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-semibold">
                          {unreadCount} baru
                        </span>
                      )}
                    </div>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllAsRead}
                        className="text-xs text-emerald-600 hover:text-emerald-700 font-medium cursor-pointer"
                      >
                        Tandai semua dibaca
                      </button>
                    )}
                  </div>

                  <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                    {notifications.length === 0 ? (
                      <div className="p-6 text-center text-slate-400 text-sm">
                        Belum ada notifikasi saat ini
                      </div>
                    ) : (
                      notifications.slice(0, 8).map((notif) => (
                        <div
                          key={notif.id}
                          onClick={() => {
                            markAsRead(notif.id);
                            if (notif.linkTab) {
                              setActiveTab(notif.linkTab);
                              setIsNotifOpen(false);
                            }
                          }}
                          className={`p-3.5 hover:bg-slate-50 transition-colors cursor-pointer flex gap-3 ${
                            !notif.isRead ? 'bg-emerald-50/40' : ''
                          }`}
                        >
                          <div className="mt-0.5">
                            {notif.tipe === 'aduan' && (
                              <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                                <AlertTriangle className="w-4 h-4" />
                              </div>
                            )}
                            {notif.tipe === 'layanan' && (
                              <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                                <FileText className="w-4 h-4" />
                              </div>
                            )}
                            {notif.tipe === 'darurat' && (
                              <div className="w-7 h-7 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center">
                                <AlertTriangle className="w-4 h-4" />
                              </div>
                            )}
                            {notif.tipe === 'forum' && (
                              <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                                <MessageSquare className="w-4 h-4" />
                              </div>
                            )}
                            {notif.tipe === 'agenda' && (
                              <div className="w-7 h-7 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center">
                                <Calendar className="w-4 h-4" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1">
                              <p className="text-xs font-semibold text-slate-900 truncate">
                                {notif.judul}
                              </p>
                              <span className="text-[10px] text-slate-400 whitespace-nowrap">
                                {notif.tanggal}
                              </span>
                            </div>
                            <p className="text-xs text-slate-600 line-clamp-2 mt-0.5">
                              {notif.pesan}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile or Login Button */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => {
                    setIsUserMenuOpen(!isUserMenuOpen);
                    setIsNotifOpen(false);
                  }}
                  className="flex items-center gap-2 p-1.5 pl-2.5 rounded-xl border border-slate-200 hover:border-emerald-300 hover:bg-slate-50 transition-all cursor-pointer"
                  aria-label="Menu Pengguna"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                    {currentUser.nama.charAt(0)}
                  </div>
                  <div className="hidden sm:block text-left">
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-bold text-slate-800 truncate max-w-[120px]">
                        {currentUser.nama.split(' ')[0]}
                      </span>
                      {currentUser.isVerified && (
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      )}
                    </div>
                    <span className="text-[10px] text-slate-500 capitalize block leading-tight">
                      {currentUser.role === 'petugas' ? 'Petugas Camat' : currentUser.role === 'kades' ? 'Kades' : `Desa ${currentUser.desa}`}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* User Dropdown */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 z-50 p-3 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="p-2.5 bg-slate-50 rounded-xl mb-2">
                      <p className="text-xs font-bold text-slate-900">{currentUser.nama}</p>
                      <p className="text-[11px] text-slate-500 font-mono mt-0.5">NIK: {currentUser.nik}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          Terverifikasi Dukcapil
                        </span>
                        <span className="text-[10px] bg-slate-200 text-slate-700 font-medium px-2 py-0.5 rounded-full capitalize">
                          {currentUser.role}
                        </span>
                      </div>
                    </div>

                    {/* Quick Role Switcher for Demo testing */}
                    <div className="py-2 border-t border-slate-100">
                      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1.5 px-1">
                        Ganti Peran Uji Coba (Demo):
                      </p>
                      <div className="grid grid-cols-3 gap-1">
                        <button
                          onClick={() => {
                            loginAs(DEMO_CITIZENS[0].nik); // Warga Bambang
                            setIsUserMenuOpen(false);
                          }}
                          className={`text-[10px] py-1.5 px-2 rounded-lg font-medium border text-center transition-colors cursor-pointer ${
                            currentUser.nik === DEMO_CITIZENS[0].nik ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          Warga Gumelar
                        </button>
                        <button
                          onClick={() => {
                            loginAs(DEMO_CITIZENS[2].nik); // Camat / Petugas
                            setIsUserMenuOpen(false);
                          }}
                          className={`text-[10px] py-1.5 px-2 rounded-lg font-medium border text-center transition-colors cursor-pointer ${
                            currentUser.nik === DEMO_CITIZENS[2].nik ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          Petugas Camat
                        </button>
                        <button
                          onClick={() => {
                            loginAs(DEMO_CITIZENS[3].nik); // Kades Petahunan
                            setIsUserMenuOpen(false);
                          }}
                          className={`text-[10px] py-1.5 px-2 rounded-lg font-medium border text-center transition-colors cursor-pointer ${
                            currentUser.nik === DEMO_CITIZENS[3].nik ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          Kepala Desa
                        </button>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100">
                      <button
                        onClick={() => {
                          logout();
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        Keluar Akun
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-all shadow-xs hover:shadow-emerald-700/20 cursor-pointer"
              >
                <User className="w-4 h-4" />
                <span>Masuk / Validasi NIK</span>
              </button>
            )}

            {/* Mobile menu toggle button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Buka Menu Navigasi"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {isMobileMenuOpen && (
          <div className="xl:hidden mt-3 pt-3 border-t border-slate-200 animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="grid grid-cols-2 gap-1.5 pb-2">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`px-3 py-2 rounded-lg text-xs font-semibold text-left transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-emerald-100 text-emerald-900 font-bold'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
