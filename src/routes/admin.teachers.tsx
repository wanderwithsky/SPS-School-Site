import { createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, X } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/teachers")({
  component: AdminTeachers,
});

function AdminTeachers() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    subject: "",
    department: "",
    photo_url: "",
    description: "",
    display_order: 0,
    status: "Published",
  });

  useEffect(() => {
    loadItems();
  }, []);

  async function loadItems() {
    setLoading(true);
    const { data, error } = await supabase
      .from("teachers")
      .select("*")
      .order("display_order", { ascending: true });
    if (!error && data) setItems(data);
    setLoading(false);
  }

  function openNew() {
    setEditingId(null);
    setFormData({
      name: "",
      designation: "",
      subject: "",
      department: "",
      photo_url: "",
      description: "",
      display_order: items.length,
      status: "Published",
    });
    setIsModalOpen(true);
  }

  function openEdit(item: any) {
    setEditingId(item.id);
    setFormData({
      name: item.name,
      designation: item.designation || "",
      subject: item.subject || "",
      department: item.department || "",
      photo_url: item.photo_url || "",
      description: item.description || "",
      display_order: item.display_order || 0,
      status: item.status || "Published",
    });
    setIsModalOpen(true);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this teacher profile?")) return;
    const { error } = await supabase.from("teachers").delete().eq("id", id);
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
      const { error: err } = await supabase.from("teachers").update(payload).eq("id", editingId);
      error = err;
    } else {
      const { error: err } = await supabase.from("teachers").insert([payload]);
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
        <h1 className="text-2xl font-bold text-slate-900 dark:text-[#F5F5F2]">
          Teachers & Faculty
        </h1>
        <button
          onClick={openNew}
          className="flex items-center gap-2 rounded-lg bg-[#9e1c3f] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#801733]"
        >
          <Plus className="size-4" /> Add Teacher
        </button>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden dark:border-[#303640] dark:bg-[#181C22]">
        {loading ? (
          <div className="p-8 text-center text-slate-500 dark:text-[#858D99]">Loading...</div>
        ) : items.length === 0 ? (
          <div className="p-8 text-center text-slate-500 dark:text-[#858D99]">
            No teachers found.
          </div>
        ) : (
          <table className="w-full text-left text-sm text-slate-600 dark:text-[#B8BEC8]">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500 border-b border-slate-200 dark:bg-[#1D2229] dark:text-[#858D99] dark:border-[#303640]">
              <tr>
                <th className="px-6 py-3">Order</th>
                <th className="px-6 py-3">Photo</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Designation</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-[#303640]">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-[#1D2229]">
                  <td className="px-6 py-4">{item.display_order}</td>
                  <td className="px-6 py-4">
                    <div className="size-10 overflow-hidden rounded-full bg-slate-100 dark:bg-[#1D2229]">
                      {item.photo_url ? (
                        <img
                          src={item.photo_url}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-slate-400">
                          ?
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-[#F5F5F2]">
                    {item.name}
                  </td>
                  <td className="px-6 py-4">{item.designation}</td>
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
                {editingId ? "Edit Teacher" : "New Teacher"}
              </h2>
              <button onClick={() => setIsModalOpen(false)}>
                <X className="size-5 text-slate-400 hover:text-slate-600 dark:text-[#858D99] dark:hover:text-[#F5F5F2]" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-[#B8BEC8]">Name *</label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-md border border-slate-300 p-2 text-sm focus:outline-none dark:border-[#303640] dark:bg-[#1D2229] dark:text-[#F5F5F2] dark:focus:border-[#9e1c3f]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1 dark:text-[#B8BEC8]">
                    Designation
                  </label>
                  <input
                    type="text"
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    className="w-full rounded-md border border-slate-300 p-2 text-sm focus:outline-none dark:border-[#303640] dark:bg-[#1D2229] dark:text-[#F5F5F2] dark:focus:border-[#9e1c3f]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 dark:text-[#B8BEC8]">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full rounded-md border border-slate-300 p-2 text-sm focus:outline-none dark:border-[#303640] dark:bg-[#1D2229] dark:text-[#F5F5F2] dark:focus:border-[#9e1c3f]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-[#B8BEC8]">
                  Department
                </label>
                <input
                  type="text"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full rounded-md border border-slate-300 p-2 text-sm focus:outline-none dark:border-[#303640] dark:bg-[#1D2229] dark:text-[#F5F5F2] dark:focus:border-[#9e1c3f]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-[#B8BEC8]">
                  Photo URL
                </label>
                <input
                  type="text"
                  value={formData.photo_url}
                  onChange={(e) => setFormData({ ...formData, photo_url: e.target.value })}
                  className="w-full rounded-md border border-slate-300 p-2 text-sm focus:outline-none dark:border-[#303640] dark:bg-[#1D2229] dark:text-[#F5F5F2] dark:focus:border-[#9e1c3f]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-[#B8BEC8]">
                  Short Description
                </label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full rounded-md border border-slate-300 p-2 text-sm focus:outline-none dark:border-[#303640] dark:bg-[#1D2229] dark:text-[#F5F5F2] dark:focus:border-[#9e1c3f]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1 dark:text-[#B8BEC8]">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={formData.display_order}
                    onChange={(e) =>
                      setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })
                    }
                    className="w-full rounded-md border border-slate-300 p-2 text-sm focus:outline-none dark:border-[#303640] dark:bg-[#1D2229] dark:text-[#F5F5F2] dark:focus:border-[#9e1c3f]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 dark:text-[#B8BEC8]">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full rounded-md border border-slate-300 p-2 text-sm focus:outline-none dark:border-[#303640] dark:bg-[#1D2229] dark:text-[#F5F5F2] dark:focus:border-[#9e1c3f]"
                  >
                    <option>Published</option>
                    <option>Unpublished</option>
                  </select>
                </div>
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
