import { createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, X } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/achievements")({
  component: AdminAchievements,
});

function AdminAchievements() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    student_name: "",
    class: "",
    academic_year: "",
    achievement: "",
    exam: "",
    rank: "",
    percentage: "",
    image_url: "",
    description: "",
    status: "Published",
  });

  useEffect(() => {
    loadItems();
  }, []);

  async function loadItems() {
    setLoading(true);
    const { data, error } = await supabase
      .from("achievements")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setItems(data);
    setLoading(false);
  }

  function openNew() {
    setEditingId(null);
    setFormData({
      student_name: "",
      class: "",
      academic_year: "",
      achievement: "",
      exam: "",
      rank: "",
      percentage: "",
      image_url: "",
      description: "",
      status: "Published",
    });
    setIsModalOpen(true);
  }

  function openEdit(item: any) {
    setEditingId(item.id);
    setFormData({
      student_name: item.student_name,
      class: item.class || "",
      academic_year: item.academic_year || "",
      achievement: item.achievement || "",
      exam: item.exam || "",
      rank: item.rank || "",
      percentage: item.percentage || "",
      image_url: item.image_url || "",
      description: item.description || "",
      status: item.status || "Published",
    });
    setIsModalOpen(true);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this achievement?")) return;
    const { error } = await supabase.from("achievements").delete().eq("id", id);
    if (!error) {
      toast.success("Deleted");
      loadItems();
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload = { ...formData };

    let error;
    if (editingId) {
      const { error: err } = await supabase
        .from("achievements")
        .update(payload)
        .eq("id", editingId);
      error = err;
    } else {
      const { error: err } = await supabase.from("achievements").insert([payload]);
      error = err;
    }

    if (error) {
      toast.error("Error saving: " + error.message);
    } else {
      toast.success("Saved successfully");
      setIsModalOpen(false);
      loadItems();
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-[#F5F5F2]">Achievements</h1>
        <button
          onClick={openNew}
          className="flex items-center gap-2 rounded-lg bg-[#9e1c3f] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#801733]"
        >
          <Plus className="size-4" /> Add Achievement
        </button>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden dark:border-[#303640] dark:bg-[#181C22]">
        {loading ? (
          <div className="p-8 text-center text-slate-500 dark:text-[#858D99]">Loading...</div>
        ) : items.length === 0 ? (
          <div className="p-8 text-center text-slate-500 dark:text-[#858D99]">
            No achievements found.
          </div>
        ) : (
          <table className="w-full text-left text-sm text-slate-600 dark:text-[#B8BEC8]">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500 border-b border-slate-200 dark:bg-[#1D2229] dark:text-[#858D99] dark:border-[#303640]">
              <tr>
                <th className="px-6 py-3">Student</th>
                <th className="px-6 py-3">Class/Year</th>
                <th className="px-6 py-3">Achievement</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-[#303640]">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-[#1D2229]">
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-[#F5F5F2]">
                    <div className="flex items-center gap-3">
                      {item.image_url && (
                        <img
                          src={item.image_url}
                          alt=""
                          className="size-8 rounded-full object-cover"
                        />
                      )}
                      {item.student_name}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {item.class}{" "}
                    <span className="text-slate-400 dark:text-[#858D99]">
                      ({item.academic_year})
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium">{item.achievement || item.exam}</div>
                    <div className="text-xs text-slate-500 dark:text-[#858D99]">
                      {item.rank} {item.percentage ? `(${item.percentage}%)` : ""}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${item.status === "Published" ? "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-slate-100 text-slate-700 dark:bg-[#1D2229] dark:text-[#858D99]"}`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => openEdit(item)}
                      className="p-2 text-slate-400 hover:text-[#9e1c3f] dark:text-[#858D99] dark:hover:text-red-400"
                    >
                      <Edit2 className="size-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 text-slate-400 hover:text-red-600 dark:text-[#858D99] dark:hover:text-red-400"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl max-h-[90vh] overflow-y-auto dark:bg-[#181C22]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold dark:text-[#F5F5F2]">
                {editingId ? "Edit Achievement" : "New Achievement"}
              </h2>
              <button onClick={() => setIsModalOpen(false)}>
                <X className="size-5 text-slate-400 hover:text-slate-600 dark:text-[#858D99] dark:hover:text-[#F5F5F2]" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-[#B8BEC8]">
                  Student Name *
                </label>
                <input
                  required
                  type="text"
                  value={formData.student_name}
                  onChange={(e) => setFormData({ ...formData, student_name: e.target.value })}
                  className="w-full rounded-md border border-slate-300 p-2 text-sm focus:outline-none dark:border-[#303640] dark:bg-[#1D2229] dark:text-[#F5F5F2] dark:focus:border-[#9e1c3f]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1 dark:text-[#B8BEC8]">
                    Class
                  </label>
                  <input
                    type="text"
                    value={formData.class}
                    onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                    className="w-full rounded-md border border-slate-300 p-2 text-sm focus:outline-none dark:border-[#303640] dark:bg-[#1D2229] dark:text-[#F5F5F2] dark:focus:border-[#9e1c3f]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 dark:text-[#B8BEC8]">
                    Academic Year
                  </label>
                  <input
                    type="text"
                    value={formData.academic_year}
                    onChange={(e) => setFormData({ ...formData, academic_year: e.target.value })}
                    className="w-full rounded-md border border-slate-300 p-2 text-sm focus:outline-none dark:border-[#303640] dark:bg-[#1D2229] dark:text-[#F5F5F2] dark:focus:border-[#9e1c3f]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-[#B8BEC8]">
                  Achievement Type (e.g. Sports, Academics)
                </label>
                <input
                  type="text"
                  value={formData.achievement}
                  onChange={(e) => setFormData({ ...formData, achievement: e.target.value })}
                  className="w-full rounded-md border border-slate-300 p-2 text-sm focus:outline-none dark:border-[#303640] dark:bg-[#1D2229] dark:text-[#F5F5F2] dark:focus:border-[#9e1c3f]"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1 dark:text-[#B8BEC8]">Exam</label>
                  <input
                    type="text"
                    value={formData.exam}
                    onChange={(e) => setFormData({ ...formData, exam: e.target.value })}
                    className="w-full rounded-md border border-slate-300 p-2 text-sm focus:outline-none dark:border-[#303640] dark:bg-[#1D2229] dark:text-[#F5F5F2] dark:focus:border-[#9e1c3f]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 dark:text-[#B8BEC8]">Rank</label>
                  <input
                    type="text"
                    value={formData.rank}
                    onChange={(e) => setFormData({ ...formData, rank: e.target.value })}
                    className="w-full rounded-md border border-slate-300 p-2 text-sm focus:outline-none dark:border-[#303640] dark:bg-[#1D2229] dark:text-[#F5F5F2] dark:focus:border-[#9e1c3f]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 dark:text-[#B8BEC8]">
                    Percentage
                  </label>
                  <input
                    type="text"
                    value={formData.percentage}
                    onChange={(e) => setFormData({ ...formData, percentage: e.target.value })}
                    className="w-full rounded-md border border-slate-300 p-2 text-sm focus:outline-none dark:border-[#303640] dark:bg-[#1D2229] dark:text-[#F5F5F2] dark:focus:border-[#9e1c3f]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-[#B8BEC8]">
                  Image URL
                </label>
                <input
                  type="text"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  className="w-full rounded-md border border-slate-300 p-2 text-sm focus:outline-none dark:border-[#303640] dark:bg-[#1D2229] dark:text-[#F5F5F2] dark:focus:border-[#9e1c3f]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-[#B8BEC8]">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full rounded-md border border-slate-300 p-2 text-sm focus:outline-none dark:border-[#303640] dark:bg-[#1D2229] dark:text-[#F5F5F2] dark:focus:border-[#9e1c3f]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-[#B8BEC8]">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full rounded-md border border-slate-300 p-2 text-sm focus:outline-none dark:border-[#303640] dark:bg-[#1D2229] dark:text-[#F5F5F2] dark:focus:border-[#9e1c3f]"
                >
                  <option>Published</option>
                  <option>Unpublished</option>
                </select>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-md px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-[#F5F5F2] dark:hover:bg-[#1D2229]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-[#9e1c3f] px-4 py-2 text-sm font-medium text-white hover:bg-[#801733]"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
