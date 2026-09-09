import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Trophy,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  X,
  Sparkles,
  Award,
  Medal,
  Calendar,
  Search,
  Star,
} from "lucide-react";
import { useAchievementsCMS } from "@/hooks/useCMS";
import { AchievementItem } from "@/lib/cms-types";

export const Route = createFileRoute("/admin/achievements")({
  component: AdminAchievementsPage,
});

function AdminAchievementsPage() {
  const { achievements, addAchievement, updateAchievement, deleteAchievement, isSaving } =
    useAchievementsCMS();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<AchievementItem | null>(null);

  const [form, setForm] = useState<Omit<AchievementItem, "id">>({
    title: "",
    category: "Academic",
    year: "2025-26",
    badge: "",
    description: "",
    image_url: "",
    order_index: achievements.length + 1,
    is_featured: true,
  });

  const categories = ["Academic", "Sports", "Cultural", "Olympiad", "School"];

  const filtered = achievements.filter((a) => {
    const matchesSearch =
      a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (a.badge && a.badge.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCat = categoryFilter === "all" || a.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  const openAddModal = () => {
    setEditingItem(null);
    setForm({
      title: "",
      category: "Academic",
      year: "2025-26",
      badge: "",
      description: "",
      image_url: "",
      order_index: achievements.length + 1,
      is_featured: true,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item: AchievementItem) => {
    setEditingItem(item);
    setForm({
      title: item.title,
      category: item.category,
      year: item.year,
      badge: item.badge || "",
      description: item.description,
      image_url: item.image_url || "",
      order_index: item.order_index,
      is_featured: item.is_featured,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.description) return;

    if (editingItem) {
      await updateAchievement({ id: editingItem.id, updates: form });
    } else {
      await addAchievement(form);
    }
    setIsModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this achievement?")) {
      await deleteAchievement(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-white">
            Achievements & Awards Manager
          </h1>
          <p className="text-sm text-slate-400">
            Showcase student toppers, sports championships, and accolades
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-900/40 hover:bg-emerald-500 transition-all"
        >
          <Plus className="h-4 w-4" />
          Add Achievement
        </button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by title, award, badge..."
            className="w-full rounded-xl border border-slate-800 bg-slate-900 py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
          />
        </div>

        <div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full rounded-xl border border-slate-800 bg-slate-900 py-2.5 px-3 text-sm text-white focus:border-emerald-500 focus:outline-none"
          >
            <option value="all">All Categories ({achievements.length})</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="group rounded-2xl border border-slate-800 bg-slate-900/90 p-5 transition-all hover:border-slate-700 hover:shadow-xl"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <span className="rounded-lg bg-amber-500/20 border border-amber-500/30 px-2.5 py-1 text-xs font-bold text-amber-400">
                  {item.category}
                </span>
                <span className="text-xs text-slate-400 font-medium">{item.year}</span>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => openEditModal(item)}
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-red-500/10 hover:text-red-400"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="mt-3">
              <h3 className="font-semibold text-white group-hover:text-amber-400 transition-colors">
                {item.title}
              </h3>
              {item.badge && (
                <div className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-emerald-400">
                  <Medal className="h-3.5 w-3.5" />
                  <span>{item.badge}</span>
                </div>
              )}
              <p className="mt-2 text-xs text-slate-400 leading-relaxed">{item.description}</p>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-slate-800/80 pt-3 text-xs text-slate-500">
              <span>{item.is_featured ? "⭐ Featured" : "Standard"}</span>
              <span>Order: #{item.order_index}</span>
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
                {editingItem ? "Edit Achievement" : "Add New Achievement"}
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
                  Achievement Title *
                </label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. 100% Pass Result in CBSE Class XII"
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
                    Academic Year
                  </label>
                  <input
                    type="text"
                    value={form.year}
                    onChange={(e) => setForm({ ...form, year: e.target.value })}
                    placeholder="e.g. 2025-26"
                    className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300">
                  Award Badge / Trophy Title
                </label>
                <input
                  type="text"
                  value={form.badge || ""}
                  onChange={(e) => setForm({ ...form, badge: e.target.value })}
                  placeholder="e.g. 1st Place Gold / Regional Trophy"
                  className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300">
                  Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Detailed breakdown of the milestone, scores, or tournament victory..."
                  className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-between border-t border-slate-800 pt-4">
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.is_featured}
                    onChange={(e) => setForm({ ...form, is_featured: e.target.checked })}
                    className="rounded border-slate-700 bg-slate-800 text-emerald-500"
                  />
                  <span>Feature on Homepage</span>
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
                    {isSaving
                      ? "Saving..."
                      : editingItem
                        ? "Update Achievement"
                        : "Add Achievement"}
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
