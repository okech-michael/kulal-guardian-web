import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, LogOut, Mail, Phone, MapPin, Calendar } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin · Wazee wa Mazingira" }, { name: "robots", content: "noindex" }] }),
  component: Admin,
  ssr: false,
});

type Registration = {
  id: string;
  full_name: string;
  gender: string;
  date_of_birth: string;
  phone_number: string;
  email: string;
  ward: string;
  village: string;
  education_level: string;
  interests: string;
  motivation: string;
  created_at: string;
};

function Admin() {
  const [session, setSession] = useState<{ user: { email?: string; id: string } } | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [rows, setRows] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session as never);
      setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s as never));
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) { setIsAdmin(null); return; }
    (async () => {
      const { data } = await supabase.from("user_roles").select("role").eq("user_id", session.user.id);
      const admin = !!data?.some((r) => r.role === "admin");
      setIsAdmin(admin);
      if (admin) {
        const { data: regs, error } = await supabase.from("youth_registrations").select("*").order("created_at", { ascending: false });
        if (error) toast.error(error.message);
        else setRows((regs as Registration[]) ?? []);
      }
    })();
  }, [session]);

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) toast.error(error.message);
  };

  const signUp = async () => {
    if (!email || !password) { toast.error("Enter email & password first"); return; }
    setBusy(true);
    const { error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: window.location.origin + "/admin" } });
    setBusy(false);
    if (error) toast.error(error.message);
    else toast.success("Account created. An existing admin must grant you the 'admin' role.");
  };

  const signOut = async () => { await supabase.auth.signOut(); setRows([]); };

  if (loading) return <Centered><Loader2 className="h-6 w-6 animate-spin" /></Centered>;

  if (!session) {
    return (
      <Centered>
        <form onSubmit={signIn} className="w-full max-w-sm rounded-3xl border border-border bg-card p-8 shadow-card">
          <h1 className="font-display text-2xl">Admin sign in</h1>
          <p className="mt-1 text-sm text-muted-foreground">View youth registrations.</p>
          <div className="mt-6 space-y-4">
            <input type="email" required placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30" />
            <input type="password" required placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30" />
          </div>
          <button disabled={busy} className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-60">
            {busy ? "Signing in..." : "Sign in"}
          </button>
          <button type="button" onClick={signUp} disabled={busy} className="mt-3 w-full text-xs text-muted-foreground hover:text-foreground">
            Create new account
          </button>
          <Toaster richColors position="top-center" />
        </form>
      </Centered>
    );
  }

  if (isAdmin === null) return <Centered><Loader2 className="h-6 w-6 animate-spin" /></Centered>;

  if (!isAdmin) {
    return (
      <Centered>
        <div className="max-w-md rounded-3xl border border-border bg-card p-8 text-center shadow-card">
          <h1 className="font-display text-2xl">No admin access</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Your account ({session.user.email}) does not have the admin role yet.
            Ask an existing admin to grant access by inserting a row into <code>user_roles</code>
            with your user id and the role <code>admin</code>.
          </p>
          <button onClick={signOut} className="mt-6 inline-flex items-center gap-2 rounded-full border border-border px-5 py-2 text-sm hover:bg-muted">
            <LogOut className="h-4 w-4" /> Sign out
          </button>
          <Toaster richColors position="top-center" />
        </div>
      </Centered>
    );
  }

  return (
    <div className="min-h-screen bg-muted/40">
      <header className="border-b border-border bg-background">
        <div className="container-x flex items-center justify-between py-5">
          <div>
            <h1 className="font-display text-2xl">Youth Registrations</h1>
            <p className="text-sm text-muted-foreground">{rows.length} total submissions</p>
          </div>
          <button onClick={signOut} className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm hover:bg-muted">
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </header>

      <div className="container-x py-10">
        {rows.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-border bg-card p-16 text-center text-muted-foreground">
            No registrations yet.
          </div>
        ) : (
          <div className="grid gap-4">
            {rows.map((r) => (
              <article key={r.id} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <header className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="font-display text-xl">{r.full_name}</h2>
                    <p className="text-xs text-muted-foreground">
                      {r.gender} · {r.education_level} · DOB {r.date_of_birth}
                    </p>
                  </div>
                  <time className="text-xs text-muted-foreground">{new Date(r.created_at).toLocaleString()}</time>
                </header>
                <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                  <Row icon={Mail}>{r.email}</Row>
                  <Row icon={Phone}>{r.phone_number}</Row>
                  <Row icon={MapPin}>{r.village}, {r.ward}</Row>
                  <Row icon={Calendar}>Interests: {r.interests}</Row>
                </div>
                <p className="mt-4 rounded-xl bg-muted p-4 text-sm leading-relaxed">{r.motivation}</p>
              </article>
            ))}
          </div>
        )}
      </div>
      <Toaster richColors position="top-center" />
    </div>
  );
}

function Centered({ children }: { children: React.ReactNode }) {
  return <div className="grid min-h-screen place-items-center bg-muted/40 px-4">{children}</div>;
}
function Row({ icon: Icon, children }: { icon: typeof Mail; children: React.ReactNode }) {
  return <div className="flex items-start gap-2"><Icon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" /><span className="min-w-0 break-words">{children}</span></div>;
}
