import { useState } from "react";
import { CheckCircle2, Loader2, Sparkles } from "lucide-react";
import { z } from "zod";
import { CLASS_OPTIONS } from "@/lib/school";
import { useAdmissionEnquiriesCMS } from "@/hooks/useCMS";

const schema = z.object({
  student_name: z.string().trim().min(2, "Please enter the student's name").max(120),
  date_of_birth: z.string().trim().max(20).optional().or(z.literal("")),
  class_applying_for: z.string().trim().min(1, "Please select a class"),
  parent_name: z.string().trim().min(2, "Please enter the parent/guardian name").max(120),
  mobile: z
    .string()
    .trim()
    .regex(/^[0-9+\s-]{10,15}$/, "Please enter a valid mobile number"),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email")
    .max(255)
    .optional()
    .or(z.literal("")),
  current_school: z.string().trim().max(160).optional().or(z.literal("")),
  locality: z.string().trim().max(160).optional().or(z.literal("")),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
});

const field =
  "mt-1.5 w-full rounded-lg border border-input bg-card px-3.5 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring focus:outline-none";
const labelCls = "block text-xs font-semibold tracking-wide text-foreground uppercase";

interface EnquiryFormProps {
  onSuccess?: () => void;
  compact?: boolean;
}

export function EnquiryForm({ onSuccess, compact = false }: EnquiryFormProps) {
  const { createEnquiry } = useAdmissionEnquiriesCMS();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    const formElement = e.currentTarget;
    const raw = Object.fromEntries(new FormData(formElement).entries());
    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) next[String(issue.path[0])] = issue.message;
      setErrors(next);
      return;
    }

    setSubmitting(true);
    const v = parsed.data;

    try {
      await createEnquiry({
        student_name: v.student_name,
        date_of_birth: v.date_of_birth || undefined,
        class_applying_for: v.class_applying_for,
        parent_name: v.parent_name,
        mobile: v.mobile,
        email: v.email || undefined,
        current_school: v.current_school || undefined,
        locality: v.locality || undefined,
        message: v.message || undefined,
      });

      setDone(true);
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      console.error("Submission error:", err);
      setErrors({
        form: "We couldn't submit your enquiry just now. Please try again or call the school office.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="rounded-2xl border border-border bg-card p-6 text-center sm:p-10 shadow-sm animate-in fade-in zoom-in-95 duration-300">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
          <CheckCircle2 className="size-8" aria-hidden="true" />
        </div>
        <h2 className="mt-4 font-serif text-2xl font-semibold text-foreground">
          Enquiry Received Successfully!
        </h2>
        <p className="mx-auto mt-2.5 max-w-md text-sm leading-relaxed text-muted-foreground">
          Our admissions team has recorded your details and will contact you promptly. You can also
          view and manage this lead in real-time in the admin portal.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setDone(false)}
            className="rounded-full bg-secondary px-5 py-2.5 text-xs font-semibold text-foreground hover:bg-secondary/80 transition-colors"
          >
            Submit Another Enquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      {errors["form"] && (
        <p role="alert" className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
          {errors["form"]}
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="student_name" className={labelCls}>
            Student name *
          </label>
          <input id="student_name" name="student_name" className={field} required />
          <FieldError message={errors["student_name"]} />
        </div>
        <div>
          <label htmlFor="date_of_birth" className={labelCls}>
            Date of birth
          </label>
          <input id="date_of_birth" name="date_of_birth" type="date" className={field} />
          <FieldError message={errors["date_of_birth"]} />
        </div>
        <div>
          <label htmlFor="class_applying_for" className={labelCls}>
            Class applying for *
          </label>
          <select id="class_applying_for" name="class_applying_for" className={field} required>
            <option value="">Select a class</option>
            {CLASS_OPTIONS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <FieldError message={errors["class_applying_for"]} />
        </div>
        <div>
          <label htmlFor="parent_name" className={labelCls}>
            Parent / guardian name *
          </label>
          <input id="parent_name" name="parent_name" className={field} required />
          <FieldError message={errors["parent_name"]} />
        </div>
        <div>
          <label htmlFor="mobile" className={labelCls}>
            Mobile number *
          </label>
          <input id="mobile" name="mobile" inputMode="tel" className={field} required />
          <FieldError message={errors["mobile"]} />
        </div>
        <div>
          <label htmlFor="email" className={labelCls}>
            Email address
          </label>
          <input id="email" name="email" type="email" className={field} />
          <FieldError message={errors["email"]} />
        </div>
        <div>
          <label htmlFor="current_school" className={labelCls}>
            Current school (optional)
          </label>
          <input id="current_school" name="current_school" className={field} />
        </div>
        <div>
          <label htmlFor="locality" className={labelCls}>
            Residential area / locality
          </label>
          <input id="locality" name="locality" className={field} />
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelCls}>
          Message (optional)
        </label>
        <textarea id="message" name="message" rows={4} className={field} />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-bold tracking-[0.12em] text-primary-foreground uppercase transition hover:bg-primary/90 disabled:opacity-60 sm:w-auto"
      >
        {submitting && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
        Submit enquiry
      </button>
      <p className="text-xs text-muted-foreground">
        Fields marked * are required. Your details are used only to respond to your admission
        enquiry.
      </p>
    </form>
  );
}

function FieldError({ message }: { message?: string | undefined }) {
  if (!message) return null;
  return (
    <p role="alert" className="mt-1.5 text-xs text-destructive">
      {message}
    </p>
  );
}
