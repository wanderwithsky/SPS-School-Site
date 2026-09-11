import { createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Plus, Edit2, Trash2, X } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/notices")({
  component: AdminNotices,
});

function AdminNotices() {
  const [notices, setNotices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    description: "",
    document_url: "",
    publish_date: "",
    status: "Draft",
  });

  useEffect(() => {
    loadNotices();
  }, []);

  async function loadNotices() {
    setLoading(true);
    const { data, error } = await supabase
      .from("notices")
      .select("*")
      .order("date", { ascending: false });
    if (!error && data) setNotices(data);
    setLoading(false);
  }

  function openNew() {
    setEditingId(null);
    setFormData({
      title: "",
      date: "",
      description: "",
      document_url: "",
      publish_date: "",
      status: "Draft",
    });
    setIsModalOpen(true);
  }

  function openEdit(notice: any) {
    setEditingId(notice.id);
    setFormData({
      title: notice.title,
      date: notice.date,
      description: notice.description || "",
      document_url: notice.document_url || "",
      publish_date: notice.publish_date || "",
      status: notice.status || "Draft",
    });
    setIsModalOpen(true);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this notice?")) return;
    const { error } = await supabase.from("notices").delete().eq("id", id);
    if (!error) {
      toast.success("Deleted");
      loadNotices();
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload = {
      ...formData,
      publish_date: formData.publish_date || null,
    };

    let error;
    if (editingId) {
      const { error: err } = await supabase.from("notices").update(payload).eq("id", editingId);
      error = err;
    } else {
      const { error: err } = await supabase.from("notices").insert([payload]);
      error = err;
    }

    if (error) {
      toast.error("Error saving notice: " + error.message);
    } else {
      toast.success("Saved successfully");
      setIsModalOpen(false);
      loadNotices();
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-[#F5F5F2]">Notices</h1>
        <button
          onClick={openNew}
          className="flex items-center gap-2 rounded-lg bg-[#9e1c3f] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#801733]"
        >
          <Plus className="size-4" /> Add Notice
        </button>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden dark:border-[#303640] dark:bg-[#181C22]">
        {loading ? (
          <div className="p-8 text-center text-slate-500 dark:text-[#858D99]">Loading...</div>
        ) : notices.length === 0 ? (
          <div className="p-8 text-center text-slate-500 dark:text-[#858D99]">
            No published notices.
          </div>
        ) : (
          <table className="w-full text-left text-sm text-slate-600 dark:text-[#B8BEC8]">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500 border-b border-slate-200 dark:bg-[#1D2229] dark:text-[#858D99] dark:border-[#303640]">
              <tr>
                <th className="px-6 py-3">Title</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-[#303640]">
              {notices.map((notice) => (
                <tr key={notice.id} className="hover:bg-slate-50 dark:hover:bg-[#1D2229]">
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-[#F5F5F2]">
                    {notice.title}
                  </td>
                  <td className="px-6 py-4">{notice.date}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${notice.status === "Published" ? "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-slate-100 text-slate-700 dark:bg-[#1D2229] dark:text-[#858D99]"}`}
                    >
                      {notice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => openEdit(notice)}
                      className="p-2 text-slate-400 hover:text-[#9e1c3f] dark:text-[#858D99] dark:hover:text-red-400"
                    >
                      <Edit2 className="size-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(notice.id)}
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
                {editingId ? "Edit Notice" : "New Notice"}
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
                    Publish Date
                  </label>
                  <input
                    type="date"
                    value={formData.publish_date}
                    onChange={(e) => setFormData({ ...formData, publish_date: e.target.value })}
                    className="w-full rounded-md border border-slate-300 p-2 text-sm focus:outline-none dark:border-[#303640] dark:bg-[#1D2229] dark:text-[#F5F5F2] dark:focus:border-[#9e1c3f]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-[#B8BEC8]">
                  Document URL (PDF)
                </label>
                <input
                  type="text"
                  value={formData.document_url}
                  onChange={(e) => setFormData({ ...formData, document_url: e.target.value })}
                  className="w-full rounded-md border border-slate-300 p-2 text-sm focus:outline-none dark:border-[#303640] dark:bg-[#1D2229] dark:text-[#F5F5F2] dark:focus:border-[#9e1c3f]"
                />
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
                  <option>Draft</option>
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
