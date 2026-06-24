import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, Send } from "lucide-react";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { submitContactMessage } from "@/lib/email";
import { Reveal } from "./Reveal";

export function Contact() {
  const [sending, setSending] = useState(false);
  const submit = useServerFn(submitContactMessage);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    try {
      await submit({ data: form });
      setForm({ name: "", email: "", subject: "", message: "" });
      toast.success("Message received. We'll be in touch shortly.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Unable to send your message right now.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="bg-background py-24 sm:py-32">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
                Get in touch
              </span>
              <h2 className="mt-4 font-display text-4xl text-balance sm:text-5xl">
                Let&rsquo;s build a greener Kulal together.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                Whether you are a partner organisation, donor, journalist, or
                community member, we would love to hear from you.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-8 space-y-5">
                <ContactRow icon={Phone} label="Call us" value="0711 856 795" href="tel:+254711856795" />
                <ContactRow icon={Mail} label="Email" value="infor@wazeewamazingira.org" href="mailto:infor@wazeewamazingira.org" />
                <ContactRow icon={MapPin} label="Find us" value="Mount Kulal area, Marsabit County, Kenya" />
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-8 flex gap-3">
                {[Facebook, Twitter, Instagram, Linkedin].map((I, i) => (
                  <a key={i} href="#" aria-label="Social link"
                    className="grid h-11 w-11 place-items-center rounded-full border border-border bg-card text-foreground/70 transition-colors hover:border-accent hover:text-accent">
                    <I className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-8 overflow-hidden rounded-3xl border border-border shadow-card">
                <iframe
                  title="Mount Kulal map"
                  src="https://www.google.com/maps?q=Mount+Kulal,Marsabit+County,Kenya&output=embed"
                  loading="lazy"
                  className="h-72 w-full"
                />
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <form onSubmit={onSubmit} className="grid gap-5 rounded-3xl border border-border bg-card p-7 shadow-card sm:p-9">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Your Name"><input required maxLength={120} value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className={inputCls} /></Field>
                  <Field label="Email"><input required type="email" maxLength={255} value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} className={inputCls} /></Field>
                </div>
                <Field label="Subject"><input required maxLength={150} value={form.subject} onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))} className={inputCls} /></Field>
                <Field label="Message"><textarea required rows={6} maxLength={2000} value={form.message} onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))} className={`${inputCls} resize-none`} /></Field>
                <button type="submit" disabled={sending}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-60 sm:w-fit">
                  <Send className="h-4 w-4" />
                  {sending ? "Sending..." : "Send Message"}
                </button>
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

const inputCls = "w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none transition-all focus:border-accent focus:ring-2 focus:ring-accent/30";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-foreground/70">{label}</span>
      {children}
    </label>
  );
}

function ContactRow({ icon: Icon, label, value, href }: { icon: typeof Phone; label: string; value: string; href?: string }) {
  const Body = (
    <>
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-secondary text-primary">
        <Icon className="h-5 w-5" />
      </span>
      <div className="min-w-0">
        <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</div>
        <div className="mt-0.5 truncate font-medium">{value}</div>
      </div>
    </>
  );
  return href
    ? <a href={href} className="flex items-center gap-4 rounded-2xl p-3 -m-3 transition-colors hover:bg-muted">{Body}</a>
    : <div className="flex items-center gap-4 p-3 -m-3">{Body}</div>;
}
