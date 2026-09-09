import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Users,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  X,
  Sparkles,
  GraduationCap,
  Mail,
  Briefcase,
  Search,
  Check,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import { useTeachersCMS } from "@/hooks/useCMS";
import { TeacherItem } from "@/lib/cms-types";

export const Route = createFileRoute("/admin/teachers")({
  component: AdminTeachersPage,
});

function AdminTeachersPage() {
  const { teachers, addTeacher, updateTeacher, deleteTeacher, isSaving } = useTeachersCMS();
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<TeacherItem | null>(null);

  // Form State
  const [form, setForm] = useState<Omit<TeacherItem, "id">>({
    name: "",
    role: "",
    department: "Science",
    qualification: "",
    experience: "",
    bio: "",
    image_url: "",
    email: "",
    order_index: teachers.length + 1,
    is_active: true,
  });

  const departments = Array.from(new Set(teachers.map((t) => t.department))).filter(Boolean);

  const filtered = teachers.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (t.qualification && t.qualification.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesDept = departmentFilter === "all" || t.department === departmentFilter;
    return matchesSearch && matchesDept;
  });

  const openAddModal = () => {
    setEditingTeacher(null);
    setForm({
      name: "",
      role: "",
      department: "Science",
      qualification: "",
      experience: "",
      bio: "",
      image_url: "",
      email: "",
      order_index: teachers.length + 1,
      is_active: true,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (t: TeacherItem) => {
    setEditingTeacher(t);
    setForm({
      name: t.name,
      role: t.role,
      department: t.department,
      qualification: t.qualification || "",
      experience: t.experience || "",
      bio: t.bio || "",
      image_url: t.image_url || "",
      email: t.email || "",
      order_index: t.order_index,
      is_active: t.is_active,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.role) return;

    if (editingTeacher) {
      await updateTeacher({ id: editingTeacher.id, updates: form });
    } else {
      await addTeacher(form);
    }
    setIsModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to remove this faculty member?")) {
      await deleteTeacher(id);
    }
  };

  const toggleStatus = async (t: TeacherItem) => {
    await updateTeacher({ id: t.id, updates: { is_active: !t.is_active } });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-white">Faculty & Teachers Manager</h1>
          <p className="text-sm text-slate-400">
            Add, update, or remove school educators and leadership staff in real-time
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-900/40 hover:bg-emerald-500 transition-all"
        >
          <Plus className="h-4 w-4" />
          Add Faculty Member
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
            placeholder="Search by teacher name, role, subject..."
            className="w-full rounded-xl border border-slate-800 bg-slate-900 py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
          />
        </div>

        <div>
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="w-full rounded-xl border border-slate-800 bg-slate-900 py-2.5 px-3 text-sm text-white focus:border-emerald-500 focus:outline-none"
          >
            <option value="all">All Departments ({teachers.length})</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Teachers Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((t) => (
          <div
            key={t.id}
            className={`group rounded-2xl border p-5 transition-all ${
              t.is_active
                ? "border-slate-800 bg-slate-900/90 hover:border-slate-700 hover:shadow-xl"
                : "border-slate-800/40 bg-slate-900/40 opacity-60"
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-lg font-bold text-white shadow-md">
                  {t.image_url ? (
                    <img
                      src={t.image_url}
                      alt={t.name}
                      className="h-full w-full rounded-2xl object-cover"
                    />
                  ) : (
                    t.name.charAt(0)
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-white group-hover:text-emerald-400 transition-colors">
                    {t.name}
                  </h3>
                  <span className="text-xs text-emerald-400 font-medium">{t.role}</span>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => openEditModal(t)}
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"
                  title="Edit Teacher"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(t.id)}
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-red-500/10 hover:text-red-400"
                  title="Delete Teacher"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="mt-4 space-y-1.5 text-xs text-slate-400 border-t border-slate-800/80 pt-3">
              <div className="flex items-center gap-2">
                <Briefcase className="h-3.5 w-3.5 text-slate-500 shrink-0" />
                <span>
                  Dept: <strong className="text-slate-300">{t.department}</strong>
                </span>
              </div>
              {t.qualification && (
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-3.5 w-3.5 text-slate-500 shrink-0" />
                  <span>{t.qualification}</span>
                </div>
              )}
              {t.experience && (
                <div className="text-[11px] text-slate-400">Exp: {t.experience}</div>
              )}
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-slate-800/80 pt-3">
              <button
                onClick={() => toggleStatus(t)}
                className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white"
              >
                {t.is_active ? (
                  <>
                    <ToggleRight className="h-5 w-5 text-emerald-400" />
                    <span className="text-emerald-400">Active</span>
                  </>
                ) : (
                  <>
                    <ToggleLeft className="h-5 w-5 text-slate-600" />
                    <span>Hidden</span>
                  </>
                )}
              </button>
              <span className="text-[10px] text-slate-500">Order: #{t.order_index}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="font-serif text-lg font-bold text-white">
                {editingTeacher ? "Edit Faculty Profile" : "Add New Faculty Member"}
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
                  Teacher Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Dr. R. K. Sharma"
                  className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-300">
                    Designation / Role *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    placeholder="e.g. Senior PGT Physics"
                    className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-300">
                    Department
                  </label>
                  <input
                    type="text"
                    value={form.department}
                    onChange={(e) => setForm({ ...form, department: e.target.value })}
                    placeholder="e.g. Science, Maths, Languages"
                    className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-300">
                    Qualifications
                  </label>
                  <input
                    type="text"
                    value={form.qualification}
                    onChange={(e) => setForm({ ...form, qualification: e.target.value })}
                    placeholder="e.g. M.Sc., B.Ed."
                    className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-300">
                    Experience
                  </label>
                  <input
                    type="text"
                    value={form.experience}
                    onChange={(e) => setForm({ ...form, experience: e.target.value })}
                    placeholder="e.g. 12+ Years"
                    className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300">
                  Short Bio
                </label>
                <textarea
                  rows={2}
                  value={form.bio}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  placeholder="Specializations, mentorship philosophy, and notable achievements..."
                  className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300">
                  Profile Image URL (Optional)
                </label>
                <input
                  type="url"
                  value={form.image_url}
                  onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                  placeholder="https://..."
                  className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-between border-t border-slate-800 pt-4">
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.is_active}
                    onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
                    className="rounded border-slate-700 bg-slate-800 text-emerald-500"
                  />
                  <span>Display on Website</span>
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
                    {isSaving ? "Saving..." : editingTeacher ? "Update Faculty" : "Add Faculty"}
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
