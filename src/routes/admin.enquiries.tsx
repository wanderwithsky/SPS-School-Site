import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  MailCheck,
  Search,
  Filter,
  Download,
  Trash2,
  Phone,
  Mail,
  Calendar,
  User,
  GraduationCap,
  MapPin,
  MessageSquare,
  CheckCircle2,
  Clock,
  XCircle,
  Eye,
  X,
} from "lucide-react";
import { useAdmissionEnquiriesCMS } from "@/hooks/useCMS";
import { AdmissionEnquiryItem } from "@/lib/cms-types";

export const Route = createFileRoute("/admin/enquiries")({
  component: AdminEnquiriesPage,
});

function AdminEnquiriesPage() {
  const { enquiries, updateStatus, deleteEnquiry } = useAdmissionEnquiriesCMS();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [classFilter, setClassFilter] = useState<string>("all");
  const [selectedEnquiry, setSelectedEnquiry] = useState<AdmissionEnquiryItem | null>(null);

  // Filter enquiries
  const filtered = enquiries.filter((item) => {
    const matchesSearch =
      item.student_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.parent_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.mobile.includes(searchTerm) ||
      (item.email && item.email.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    const matchesClass = classFilter === "all" || item.class_applying_for === classFilter;

    return matchesSearch && matchesStatus && matchesClass;
  });

  const uniqueClasses = Array.from(new Set(enquiries.map((e) => e.class_applying_for))).filter(
    Boolean,
  );

  const handleStatusChange = async (id: string, newStatus: AdmissionEnquiryItem["status"]) => {
    await updateStatus({ id, status: newStatus });
    if (selectedEnquiry && selectedEnquiry.id === id) {
      setSelectedEnquiry({ ...selectedEnquiry, status: newStatus });
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this enquiry?")) {
      await deleteEnquiry(id);
      if (selectedEnquiry && selectedEnquiry.id === id) {
        setSelectedEnquiry(null);
      }
    }
  };

  const exportCSV = () => {
    if (filtered.length === 0) return;
    const headers = ["Student Name,DOB,Class,Parent Name,Mobile,Email,Locality,Status,Date"];
    const rows = filtered.map(
      (e) =>
        `"${e.student_name}","${e.date_of_birth || ""}","${e.class_applying_for}","${e.parent_name}","${e.mobile}","${e.email || ""}","${e.locality || ""}","${e.status}","${new Date(e.created_at).toLocaleDateString()}"`,
    );
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `sps_admission_enquiries_${new Date().toISOString().slice(0, 10)}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusBadge = (status: AdmissionEnquiryItem["status"]) => {
    switch (status) {
      case "new":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-xs font-semibold text-emerald-400 border border-emerald-500/30">
            New
          </span>
        );
      case "contacted":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/20 px-2.5 py-0.5 text-xs font-semibold text-blue-400 border border-blue-500/30">
            Contacted
          </span>
        );
      case "follow_up":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/20 px-2.5 py-0.5 text-xs font-semibold text-amber-400 border border-amber-500/30">
            Follow Up
          </span>
        );
      case "visited":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-purple-500/20 px-2.5 py-0.5 text-xs font-semibold text-purple-400 border border-purple-500/30">
            Campus Visited
          </span>
        );
      case "closed":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-800 px-2.5 py-0.5 text-xs font-semibold text-slate-400">
            Closed
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-white">Admission Enquiries</h1>
          <p className="text-sm text-slate-400">
            Real-time prospective student registrations and lead follow-ups
          </p>
        </div>
        <button
          onClick={exportCSV}
          disabled={filtered.length === 0}
          className="inline-flex items-center gap-2 rounded-xl bg-slate-800 px-4 py-2 text-sm font-semibold text-white border border-slate-700 hover:bg-slate-750 transition-all disabled:opacity-50"
        >
          <Download className="h-4 w-4 text-emerald-400" />
          Export to CSV
        </button>
      </div>

      {/* Filter Bar */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by student, parent, phone..."
            className="w-full rounded-xl border border-slate-800 bg-slate-900 py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-slate-500 shrink-0" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full rounded-xl border border-slate-800 bg-slate-900 py-2.5 px-3 text-sm text-white focus:border-emerald-500 focus:outline-none"
          >
            <option value="all">All Statuses ({enquiries.length})</option>
            <option value="new">New ({enquiries.filter((e) => e.status === "new").length})</option>
            <option value="contacted">
              Contacted ({enquiries.filter((e) => e.status === "contacted").length})
            </option>
            <option value="follow_up">Follow Up</option>
            <option value="visited">Campus Visited</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        {/* Class Filter */}
        <div>
          <select
            value={classFilter}
            onChange={(e) => setClassFilter(e.target.value)}
            className="w-full rounded-xl border border-slate-800 bg-slate-900 py-2.5 px-3 text-sm text-white focus:border-emerald-500 focus:outline-none"
          >
            <option value="all">All Classes</option>
            {uniqueClasses.map((cls) => (
              <option key={cls} value={cls}>
                {cls}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Enquiries Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/90 shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="border-b border-slate-800 bg-slate-900/60 text-xs uppercase tracking-wider text-slate-400">
              <tr>
                <th className="px-5 py-3.5 font-semibold">Student & Class</th>
                <th className="px-5 py-3.5 font-semibold">Parent Details</th>
                <th className="px-5 py-3.5 font-semibold">Date Submitted</th>
                <th className="px-5 py-3.5 font-semibold">Status</th>
                <th className="px-5 py-3.5 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-sm text-slate-500">
                    No admission enquiries match the selected filters.
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-5 py-4">
                      <div className="font-semibold text-white">{item.student_name}</div>
                      <div className="text-xs text-emerald-400 font-medium mt-0.5">
                        {item.class_applying_for}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="text-slate-200">{item.parent_name}</div>
                      <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                        <a href={`tel:${item.mobile}`} className="hover:text-emerald-400">
                          {item.mobile}
                        </a>
                        {item.email && <span>• {item.email}</span>}
                      </div>
                    </td>
                    <td className="px-5 py-4 text-xs text-slate-400">
                      {new Date(item.created_at).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-5 py-4">
                      <select
                        value={item.status}
                        onChange={(e) =>
                          handleStatusChange(
                            item.id,
                            e.target.value as AdmissionEnquiryItem["status"],
                          )
                        }
                        className="rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1 text-xs font-semibold text-slate-200 focus:border-emerald-500 focus:outline-none"
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="follow_up">Follow Up</option>
                        <option value="visited">Campus Visited</option>
                        <option value="closed">Closed</option>
                      </select>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedEnquiry(item)}
                          className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="rounded-lg p-1.5 text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-colors"
                          title="Delete Enquiry"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="font-serif text-lg font-bold text-white">Enquiry Details</h3>
                <p className="text-xs text-slate-400">
                  Application ID: #{selectedEnquiry.id.slice(0, 8)}
                </p>
              </div>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 space-y-3.5 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-slate-800/60 p-3">
                  <span className="text-[11px] text-slate-400 font-medium uppercase">
                    Student Name
                  </span>
                  <p className="font-semibold text-white mt-0.5">{selectedEnquiry.student_name}</p>
                </div>
                <div className="rounded-xl bg-slate-800/60 p-3">
                  <span className="text-[11px] text-slate-400 font-medium uppercase">
                    Class Applying For
                  </span>
                  <p className="font-semibold text-emerald-400 mt-0.5">
                    {selectedEnquiry.class_applying_for}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-slate-800/60 p-3">
                  <span className="text-[11px] text-slate-400 font-medium uppercase">
                    Parent / Guardian
                  </span>
                  <p className="font-semibold text-white mt-0.5">{selectedEnquiry.parent_name}</p>
                </div>
                <div className="rounded-xl bg-slate-800/60 p-3">
                  <span className="text-[11px] text-slate-400 font-medium uppercase">
                    Contact Phone
                  </span>
                  <p className="font-semibold text-white mt-0.5">
                    <a
                      href={`tel:${selectedEnquiry.mobile}`}
                      className="text-emerald-400 hover:underline"
                    >
                      {selectedEnquiry.mobile}
                    </a>
                  </p>
                </div>
              </div>

              {selectedEnquiry.email && (
                <div className="rounded-xl bg-slate-800/60 p-3">
                  <span className="text-[11px] text-slate-400 font-medium uppercase">
                    Email Address
                  </span>
                  <p className="font-semibold text-white mt-0.5">{selectedEnquiry.email}</p>
                </div>
              )}

              {selectedEnquiry.locality && (
                <div className="rounded-xl bg-slate-800/60 p-3">
                  <span className="text-[11px] text-slate-400 font-medium uppercase">
                    Locality / Address
                  </span>
                  <p className="font-semibold text-white mt-0.5">{selectedEnquiry.locality}</p>
                </div>
              )}

              {selectedEnquiry.message && (
                <div className="rounded-xl bg-slate-800/60 p-3">
                  <span className="text-[11px] text-slate-400 font-medium uppercase">
                    Message / Query
                  </span>
                  <p className="text-slate-300 mt-1 whitespace-pre-wrap leading-relaxed">
                    {selectedEnquiry.message}
                  </p>
                </div>
              )}

              <div className="pt-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">Update Status:</span>
                  <select
                    value={selectedEnquiry.status}
                    onChange={(e) =>
                      handleStatusChange(
                        selectedEnquiry.id,
                        e.target.value as AdmissionEnquiryItem["status"],
                      )
                    }
                    className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-semibold text-white focus:border-emerald-500 focus:outline-none"
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="follow_up">Follow Up</option>
                    <option value="visited">Campus Visited</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>

                <a
                  href={`https://wa.me/91${selectedEnquiry.mobile}?text=${encodeURIComponent(`Hello ${selectedEnquiry.parent_name}, Greetings from Shandilya Public School regarding your admission enquiry for ${selectedEnquiry.student_name}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-500 transition-colors"
                >
                  WhatsApp Parent
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
