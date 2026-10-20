import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Users, 
  Check, 
  Download, 
  Filter, 
  Building2, 
  Sparkles,
  Phone,
  CheckCircle2
} from 'lucide-react';
import { formatIndonesianDate } from '../utils/ticketGenerator';
import { VILLAGES_DATA } from '../data/gumelarData';
import { AgendaEvent } from '../types';

export const EventsCalendar: React.FC = () => {
  const { agendaEvents, toggleRsvpEvent } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [selectedDesa, setSelectedDesa] = useState<string>('Semua');

  const categories = [
    'Semua',
    'Pemerintahan',
    'Kesehatan',
    'Budaya & Tradisi',
    'Sosial & Gotong Royong',
    'Olahraga & Pemuda'
  ];

  const filteredEvents = agendaEvents.filter((ev) => {
    const matchCat = selectedCategory === 'Semua' || ev.kategori === selectedCategory;
    const matchDesa = selectedDesa === 'Semua' || ev.desa === selectedDesa;
    return matchCat && matchDesa;
  });

  const generateICalFile = (event: AgendaEvent) => {
    const startIso = event.tanggalMulai.replace(/-/g, '') + 'T' + event.waktuMulai.replace(':', '') + '00';
    const endIso = event.tanggalMulai.replace(/-/g, '') + 'T' + event.waktuSelesai.replace(':', '') + '00';

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Kecamatan Gumelar//Portal Terpadu//ID',
      'BEGIN:VEVENT',
      `SUMMARY:${event.judul}`,
      `DESCRIPTION:${event.deskripsi} (Penyelenggara: ${event.penyelenggara})`,
      `LOCATION:${event.lokasi}, Desa ${event.desa}, Kecamatan Gumelar`,
      `DTSTART:${startIso}`,
      `DTEND:${endIso}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${event.judul.substring(0, 20)}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="py-12 bg-slate-50 border-b border-slate-200">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold mb-2">
              <CalendarIcon className="w-3.5 h-3.5" />
              Agenda Kegiatan Terpadu
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Kalender Acara Warga Gumelar
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Jadwal pelayanan KTP keliling, musyawarah pembangunan kecamatan (Musrenbang), posyandu balita & lansia, festival seni Ebeg tradisional, serta pelatihan kemitraan UMKM.
            </p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 bg-white p-3.5 rounded-2xl border border-slate-200">
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === c ? 'bg-purple-700 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Desa:</span>
            <select
              value={selectedDesa}
              onChange={(e) => setSelectedDesa(e.target.value)}
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
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all p-5 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Date tag and Category */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-100">
                    {event.kategori}
                  </span>
                  <div className="flex items-center gap-1 text-xs font-mono font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">
                    <CalendarIcon className="w-3.5 h-3.5 text-purple-600" />
                    <span>{formatIndonesianDate(event.tanggalMulai)}</span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  {event.judul}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {event.deskripsi}
                </p>

                {/* Details */}
                <div className="space-y-1.5 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs text-slate-700">
                  <div className="flex items-start gap-2">
                    <Clock className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                    <span>Pukul {event.waktuMulai} - {event.waktuSelesai} WIB</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                    <span>{event.lokasi} (Desa {event.desa})</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Building2 className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                    <span>Penyelenggara: {event.penyelenggara}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Phone className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                    <span>Kontak: {event.kontakPerson}</span>
                  </div>
                </div>
              </div>

              {/* Attendance & RSVP */}
              <div className="pt-3 border-t border-slate-100 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    {event.pesertaHadirCount} warga berencana hadir
                  </span>
                  {event.kuotaPeserta && (
                    <span className="text-[10px] text-slate-400">
                      Kuota: {event.kuotaPeserta} orang
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleRsvpEvent(event.id)}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      event.isRsvp
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {event.isRsvp ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Hadir Terkonfirmasi</span>
                      </>
                    ) : (
                      <span>+ Saya Akan Hadir</span>
                    )}
                  </button>

                  <button
                    onClick={() => generateICalFile(event)}
                    className="p-2 rounded-xl border border-slate-200 hover:border-purple-400 hover:bg-purple-50 text-slate-600 hover:text-purple-700 transition-colors cursor-pointer"
                    title="Simpan Acara ke Kalender Ponsel (.ics)"
                    aria-label="Simpan Acara ke Kalender Ponsel"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
