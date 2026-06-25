import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { submitYouthRegistration } from "@/lib/youth.functions";
import { Reveal } from "./Reveal";
import { CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";

const educationLevels = ["Primary", "Secondary", "Certificate", "Diploma", "Undergraduate", "Postgraduate", "Other"];
const genders = ["Female", "Male", "Other", "Prefer not to say"] as const;

interface FormState {
  full_name: string;
  gender: typeof genders[number] | "";
  date_of_birth: string;
  phone_number: string;
  email: string;
  ward: string;
  village: string;
  education_level: string;
  interests: string;
  motivation: string;
}

const initial: FormState = {
  full_name: "", gender: "", date_of_birth: "", phone_number: "", email: "",
  ward: "", village: "", education_level: "", interests: "", motivation: "",
};

export function Register() {
  const [form, setForm] = useState<FormState>(initial);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const submit = useServerFn(submitYouthRegistration);

  const update = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.gender) {
      toast.error("Please select a gender option.");
      return;
    }
    setSubmitting(true);
    try {
      await submit({ data: form as Required<FormState> });
      setDone(true);
      toast.success("Registration received. Karibu sana!");
      setForm(initial);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Submission failed.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="register" className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/90 py-24 text-primary-foreground sm:py-32">
      <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-primary-glow/20 blur-3xl" />

      <div className="container-x relative grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Reveal>
            <span className="site-section-label">
              Youth Registration Portal
            </span>
            <h2 className="site-section-title text-white">
              Become a steward of Mount Kulal.
            </h2>
            <p className="mt-6 text-[1.05rem] leading-[1.8] text-white/85 sm:text-[1.16rem]">
              Join hundreds of young people from the wards and villages of Marsabit
              shaping the future of conservation in northern Kenya. Training,
              mentorship and a real role in protecting our land await.
            </p>
            <ul className="mt-8 space-y-3 text-[1rem] text-white/85">
              {["Field training in forest restoration", "Leadership & community organising", "Mentorship from conservation practitioners", "Stipend-supported field deployments"].map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal delay={0.1}>
            <div className="rounded-3xl bg-card p-7 text-foreground shadow-elegant sm:p-9">
              {done ? (
                <div className="grid place-items-center py-16 text-center">
                  <CheckCircle2 className="h-16 w-16 text-accent" strokeWidth={1.5} />
                  <h3 className="mt-6 font-display text-[1.8rem] sm:text-[2.2rem]">Karibu sana!</h3>
                  <p className="mt-3 max-w-md site-card-copy">
                    Thank you for registering. Our youth coordinator will reach out
                    to you at the contact details you provided.
                  </p>
                  <button
                    onClick={() => setDone(false)}
                    className="mt-8 rounded-full bg-primary px-6 py-3 text-[0.98rem] font-semibold text-primary-foreground hover:bg-primary/90"
                  >
                    Submit another registration
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
                  <Field label="Full Name" className="sm:col-span-2">
                    <input required minLength={2} maxLength={120} value={form.full_name}
                      onChange={(e) => update("full_name", e.target.value)} className={inputCls} />
                  </Field>
                  <Field label="Gender">
                    <select required value={form.gender}
                      onChange={(e) => update("gender", e.target.value as FormState["gender"])} className={inputCls}>
                      <option value="">Select...</option>
                      {genders.map((g) => <option key={g}>{g}</option>)}
                    </select>
                  </Field>
                  <Field label="Date of Birth">
                    <input type="date" required value={form.date_of_birth}
                      onChange={(e) => update("date_of_birth", e.target.value)} className={inputCls} />
                  </Field>
                  <Field label="Phone Number">
                    <input required type="tel" maxLength={25} value={form.phone_number}
                      onChange={(e) => update("phone_number", e.target.value)} className={inputCls} />
                  </Field>
                  <Field label="Email Address">
                    <input required type="email" maxLength={255} value={form.email}
                      onChange={(e) => update("email", e.target.value)} className={inputCls} />
                  </Field>
                  <Field label="Ward">
                    <input required maxLength={80} value={form.ward}
                      onChange={(e) => update("ward", e.target.value)} className={inputCls} />
                  </Field>
                  <Field label="Village">
                    <input required maxLength={80} value={form.village}
                      onChange={(e) => update("village", e.target.value)} className={inputCls} />
                  </Field>
                  <Field label="Education Level" className="sm:col-span-2">
                    <select required value={form.education_level}
                      onChange={(e) => update("education_level", e.target.value)} className={inputCls}>
                      <option value="">Select...</option>
                      {educationLevels.map((l) => <option key={l}>{l}</option>)}
                    </select>
                  </Field>
                  <Field label="Areas of Interest" className="sm:col-span-2" hint="e.g. tree planting, biodiversity, education, water">
                    <input required maxLength={500} value={form.interests}
                      onChange={(e) => update("interests", e.target.value)} className={inputCls} />
                  </Field>
                  <Field label="Motivation Statement" className="sm:col-span-2" hint="Tell us why you want to join (10&ndash;1500 characters)">
                    <textarea required minLength={10} maxLength={1500} rows={5} value={form.motivation}
                      onChange={(e) => update("motivation", e.target.value)} className={`${inputCls} resize-none`} />
                  </Field>

                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.8 text-[0.98rem] font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60 sm:w-auto"
                    >
                      {submitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Submitting...</> : "Submit Registration"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const inputCls = "site-form-input";

function Field({ label, children, hint, className }: { label: string; children: React.ReactNode; hint?: string; className?: string }) {
  return (
    <label className={`block ${className ?? ""}`}>
      <span className="site-form-label">{label}</span>
      {children}
      {hint && <span className="site-form-hint" dangerouslySetInnerHTML={{ __html: hint }} />}
    </label>
  );
}
