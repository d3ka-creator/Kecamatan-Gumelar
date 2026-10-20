import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  MessageSquare, 
  ThumbsUp, 
  PlusCircle, 
  Send, 
  ShieldCheck, 
  Tag, 
  MapPin, 
  Filter, 
  Users, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { ForumTopic } from '../types';
import { VILLAGES_DATA } from '../data/gumelarData';

export const CommunityForum: React.FC = () => {
  const { 
    currentUser, 
    forumTopics, 
    addForumTopic, 
    upvoteForumTopic, 
    addForumComment 
  } = useApp();

  const [isNewPostOpen, setIsNewPostOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [selectedDesa, setSelectedDesa] = useState<string>('Semua');

  // New post form state
  const [postForm, setPostForm] = useState({
    judul: '',
    kategori: 'UMKM & Usaha Lokal' as ForumTopic['kategori'],
    desa: currentUser?.desa || 'Gumelar',
    isi: '',
    tagsString: 'GulaSemut, UMKM'
  });

  // Comment input per topic state
  const [activeCommentTopicId, setActiveCommentTopicId] = useState<string | null>(null);
  const [commentInput, setCommentInput] = useState('');

  const categories = [
    'Semua',
    'Kabar Desa',
    'UMKM & Usaha Lokal',
    'Pertanian & Peternakan',
    'Kepemudaan',
    'Gotong Royong'
  ];

  const filteredTopics = forumTopics.filter((t) => {
    const matchCat = selectedCategory === 'Semua' || t.kategori === selectedCategory;
    const matchDesa = selectedDesa === 'Semua' || t.desa === selectedDesa;
    return matchCat && matchDesa;
  });

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postForm.judul.trim() || !postForm.isi.trim()) {
      alert('Judul dan isi rembug wajib diisi');
      return;
    }

    const tags = postForm.tagsString
      .split(',')
      .map(tag => tag.trim().replace(/^#/, ''))
      .filter(Boolean);

    addForumTopic({
      judul: postForm.judul,
      kategori: postForm.kategori,
      desa: postForm.desa,
      isi: postForm.isi,
      tags: tags.length ? tags : ['RembugGumelar', postForm.desa]
    });

    setPostForm({
      judul: '',
      kategori: 'UMKM & Usaha Lokal',
      desa: currentUser?.desa || 'Gumelar',
      isi: '',
      tagsString: ''
    });
    setIsNewPostOpen(false);
  };

  const handlePostComment = (topicId: string) => {
    if (!commentInput.trim()) return;
    addForumComment(topicId, commentInput);
    setCommentInput('');
  };

  return (
    <section className="py-12 bg-slate-50 border-b border-slate-200">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold mb-2">
              <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
              Ruang Rembug Warga Gumelar
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Forum Diskusi Komunitas & Gotong Royong
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Wadah rembukan interaktif bagi seluruh warga desa, pemuda, kelompok tani, pegiat UMKM, dan aparatur pemerintah untuk saling bertukar gagasan dan memperkuat kearifan lokal.
            </p>
          </div>

          <button
            onClick={() => setIsNewPostOpen(!isNewPostOpen)}
            className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer self-start md:self-auto"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Mulai Topik Rembug Baru</span>
          </button>
        </div>

        {/* Modal / Form Collapse: Buat Topik Baru */}
        {isNewPostOpen && (
          <form
            onSubmit={handleCreatePost}
            className="mb-8 p-6 bg-white rounded-3xl border border-slate-200 shadow-md space-y-4 animate-in fade-in"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">
                Buat Topik Rembug Komunitas Baru
              </h3>
              <button
                type="button"
                onClick={() => setIsNewPostOpen(false)}
                className="text-xs font-bold text-slate-500 hover:text-slate-800 cursor-pointer"
              >
                Batal
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Kategori Rembug *</label>
                <select
                  value={postForm.kategori}
                  onChange={(e) => setPostForm({ ...postForm, kategori: e.target.value as ForumTopic['kategori'] })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Kabar Desa">Kabar Desa & Informasi Warga</option>
                  <option value="UMKM & Usaha Lokal">UMKM, Gula Semut & Usaha Lokal</option>
                  <option value="Pertanian & Peternakan">Pertanian, Pupuk & Peternakan</option>
                  <option value="Kepemudaan">Kepemudaan, Karang Taruna & Olahraga</option>
                  <option value="Gotong Royong">Gotong Royong & Mitigasi Kebencanaan</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Desa Asal Rembug *</label>
                <select
                  value={postForm.desa}
                  onChange={(e) => setPostForm({ ...postForm, desa: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500"
                >
                  {VILLAGES_DATA.map((v) => (
                    <option key={v.id} value={v.nama.replace('Desa ', '')}>
                      {v.nama}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Judul Rembug *</label>
              <input
                type="text"
                value={postForm.judul}
                onChange={(e) => setPostForm({ ...postForm, judul: e.target.value })}
                placeholder="Contoh: Inisiatif Pembentukan Koperasi Bersama Penderes Nira Kelapa"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Isi Rembug / Pandangan Diskusi *</label>
              <textarea
                rows={4}
                value={postForm.isi}
                onChange={(e) => setPostForm({ ...postForm, isi: e.target.value })}
                placeholder="Sampaikan gagasan, ajakan kolaborasi, atau pertanyaan kepada sedulur warga Gumelar..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Tagar (Pisahkan dengan koma)</label>
              <input
                type="text"
                value={postForm.tagsString}
                onChange={(e) => setPostForm({ ...postForm, tagsString: e.target.value })}
                placeholder="GulaSemut, Koperasi, Cihonje"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsNewPostOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs cursor-pointer"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                Terbitkan Topik Rembug
              </button>
            </div>
          </form>
        )}

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 bg-white p-3.5 rounded-2xl border border-slate-200">
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === c ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Filter Desa:</span>
            <select
              value={selectedDesa}
              onChange={(e) => setSelectedDesa(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs bg-white text-slate-700"
            >
              <option value="Semua">Semua Wilayah</option>
              {VILLAGES_DATA.map((v) => (
                <option key={v.id} value={v.nama.replace('Desa ', '')}>
                  {v.nama}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Forum Topics List */}
        <div className="space-y-6">
          {filteredTopics.map((topic) => (
            <div
              key={topic.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:border-emerald-300 transition-all space-y-4"
            >
              {/* Header Topic */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-100">
                      {topic.kategori}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-500" />
                      Desa {topic.desa}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    {topic.judul}
                  </h3>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span>{topic.tanggalDibuat}</span>
                </div>
              </div>

              {/* Author badge */}
              <div className="flex items-center gap-2 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <div className="w-6 h-6 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-[10px]">
                  {topic.penulisNama.charAt(0)}
                </div>
                <span className="font-bold text-slate-800">{topic.penulisNama}</span>
                {topic.isPenulisVerified && (
                  <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    Warga Terverifikasi NIK Gumelar
                  </span>
                )}
              </div>

              {/* Post content */}
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {topic.isi}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1">
                {topic.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-[10px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Comments Thread */}
              {topic.komentar.length > 0 && (
                <div className="pt-3 border-t border-slate-100 space-y-2.5">
                  <span className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
                    Tanggapan Warga ({topic.komentar.length}):
                  </span>
                  {topic.komentar.map((komentar) => (
                    <div
                      key={komentar.id}
                      className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-800 flex items-center gap-1.5">
                          {komentar.penulisNama}
                          {komentar.isVerified && (
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          )}
                          <span className="text-[10px] text-slate-500 font-normal">({komentar.penulisDesa})</span>
                        </span>
                        <span className="text-[10px] text-slate-400">{komentar.tanggal}</span>
                      </div>
                      <p className="text-slate-700 pl-4">{komentar.isi}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Topic Footer Actions */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => upvoteForumTopic(topic.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    topic.hasUpvoted
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                  aria-label="Apresiasi Topik Rembug"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>Apresiasi ({topic.upvotes})</span>
                </button>

                <button
                  onClick={() => setActiveCommentTopicId(activeCommentTopicId === topic.id ? null : topic.id)}
                  className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{activeCommentTopicId === topic.id ? 'Tutup Kolom Komentar' : 'Tulis Tanggapan'}</span>
                </button>
              </div>

              {/* Add comment inline box */}
              {activeCommentTopicId === topic.id && (
                <div className="mt-2 p-3 bg-slate-50 rounded-2xl border border-slate-200 flex gap-2 animate-in fade-in">
                  <input
                    type="text"
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                    placeholder="Tuliskan tanggapan rembug Anda sebagai warga..."
                    className="flex-1 px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white focus:ring-2 focus:ring-emerald-500"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handlePostComment(topic.id);
                    }}
                  />
                  <button
                    onClick={() => handlePostComment(topic.id)}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Kirim
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
