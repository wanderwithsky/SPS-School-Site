import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ReceiptText,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  X,
  Sparkles,
  IndianRupee,
  Calendar,
  AlertCircle,
} from "lucide-react";
import { useFeeStructureCMS } from "@/hooks/useCMS";
import { FeeTierItem } from "@/lib/cms-types";

export const Route = createFileRoute("/admin/fees")({
  component: AdminFeesPage,
});

function AdminFeesPage() {
  const { feeTiers, addFeeTier, updateFeeTier, deleteFeeTier, isSaving } = useFeeStructureCMS();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<FeeTierItem | null>(null);

  const [form, setForm] = useState<Omit<FeeTierItem, "id">>({
    category: "Primary Wing",
    class_name: "Class I to Class V",
    admission_fee: "₹ 6,500",
    tuition_fee: "₹ 2,200 / month",
    annual_charges: "₹ 4,200 / year",
    term_details: "Payable quarterly",
    notes: "",
    order_index: feeTiers.length + 1,
  });

  const openAddModal = () => {
    setEditingItem(null);
    setForm({
      category: "Primary Wing",
      class_name: "",
      admission_fee: "₹ ",
      tuition_fee: "₹  / month",
      annual_charges: "₹  / year",
      term_details: "Payable quarterly",
      notes: "",
      order_index: feeTiers.length + 1,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item: FeeTierItem) => {
    setEditingItem(item);
    setForm({
      category: item.category,
      class_name: item.class_name,
      admission_fee: item.admission_fee,
      tuition_fee: item.tuition_fee,
      annual_charges: item.annual_charges,
      term_details: item.term_details || "",
      notes: item.notes || "",
      order_index: item.order_index,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.class_name || !form.tuition_fee) return;

    if (editingItem) {
      await updateFeeTier({ id: editingItem.id, updates: form });
    } else {
      await addFeeTier(form);
    }
    setIsModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to remove this fee tier?")) {
      await deleteFeeTier(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-white">Fee Structure Manager</h1>
          <p className="text-sm text-slate-400">
            Configure tuition fees, admission charges, and annual schedules for all classes
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-900/40 hover:bg-emerald-500 transition-all"
        >
          <Plus className="h-4 w-4" />
          Add Fee Tier
        </button>
      </div>

      {/* Fee Tiers Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/90 shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="border-b border-slate-800 bg-slate-900/60 text-xs uppercase tracking-wider text-slate-400">
              <tr>
                <th className="px-5 py-3.5 font-semibold">Wing / Category</th>
                <th className="px-5 py-3.5 font-semibold">Classes</th>
                <th className="px-5 py-3.5 font-semibold">Admission Fee</th>
                <th className="px-5 py-3.5 font-semibold">Tuition Fee</th>
                <th className="px-5 py-3.5 font-semibold">Annual Charges</th>
                <th className="px-5 py-3.5 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {feeTiers.map((tier) => (
                <tr key={tier.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="px-5 py-4 font-semibold text-emerald-400">{tier.category}</td>
                  <td className="px-5 py-4 font-medium text-white">
                    {tier.class_name}
                    {tier.notes && <p className="text-xs text-slate-400 mt-0.5">{tier.notes}</p>}
                  </td>
                  <td className="px-5 py-4 text-slate-200">{tier.admission_fee}</td>
                  <td className="px-5 py-4 font-bold text-white">{tier.tuition_fee}</td>
                  <td className="px-5 py-4 text-slate-300">{tier.annual_charges}</td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => openEditModal(tier)}
                        className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"
                        title="Edit Fee"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(tier.id)}
                        className="rounded-lg p-1.5 text-slate-400 hover:bg-red-500/10 hover:text-red-400"
                        title="Delete Tier"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="font-serif text-lg font-bold text-white">
                {editingItem ? "Edit Fee Tier" : "Add New Fee Tier"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-300">
                    Category / Wing *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    placeholder="e.g. Primary Wing"
                    className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-300">
                    Class Range *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.class_name}
                    onChange={(e) => setForm({ ...form, class_name: e.target.value })}
                    placeholder="e.g. Class I to Class V"
                    className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-300">
                    Admission Fee
                  </label>
                  <input
                    type="text"
                    value={form.admission_fee}
                    onChange={(e) => setForm({ ...form, admission_fee: e.target.value })}
                    placeholder="₹ 6,500"
                    className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-300">
                    Tuition Fee *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.tuition_fee}
                    onChange={(e) => setForm({ ...form, tuition_fee: e.target.value })}
                    placeholder="₹ 2,200 / mo"
                    className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-300">
                    Annual Charges
                  </label>
                  <input
                    type="text"
                    value={form.annual_charges}
                    onChange={(e) => setForm({ ...form, annual_charges: e.target.value })}
                    placeholder="₹ 4,200 / yr"
                    className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300">
                  Payment Schedule / Terms
                </label>
                <input
                  type="text"
                  value={form.term_details || ""}
                  onChange={(e) => setForm({ ...form, term_details: e.target.value })}
                  placeholder="e.g. Payable quarterly by 10th of every quarter"
                  className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300">
                  Additional Inclusions / Notes
                </label>
                <input
                  type="text"
                  value={form.notes || ""}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  placeholder="e.g. Covers smart classes, computer lab, sports and library"
                  className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 border-t border-slate-800 pt-4">
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
                  {isSaving ? "Saving..." : editingItem ? "Update Tier" : "Add Tier"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
