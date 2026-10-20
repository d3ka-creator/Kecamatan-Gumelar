import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { VillageProfiles } from './components/VillageProfiles';
import { TourismSection } from './components/TourismSection';
import { PublicServices } from './components/PublicServices';
import { ComplaintsSystem } from './components/ComplaintsSystem';
import { CommunityForum } from './components/CommunityForum';
import { InteractiveMap } from './components/InteractiveMap';
import { EventsCalendar } from './components/EventsCalendar';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { 
  ArrowUp, 
  AlertTriangle, 
  FileText, 
  MessageSquare, 
  Compass, 
  MapPin, 
  Calendar,
  Sparkles,
  PhoneCall
} from 'lucide-react';

const AppContent: React.FC = () => {
  const { activeTab, setActiveTab } = useApp();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-emerald-500 selection:text-white">
      {/* Navigation */}
      <Navbar onOpenAuth={() => setIsAuthModalOpen(true)} />

      {/* Main View Router / Layout */}
      <main className="flex-1">
        {/* If 'beranda', show full portal experience; otherwise focus on selected section with top hero anchor */}
        {activeTab === 'beranda' ? (
          <>
            <HeroBanner />
            <section id="desa">
              <VillageProfiles />
            </section>
            <section id="wisata">
              <TourismSection />
            </section>
            <section id="layanan">
              <PublicServices />
            </section>
            <section id="pengaduan">
              <ComplaintsSystem />
            </section>
            <section id="peta">
              <InteractiveMap />
            </section>
            <section id="forum">
              <CommunityForum />
            </section>
            <section id="agenda">
              <EventsCalendar />
            </section>
          </>
        ) : (
          <div className="animate-in fade-in duration-200">
            {/* Context breadcrumb header */}
            <div className="bg-emerald-900 text-white py-6 border-b border-emerald-800">
              <div className="container mx-auto px-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2 text-xs text-emerald-300">
                    <button 
                      onClick={() => setActiveTab('beranda')}
                      className="hover:text-white cursor-pointer"
                    >
                      Beranda
                    </button>
                    <span>/</span>
                    <span className="text-white capitalize">{activeTab}</span>
                  </div>
                  <h1 className="text-xl sm:text-2xl font-black mt-1">
                    {activeTab === 'desa' && 'Profil 10 Desa Mandiri Kecamatan Gumelar'}
                    {activeTab === 'wisata' && 'Potensi & Destinasi Wisata Alam Gumelar'}
                    {activeTab === 'layanan' && 'Pelayanan Publik & E-Administrasi Terpadu'}
                    {activeTab === 'pengaduan' && 'Sistem Pengaduan Online Warga (Lapor Gumelar)'}
                    {activeTab === 'forum' && 'Ruang Rembug Komunitas & Warga Gumelar'}
                    {activeTab === 'peta' && 'Peta Fasilitas Kesehatan, Pendidikan & Pemerintahan'}
                    {activeTab === 'agenda' && 'Kalender Agenda & Kegiatan Warga Gumelar'}
                  </h1>
                </div>

                <button
                  onClick={() => setActiveTab('beranda')}
                  className="px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer self-start sm:self-auto"
                >
                  &larr; Tampilkan Semua di Beranda
                </button>
              </div>
            </div>

            {/* Render single focused view */}
            {activeTab === 'desa' && <VillageProfiles />}
            {activeTab === 'wisata' && <TourismSection />}
            {activeTab === 'layanan' && <PublicServices />}
            {activeTab === 'pengaduan' && <ComplaintsSystem />}
            {activeTab === 'forum' && <CommunityForum />}
            {activeTab === 'peta' && <InteractiveMap />}
            {activeTab === 'agenda' && <EventsCalendar />}
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      {/* Floating Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white shadow-xl transition-all hover:scale-105 cursor-pointer"
          aria-label="Kembali ke Atas"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
