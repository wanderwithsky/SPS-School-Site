import { createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, X } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/academic-calendar")({
  component: AdminCalendar,
});

function AdminCalendar() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    category: "Event",
    description: "",
    status: "Published",
  });

  const categories = ["Exam", "Holiday", "PTM", "Activity", "Event", "Other"];

  useEffect(() => {
    loadItems();
  }, []);

  async function loadItems() {
    setLoading(true);
    const { data, error } = await supabase
      .from("academic_calendar")
      .select("*")
      .order("date", { ascending: false });
    if (!error && data) setItems(data);
    setLoading(false);
  }

  function openNew() {
    setEditingId(null);
    setFormData({ title: "", date: "", category: "Event", description: "", status: "Published" });
    setIsModalOpen(true);
  }

  function openEdit(item: any) {
    setEditingId(item.id);
    setFormData({
      title: item.title,
      date: item.date,
      category: item.category,
      description: item.description || "",
      status: item.status || "Published",
    });
    setIsModalOpen(true);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this calendar item?")) return;
    const { error } = await supabase.from("academic_calendar").delete().eq("id", id);
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
        .from("academic_calendar")
        .update(payload)
        .eq("id", editingId);
      error = err;
    } else {
      const { error: err } = await supabase.from("academic_calendar").insert([payload]);
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
        <h1 className="text-2xl font-bold text-slate-900 dark:text-[#F5F5F2]">Academic Calendar</h1>
        <button
          onClick={openNew}
          className="flex items-center gap-2 rounded-lg bg-[#9e1c3f] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#801733]"
        >
          <Plus className="size-4" /> Add Item
        </button>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden dark:border-[#303640] dark:bg-[#181C22]">
        {loading ? (
          <div className="p-8 text-center text-slate-500 dark:text-[#858D99]">Loading...</div>
        ) : items.length === 0 ? (
          <div className="p-8 text-center text-slate-500 dark:text-[#858D99]">
            No calendar items found.
          </div>
        ) : (
          <table className="w-full text-left text-sm text-slate-600 dark:text-[#B8BEC8]">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500 border-b border-slate-200 dark:bg-[#1D2229] dark:text-[#858D99] dark:border-[#303640]">
              <tr>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Title</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-[#303640]">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-[#1D2229]">
                  <td className="px-6 py-4">{item.date}</td>
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-[#F5F5F2]">
                    {item.title}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex rounded bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                      {item.category}
                    </span>
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
          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl dark:bg-[#181C22]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold dark:text-[#F5F5F2]">
                {editingId ? "Edit Item" : "New Item"}
              </h2>
              <button onClick={() => setIsModalOpen(false)}>
                <X className="size-5 text-slate-400 hover:text-slate-600 dark:text-[#858D99] dark:hover:text-[#F5F5F2]" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-[#B8BEC8]">
                  Title *
                </label>
                <input
                  required
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full rounded-md border border-slate-300 p-2 text-sm focus:outline-none dark:border-[#303640] dark:bg-[#1D2229] dark:text-[#F5F5F2] dark:focus:border-[#9e1c3f]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1 dark:text-[#B8BEC8]">
                    Date *
                  </label>
                  <input
                    required
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full rounded-md border border-slate-300 p-2 text-sm focus:outline-none dark:border-[#303640] dark:bg-[#1D2229] dark:text-[#F5F5F2] dark:focus:border-[#9e1c3f]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 dark:text-[#B8BEC8]">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full rounded-md border border-slate-300 p-2 text-sm focus:outline-none dark:border-[#303640] dark:bg-[#1D2229] dark:text-[#F5F5F2] dark:focus:border-[#9e1c3f]"
                  >
                    {categories.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-[#B8BEC8]">
                  Description
                </label>
                <textarea
                  rows={3}
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
