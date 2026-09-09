import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  BellRing,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  X,
  Sparkles,
  Pin,
  Calendar,
  Search,
  FileText,
} from "lucide-react";
import { useNoticesCMS } from "@/hooks/useCMS";
import { NoticeItem } from "@/lib/cms-types";

export const Route = createFileRoute("/admin/notices")({
  component: AdminNoticesPage,
});

function AdminNoticesPage() {
  const { notices, addNotice, updateNotice, deleteNotice, isSaving } = useNoticesCMS();
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<NoticeItem | null>(null);

  const [form, setForm] = useState<Omit<NoticeItem, "id">>({
    title: "",
    category: "Notice",
    publish_date: new Date().toISOString().slice(0, 10),
    description: "",
    file_url: "",
    link_url: "",
    is_pinned: false,
    is_active: true,
  });

  const categories = ["Notice", "Circular", "Event", "Exam", "Holiday"];

  const filtered = notices.filter((n) => {
    return (
      n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const openAddModal = () => {
    setEditingItem(null);
    setForm({
      title: "",
      category: "Notice",
      publish_date: new Date().toISOString().slice(0, 10),
      description: "",
      file_url: "",
      link_url: "",
      is_pinned: false,
      is_active: true,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item: NoticeItem) => {
    setEditingItem(item);
    setForm({
      title: item.title,
      category: item.category,
      publish_date: item.publish_date,
      description: item.description,
      file_url: item.file_url || "",
      link_url: item.link_url || "",
      is_pinned: item.is_pinned,
      is_active: item.is_active,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.description) return;

    if (editingItem) {
      await updateNotice({ id: editingItem.id, updates: form });
    } else {
      await addNotice(form);
    }
    setIsModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this notice?")) {
      await deleteNotice(id);
    }
  };

  const togglePin = async (item: NoticeItem) => {
    await updateNotice({ id: item.id, updates: { is_pinned: !item.is_pinned } });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-white">Notices & Circulars Manager</h1>
          <p className="text-sm text-slate-400">
            Publish school announcements, event dates, exam circulars, and marquee alerts
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-900/40 hover:bg-emerald-500 transition-all"
        >
          <Plus className="h-4 w-4" />
          Publish Notice
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by title, description, category..."
          className="w-full rounded-xl border border-slate-800 bg-slate-900 py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
        />
      </div>

      {/* Notices List */}
      <div className="space-y-3">
        {filtered.map((item) => (
          <div
            key={item.id}
            className={`group rounded-2xl border p-5 transition-all ${
              item.is_pinned
                ? "border-emerald-500/40 bg-slate-900/95 shadow-lg shadow-emerald-950/20"
                : "border-slate-800 bg-slate-900/80 hover:border-slate-700"
            }`}
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  {item.is_pinned && (
                    <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/20 border border-emerald-500/40 px-2 py-0.5 text-[11px] font-bold text-emerald-400">
                      <Pin className="h-3 w-3" />
                      Pinned to Homepage
                    </span>
                  )}
                  <span className="rounded-md bg-purple-500/20 border border-purple-500/30 px-2 py-0.5 text-[11px] font-semibold text-purple-300">
                    {item.category}
                  </span>
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {item.publish_date}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
              </div>

              <div className="flex items-center gap-1 shrink-0 pt-1">
                <button
                  onClick={() => togglePin(item)}
                  className={`rounded-lg p-2 transition-colors ${
                    item.is_pinned
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "text-slate-500 hover:bg-slate-800 hover:text-slate-200"
                  }`}
                  title={item.is_pinned ? "Unpin Notice" : "Pin to Marquee / Top"}
                >
                  <Pin className="h-4 w-4" />
                </button>
                <button
                  onClick={() => openEditModal(item)}
                  className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="rounded-lg p-2 text-slate-400 hover:bg-red-500/10 hover:text-red-400"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="font-serif text-lg font-bold text-white">
                {editingItem ? "Edit Notice / Event" : "Publish New Notice"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-sm">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300">
                  Notice Title *
                </label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Schedule for Annual Sports Meet 2026"
                  className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-300">
                    Category
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-white focus:border-emerald-500 focus:outline-none"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-300">
                    Publish Date
                  </label>
                  <input
                    type="date"
                    value={form.publish_date}
                    onChange={(e) => setForm({ ...form, publish_date: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300">
                  Description / Details *
                </label>
                <textarea
                  rows={4}
                  required
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Full circular details, timing, venue, and instructions..."
                  className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-between border-t border-slate-800 pt-4">
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.is_pinned}
                    onChange={(e) => setForm({ ...form, is_pinned: e.target.checked })}
                    className="rounded border-slate-700 bg-slate-800 text-emerald-500"
                  />
                  <span>Pin to Homepage Banner</span>
                </label>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="rounded-xl bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-750"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="rounded-xl bg-emerald-600 px-5 py-2 text-xs font-semibold text-white hover:bg-emerald-500 disabled:opacity-50"
                  >
                    {isSaving ? "Publishing..." : editingItem ? "Update Notice" : "Publish Notice"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
