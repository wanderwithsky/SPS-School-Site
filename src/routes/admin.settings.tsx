import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Settings,
  Save,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Sparkles,
  Building,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import { useSiteSettings } from "@/hooks/useCMS";
import { SiteSettings } from "@/lib/cms-types";

export const Route = createFileRoute("/admin/settings")({
  component: AdminSettingsPage,
});

function AdminSettingsPage() {
  const { data: settings, updateSettings, isUpdating } = useSiteSettings();
  const [form, setForm] = useState<SiteSettings>(settings);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (settings) {
      setForm(settings);
    }
  }, [settings]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateSettings(form);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3500);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-white">
            Global Site Settings & Branding
          </h1>
          <p className="text-sm text-slate-400">
            Control school branding, official contact details, and admission status banners
          </p>
        </div>

        {saveSuccess && (
          <div className="flex items-center gap-2 rounded-xl bg-emerald-500/20 border border-emerald-500/30 px-4 py-2 text-xs font-semibold text-emerald-300">
            <CheckCircle2 className="h-4 w-4" />
            <span>Settings saved and updated live!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Admissions Live Control */}
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-emerald-400" />
                Admission Banner & Status
              </h2>
              <p className="text-xs text-slate-400">
                Toggle the admissions open banner on the top bar and apply buttons
              </p>
            </div>
            <button
              type="button"
              onClick={() => setForm({ ...form, admissions_open: !form.admissions_open })}
              className="flex items-center gap-2 text-sm font-bold text-white"
            >
              {form.admissions_open ? (
                <>
                  <ToggleRight className="h-7 w-7 text-emerald-400" />
                  <span className="text-emerald-400">Admissions OPEN</span>
                </>
              ) : (
                <>
                  <ToggleLeft className="h-7 w-7 text-slate-600" />
                  <span className="text-slate-500">Admissions CLOSED</span>
                </>
              )}
            </button>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Admission Banner Text
            </label>
            <input
              type="text"
              value={form.admission_banner_text || ""}
              onChange={(e) => setForm({ ...form, admission_banner_text: e.target.value })}
              className="mt-1.5 w-full rounded-xl border border-slate-800 bg-slate-900 p-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none"
            />
          </div>
        </div>

        {/* General Info */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 space-y-4">
          <h2 className="font-serif text-lg font-bold text-white border-b border-slate-800 pb-3">
            School Identity
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Full School Name
              </label>
              <input
                type="text"
                required
                value={form.school_name || ""}
                onChange={(e) => setForm({ ...form, school_name: e.target.value })}
                className="mt-1.5 w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Short Name / Acronym
              </label>
              <input
                type="text"
                required
                value={form.short_name || ""}
                onChange={(e) => setForm({ ...form, short_name: e.target.value })}
                className="mt-1.5 w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                School Motto / Tagline
              </label>
              <input
                type="text"
                value={form.motto || ""}
                onChange={(e) => setForm({ ...form, motto: e.target.value })}
                className="mt-1.5 w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Affiliation Badge Text
              </label>
              <input
                type="text"
                value={form.affiliation_text || ""}
                onChange={(e) => setForm({ ...form, affiliation_text: e.target.value })}
                className="mt-1.5 w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Contact Details */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 space-y-4">
          <h2 className="font-serif text-lg font-bold text-white border-b border-slate-800 pb-3">
            Contact & Address Details
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Primary Phone
              </label>
              <input
                type="text"
                value={form.phones?.[0] || ""}
                onChange={(e) => {
                  const p = [...(form.phones || [])];
                  p[0] = e.target.value;
                  setForm({ ...form, phones: p });
                }}
                className="mt-1.5 w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Secondary Phone
              </label>
              <input
                type="text"
                value={form.phones?.[1] || ""}
                onChange={(e) => {
                  const p = [...(form.phones || [])];
                  p[1] = e.target.value;
                  setForm({ ...form, phones: p });
                }}
                className="mt-1.5 w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                WhatsApp Number
              </label>
              <input
                type="text"
                value={form.whatsapp || ""}
                onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                className="mt-1.5 w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Official Email
            </label>
            <input
              type="email"
              value={form.email || ""}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="mt-1.5 w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Address Line 1
              </label>
              <input
                type="text"
                value={form.address_line1 || ""}
                onChange={(e) => setForm({ ...form, address_line1: e.target.value })}
                className="mt-1.5 w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Address Line 2
              </label>
              <input
                type="text"
                value={form.address_line2 || ""}
                onChange={(e) => setForm({ ...form, address_line2: e.target.value })}
                className="mt-1.5 w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                City
              </label>
              <input
                type="text"
                value={form.city || ""}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                className="mt-1.5 w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                State
              </label>
              <input
                type="text"
                value={form.state || ""}
                onChange={(e) => setForm({ ...form, state: e.target.value })}
                className="mt-1.5 w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Pincode
              </label>
              <input
                type="text"
                value={form.pincode || ""}
                onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                className="mt-1.5 w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-end">
          <button
            type="submit"
            disabled={isUpdating}
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-900/40 hover:bg-emerald-500 transition-all disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            <span>{isUpdating ? "Saving Settings..." : "Save Settings in Real-Time"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
