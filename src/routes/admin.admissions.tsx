import { createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState, useMemo } from "react";
import { format } from "date-fns";
import {
  Search,
  Filter,
  Download,
  Eye,
  Trash2,
  X,
  MessageSquare,
  Edit2,
  Phone,
  Mail,
  MapPin,
  Calendar,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/admissions")({
  component: AdminAdmissions,
});

type Enquiry = any;

const STATUS_OPTIONS = ["new", "contacted", "follow_up", "visited", "closed"];
const CALL_OPTIONS = ["Not Called", "Called"];
const INTEREST_OPTIONS = ["Not Assessed", "Interested", "Maybe", "Not Interested"];
const FOLLOW_UP_OPTIONS = ["Not Sent", "Sent", "Pending", "Completed"];
const ADMISSION_OPTIONS = [
  "Not Admitted",
  "Application In Progress",
  "Admitted",
  "Rejected",
  "Closed",
];
const CLASS_OPTIONS = [
  "Pre-Primary",
  "I",
  "II",
  "III",
  "IV",
  "V",
  "VI",
  "VII",
  "VIII",
  "IX",
  "X",
  "XI",
  "XII",
];

function AdminAdmissions() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Filters
  const [filterClass, setFilterClass] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  // Pagination
  const [page, setPage] = useState(0);
  const limit = 20;

  // Modals
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);

  useEffect(() => {
    loadEnquiries();
  }, [page, filterClass, filterStatus]);

  async function loadEnquiries() {
    setLoading(true);
    try {
      let query = supabase
        .from("admission_enquiries")
        .select("*")
        .eq("is_deleted", false)
        .order("created_at", { ascending: false })
        .range(page * limit, (page + 1) * limit - 1);

      if (filterClass !== "All") {
        query = query.eq("class_applying_for", filterClass);
      }
      if (filterStatus !== "All") {
        query = query.eq("status", filterStatus);
      }

      const { data, error } = await query;
      if (error) throw error;
      setEnquiries(data || []);
    } catch (err: any) {
      toast.error("Failed to load enquiries: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleStatusChange(id: string, field: string, value: string) {
    try {
      const { error } = await supabase
        .from("admission_enquiries")
        .update({ [field]: value })
        .eq("id", id);

      if (error) throw error;

      setEnquiries((prev) => prev.map((e) => (e.id === id ? { ...e, [field]: value } : e)));
      toast.success("Updated");
    } catch (err: any) {
      toast.error("Update failed: " + err.message);
    }
  }

  async function handleSoftDelete(id: string) {
    if (!confirm("Delete this admission enquiry?")) return;
    try {
      const { error } = await supabase
        .from("admission_enquiries")
        .update({ is_deleted: true })
        .eq("id", id);

      if (error) throw error;

      setEnquiries((prev) => prev.filter((e) => e.id !== id));
      setSelectedEnquiry(null);
      toast.success("Enquiry deleted");
    } catch (err: any) {
      toast.error("Deletion failed: " + err.message);
    }
  }

  function exportCSV() {
    if (!enquiries.length) return toast.error("No data to export");

    const headers = [
      "Date",
      "Student Name",
      "Class",
      "Parent",
      "Mobile",
      "Email",
      "Status",
      "Call",
      "Interest",
      "Admission",
      "Source",
    ];
    const rows = enquiries.map((e) => [
      format(new Date(e.created_at), "yyyy-MM-dd"),
      `"${e.student_name}"`,
      `"${e.class_applying_for}"`,
      `"${e.parent_name}"`,
      `"${e.mobile}"`,
      `"${e.email || ""}"`,
      `"${e.status}"`,
      `"${e.call_status}"`,
      `"${e.interest_status}"`,
      `"${e.admission_status}"`,
      `"${e.source}"`,
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `admissions_export_${format(new Date(), "yyyy-MM-dd")}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const filteredEnquiries = useMemo(() => {
    if (!search) return enquiries;
    const lowerSearch = search.toLowerCase();
    return enquiries.filter(
      (e) =>
        e.student_name.toLowerCase().includes(lowerSearch) ||
        e.parent_name.toLowerCase().includes(lowerSearch) ||
        e.mobile.includes(lowerSearch) ||
        (e.email && e.email.toLowerCase().includes(lowerSearch)),
    );
  }, [enquiries, search]);

  return (
    <div className="flex h-[calc(100vh-6rem)] flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-[#F5F5F2]">
          Admissions
        </h1>
        <button
          onClick={exportCSV}
          className="flex items-center gap-2 rounded-lg bg-white border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 dark:bg-[#181C22] dark:border-[#303640] dark:text-[#F5F5F2] dark:hover:bg-[#1D2229]"
        >
          <Download className="size-4" /> Export CSV
        </button>
      </div>

      <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:flex-row md:items-center dark:bg-[#181C22] dark:border-[#303640]">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400 dark:text-[#858D99]" />
          <input
            type="text"
            placeholder="Search student, parent or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-sm focus:border-[#9e1c3f] focus:ring-1 focus:ring-[#9e1c3f] focus:outline-none dark:bg-[#1D2229] dark:border-[#303640] dark:text-[#F5F5F2] dark:focus:border-[#9e1c3f] placeholder:dark:text-[#7D8590]"
          />
        </div>
        <div className="flex gap-4">
          <select
            value={filterClass}
            onChange={(e) => setFilterClass(e.target.value)}
            className="rounded-lg border border-slate-200 bg-slate-50 py-2 px-3 text-sm focus:border-[#9e1c3f] focus:outline-none dark:bg-[#1D2229] dark:border-[#303640] dark:text-[#F5F5F2] dark:focus:border-[#9e1c3f]"
          >
            <option value="All">All Classes</option>
            {CLASS_OPTIONS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="rounded-lg border border-slate-200 bg-slate-50 py-2 px-3 text-sm focus:border-[#9e1c3f] focus:outline-none dark:bg-[#1D2229] dark:border-[#303640] dark:text-[#F5F5F2] dark:focus:border-[#9e1c3f]"
          >
            <option value="All">All Statuses</option>
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Table Area */}
      <div className="flex-1 overflow-auto rounded-xl border border-slate-200 bg-white shadow-sm dark:bg-[#181C22] dark:border-[#303640]">
        {loading ? (
          <div className="flex h-full items-center justify-center">
            <div className="size-8 animate-spin rounded-full border-4 border-slate-200 border-t-[#9e1c3f] dark:border-[#303640] dark:border-t-[#9e1c3f]"></div>
          </div>
        ) : filteredEnquiries.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-slate-500 dark:text-[#858D99]">
            <Users className="mb-4 size-12 opacity-20" />
            <p>No admission enquiries found.</p>
          </div>
        ) : (
          <div className="min-w-[1000px]">
            <table className="w-full text-left text-sm text-slate-600 dark:text-[#B8BEC8]">
              <thead className="sticky top-0 z-10 bg-slate-50 text-xs font-medium text-slate-500 uppercase shadow-sm dark:bg-[#1D2229] dark:text-[#858D99]">
                <tr>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Student</th>
                  <th className="px-6 py-3">Parent / Contact</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Tracking</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white dark:divide-[#303640] dark:bg-[#181C22]">
                {filteredEnquiries.map((enquiry) => (
                  <tr
                    key={enquiry.id}
                    className="transition hover:bg-slate-50 dark:hover:bg-[#1D2229]"
                  >
                    <td className="px-6 py-4 align-top">
                      <div className="font-medium text-slate-900 dark:text-[#F5F5F2]">
                        {format(new Date(enquiry.created_at), "dd MMM yyyy")}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-[#858D99]">
                        {enquiry.source}
                      </div>
                    </td>
                    <td className="px-6 py-4 align-top">
                      <div className="font-bold text-slate-900 dark:text-[#F5F5F2]">
                        {enquiry.student_name}
                      </div>
                      <div className="mt-1 text-xs font-medium text-[#9e1c3f] bg-[#9e1c3f]/10 inline-block px-2 py-0.5 rounded dark:bg-[#9e1c3f]/20 dark:text-red-400">
                        Class {enquiry.class_applying_for}
                      </div>
                    </td>
                    <td className="px-6 py-4 align-top">
                      <div className="font-medium text-slate-700 dark:text-[#B8BEC8]">
                        {enquiry.parent_name}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-[#858D99]">
                        {enquiry.mobile}
                      </div>
                    </td>
                    <td className="px-6 py-4 align-top">
                      <select
                        value={enquiry.status}
                        onChange={(e) => handleStatusChange(enquiry.id, "status", e.target.value)}
                        className="rounded border border-slate-200 bg-slate-50 px-2 py-1 text-xs font-medium focus:border-[#9e1c3f] focus:outline-none dark:border-[#303640] dark:bg-[#1D2229] dark:text-[#F5F5F2] dark:focus:border-[#9e1c3f]"
                      >
                        {STATUS_OPTIONS.map((s) => (
                          <option key={s} value={s}>
                            {s.toUpperCase()}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4 align-top space-y-2">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="w-16 text-slate-400 dark:text-[#858D99]">Call:</span>
                        <select
                          value={enquiry.call_status}
                          onChange={(e) =>
                            handleStatusChange(enquiry.id, "call_status", e.target.value)
                          }
                          className="rounded border border-slate-200 bg-white px-1 py-0.5 focus:outline-none dark:border-[#303640] dark:bg-[#1D2229] dark:text-[#F5F5F2]"
                        >
                          {CALL_OPTIONS.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="w-16 text-slate-400 dark:text-[#858D99]">Interest:</span>
                        <select
                          value={enquiry.interest_status}
                          onChange={(e) =>
                            handleStatusChange(enquiry.id, "interest_status", e.target.value)
                          }
                          className="rounded border border-slate-200 bg-white px-1 py-0.5 focus:outline-none dark:border-[#303640] dark:bg-[#1D2229] dark:text-[#F5F5F2]"
                        >
                          {INTEREST_OPTIONS.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </div>
                    </td>
                    <td className="px-6 py-4 align-top text-right">
                      <button
                        onClick={() => setSelectedEnquiry(enquiry)}
                        className="inline-flex items-center gap-1 rounded bg-[#9e1c3f]/10 px-3 py-1.5 text-xs font-medium text-[#9e1c3f] transition hover:bg-[#9e1c3f]/20 dark:bg-[#9e1c3f]/20 dark:text-red-400 dark:hover:bg-[#9e1c3f]/30"
                      >
                        <Eye className="size-3.5" /> View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500 dark:text-[#858D99]">Showing page {page + 1}</p>
        <div className="flex gap-2">
          <button
            disabled={page === 0}
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-50 disabled:opacity-50 dark:border-[#303640] dark:text-[#F5F5F2] dark:hover:bg-[#1D2229]"
          >
            Previous
          </button>
          <button
            disabled={enquiries.length < limit}
            onClick={() => setPage((p) => p + 1)}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-50 disabled:opacity-50 dark:border-[#303640] dark:text-[#F5F5F2] dark:hover:bg-[#1D2229]"
          >
            Next
          </button>
        </div>
      </div>

      {/* View Enquiry Modal */}
      {selectedEnquiry && (
        <EnquiryModal
          enquiry={selectedEnquiry}
          onClose={() => setSelectedEnquiry(null)}
          onDelete={() => handleSoftDelete(selectedEnquiry.id)}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
}

function EnquiryModal({ enquiry, onClose, onDelete, onStatusChange }: any) {
  const [notes, setNotes] = useState<any[]>([]);
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    supabase
      .from("admission_notes")
      .select("*")
      .eq("admission_enquiry_id", enquiry.id)
      .order("created_at", { ascending: false })
      .then(({ data }) => setNotes(data || []));
  }, [enquiry.id]);

  async function handleAddNote() {
    if (!newNote.trim()) return;
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from("admission_notes")
        .insert({
          admission_enquiry_id: enquiry.id,
          note: newNote.trim(),
          created_by: user?.id,
        })
        .select()
        .single();

      if (error) throw error;
      setNotes([data, ...notes]);
      setNewNote("");
      toast.success("Note added");
    } catch (err: any) {
      toast.error("Failed to add note: " + err.message);
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex justify-end bg-black/40 backdrop-blur-sm">
      <div className="flex h-full w-full max-w-md flex-col bg-white shadow-2xl animate-in slide-in-from-right dark:bg-[#181C22]">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-[#303640]">
          <h2 className="text-lg font-bold text-slate-900 dark:text-[#F5F5F2]">Enquiry Details</h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-slate-100 dark:hover:bg-[#1D2229]"
          >
            <X className="size-5 text-slate-500 dark:text-[#858D99]" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Student Info */}
          <div>
            <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-[#858D99]">
              Student Information
            </h3>
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 space-y-3 dark:border-[#303640] dark:bg-[#1D2229]">
              <div>
                <p className="text-xs text-slate-500 dark:text-[#858D99]">Name</p>
                <p className="font-semibold text-slate-900 dark:text-[#F5F5F2]">
                  {enquiry.student_name}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-slate-500 dark:text-[#858D99]">Class</p>
                  <p className="font-semibold text-slate-900 dark:text-[#F5F5F2]">
                    {enquiry.class_applying_for}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-[#858D99]">DOB</p>
                  <p className="font-medium text-slate-900 dark:text-[#F5F5F2]">
                    {enquiry.date_of_birth || "Not provided"}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-[#858D99]">Current School</p>
                <p className="text-sm font-medium text-slate-900 dark:text-[#F5F5F2]">
                  {enquiry.current_school || "Not provided"}
                </p>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-[#858D99]">
              Parent / Contact
            </h3>
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 space-y-3 text-sm dark:border-[#303640] dark:bg-[#1D2229]">
              <div className="flex items-center gap-3">
                <UserPlus className="size-4 text-slate-400 dark:text-[#858D99]" />
                <span className="font-semibold text-slate-900 dark:text-[#F5F5F2]">
                  {enquiry.parent_name}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="size-4 text-slate-400 dark:text-[#858D99]" />
                <a
                  href={`tel:${enquiry.mobile}`}
                  className="font-medium text-[#9e1c3f] hover:underline dark:text-red-400"
                >
                  {enquiry.mobile}
                </a>
              </div>
              {enquiry.email && (
                <div className="flex items-center gap-3">
                  <Mail className="size-4 text-slate-400 dark:text-[#858D99]" />
                  <a
                    href={`mailto:${enquiry.email}`}
                    className="font-medium text-[#9e1c3f] hover:underline dark:text-red-400"
                  >
                    {enquiry.email}
                  </a>
                </div>
              )}
              {enquiry.locality && (
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-slate-400 dark:text-[#858D99]" />
                  <span className="text-slate-700 dark:text-[#B8BEC8]">{enquiry.locality}</span>
                </div>
              )}
            </div>
          </div>

          {/* Message */}
          {enquiry.message && (
            <div>
              <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-[#858D99]">
                Message
              </h3>
              <div className="rounded-xl border border-amber-100 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-900/50 dark:bg-amber-900/20 dark:text-amber-200">
                "{enquiry.message}"
              </div>
            </div>
          )}

          {/* Lead Tracking */}
          <div>
            <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-[#858D99]">
              Lead Tracking
            </h3>
            <div className="space-y-3 rounded-xl border border-slate-100 p-4 dark:border-[#303640]">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600 dark:text-[#B8BEC8]">Primary Status</span>
                <select
                  value={enquiry.status}
                  onChange={(e) => onStatusChange(enquiry.id, "status", e.target.value)}
                  className="rounded border border-slate-200 px-2 py-1 text-sm font-medium focus:border-[#9e1c3f] focus:outline-none dark:bg-[#1D2229] dark:border-[#303640] dark:text-[#F5F5F2] dark:focus:border-[#9e1c3f]"
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s}>
                      {s.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600 dark:text-[#B8BEC8]">Admission</span>
                <select
                  value={enquiry.admission_status}
                  onChange={(e) => onStatusChange(enquiry.id, "admission_status", e.target.value)}
                  className="rounded border border-slate-200 px-2 py-1 text-sm font-medium focus:border-[#9e1c3f] focus:outline-none dark:bg-[#1D2229] dark:border-[#303640] dark:text-[#F5F5F2] dark:focus:border-[#9e1c3f]"
                >
                  {ADMISSION_OPTIONS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-[#858D99]">
              Private Notes
            </h3>
            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Add a private note..."
                  className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-[#9e1c3f] focus:outline-none dark:bg-[#1D2229] dark:border-[#303640] dark:text-[#F5F5F2] dark:focus:border-[#9e1c3f]"
                />
                <button
                  onClick={handleAddNote}
                  className="rounded-lg bg-[#9e1c3f] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#801733]"
                >
                  Add
                </button>
              </div>
              <div className="space-y-2">
                {notes.map((note) => (
                  <div
                    key={note.id}
                    className="rounded-lg border border-slate-100 bg-slate-50 p-3 text-sm dark:bg-[#1D2229] dark:border-[#303640]"
                  >
                    <p className="text-slate-800 dark:text-[#F5F5F2]">{note.note}</p>
                    <p className="mt-1 text-xs text-slate-400 dark:text-[#858D99]">
                      {format(new Date(note.created_at), "dd MMM yyyy, HH:mm")}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 p-4 dark:border-[#303640]">
          <button
            onClick={onDelete}
            className="flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 dark:hover:bg-red-950/30 dark:text-red-400"
          >
            <Trash2 className="size-4" /> Delete Enquiry
          </button>
        </div>
      </div>
    </div>
  );
}
