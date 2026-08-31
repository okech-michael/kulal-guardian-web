import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  ArrowUpRight,
  BarChart3,
  Building2,
  CalendarDays,
  CreditCard,
  Database,
  DollarSign,
  FileText,
  LayoutDashboard,
  Loader2,
  LogOut,
  Mail,
  MapPin,
  Menu,
  Phone,
  Search,
  ShieldCheck,
  TrendingUp,
  UserRound,
  Users,
  X,
} from "lucide-react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { toast } from "sonner";
import type { Tables } from "@/integrations/supabase/types";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin · Wazee wa Mazingira" }, { name: "robots", content: "noindex" }] }),
  component: AdminDashboard,
  ssr: false,
});

type SessionUser = { user: { email?: string; id: string } };
type SectionKey = "overview" | "registrations" | "donations" | "donors" | "roles" | "database";
type RegistrationRow = Tables<"youth_registrations">;
type DonationRow = Tables<"donations">;
type DonorRow = Tables<"donors">;
type UserRoleRow = Tables<"user_roles">;
type DetailRow = Record<string, string | number | boolean | null | undefined>;

type OverviewStats = {
  registrationsTotal: number;
  donationsTotal: number;
  donorsTotal: number;
  adminRolesTotal: number;
  recentRegistrations: RegistrationRow[];
  recentDonations: DonationRow[];
  registrationTrend: { label: string; count: number }[];
  donationStatus: { name: string; value: number }[];
};

const pageSize = 8;

const navItems: { id: SectionKey; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "registrations", label: "Registrations", icon: FileText },
  { id: "donations", label: "Donations", icon: CreditCard },
  { id: "donors", label: "Donors", icon: Users },
  { id: "roles", label: "Access", icon: ShieldCheck },
  { id: "database", label: "Database", icon: Database },
];

function AdminDashboard() {
  const [session, setSession] = useState<SessionUser | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionKey>("overview");
  const [detailRow, setDetailRow] = useState<{ table: string; data: DetailRow } | null>(null);

  const [overview, setOverview] = useState<OverviewStats>({
    registrationsTotal: 0,
    donationsTotal: 0,
    donorsTotal: 0,
    adminRolesTotal: 0,
    recentRegistrations: [],
    recentDonations: [],
    registrationTrend: [],
    donationStatus: [],
  });
  const [overviewLoading, setOverviewLoading] = useState(true);

  const [registrations, setRegistrations] = useState<RegistrationRow[]>([]);
  const [registrationsTotal, setRegistrationsTotal] = useState(0);
  const [registrationPage, setRegistrationPage] = useState(1);
  const [registrationSearch, setRegistrationSearch] = useState("");
  const [registrationLoading, setRegistrationLoading] = useState(false);

  const [donations, setDonations] = useState<DonationRow[]>([]);
  const [donationsTotal, setDonationsTotal] = useState(0);
  const [donationPage, setDonationPage] = useState(1);
  const [donationSearch, setDonationSearch] = useState("");
  const [donationLoading, setDonationLoading] = useState(false);

  const [donors, setDonors] = useState<DonorRow[]>([]);
  const [donorsTotal, setDonorsTotal] = useState(0);
  const [donorPage, setDonorPage] = useState(1);
  const [donorSearch, setDonorSearch] = useState("");
  const [donorLoading, setDonorLoading] = useState(false);

  const [roles, setRoles] = useState<UserRoleRow[]>([]);
  const [rolesTotal, setRolesTotal] = useState(0);
  const [rolePage, setRolePage] = useState(1);
  const [roleLoading, setRoleLoading] = useState(false);

  const [databaseTable, setDatabaseTable] = useState<"registrations" | "donations" | "donors" | "roles">("registrations");

  useEffect(() => {
    void supabase.auth.getSession().then(({ data }) => {
      setSession((data.session as SessionUser) ?? null);
      setLoading(false);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession((nextSession as SessionUser) ?? null);
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  const refreshOverview = useCallback(async () => {
    if (!session) return;

    setOverviewLoading(true);
    try {
      const [registrationsQuery, donationsQuery, donorsQuery, rolesQuery, recentRegistrationsQuery] = await Promise.all([
        supabase.from("youth_registrations").select("*", { count: "exact", head: true }),
        supabase.from("donations").select("amount,payment_status", { count: "exact", head: true }),
        supabase.from("donors").select("*", { count: "exact", head: true }),
        supabase.from("user_roles").select("role", { count: "exact", head: true }),
        supabase.from("youth_registrations").select("*").order("created_at", { ascending: false }).limit(5),
      ]);

      if (registrationsQuery.error) throw registrationsQuery.error;
      if (donationsQuery.error) throw donationsQuery.error;
      if (donorsQuery.error) throw donorsQuery.error;
      if (rolesQuery.error) throw rolesQuery.error;
      if (recentRegistrationsQuery.error) throw recentRegistrationsQuery.error;

      const donationRows = await supabase.from("donations").select("amount,payment_status").order("created_at", { ascending: false }).limit(5);
      if (donationRows.error) throw donationRows.error;

      const roleRows = await supabase.from("user_roles").select("role").order("created_at", { ascending: false });
      if (roleRows.error) throw roleRows.error;

      const trend = await supabase.from("youth_registrations").select("created_at").order("created_at", { ascending: true });
      if (trend.error) throw trend.error;

      const totalDonations = (donationRows.data ?? []).reduce((sum, row) => sum + (Number(row.amount) || 0), 0);
      const adminRoles = roleRows.data?.filter((row) => row.role === "admin").length ?? 0;
      const statusMap = new Map<string, number>();
      for (const row of donationRows.data ?? []) {
        const key = row.payment_status ?? "unknown";
        statusMap.set(key, (statusMap.get(key) ?? 0) + 1);
      }

      const trendMap = new Map<string, number>();
      for (const row of trend.data ?? []) {
        const date = new Date(row.created_at);
        const label = date.toLocaleDateString("en-KE", { month: "short", day: "numeric" });
        trendMap.set(label, (trendMap.get(label) ?? 0) + 1);
      }

      setOverview({
        registrationsTotal: registrationsQuery.count ?? 0,
        donationsTotal: totalDonations,
        donorsTotal: donorsQuery.count ?? 0,
        adminRolesTotal: adminRoles,
        recentRegistrations: recentRegistrationsQuery.data ?? [],
        recentDonations: donationRows.data ?? [],
        registrationTrend: Array.from(trendMap.entries()).slice(-7).map(([label, count]) => ({ label, count })),
        donationStatus: Array.from(statusMap.entries()).map(([name, value]) => ({ name, value })),
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to load dashboard data.";
      toast.error(message);
    } finally {
      setOverviewLoading(false);
    }
  }, [session]);

  useEffect(() => {
    if (!session) {
      setIsAdmin(null);
      return;
    }

    let ignore = false;

    const checkAdmin = async () => {
      const { data, error } = await supabase.from("user_roles").select("role").eq("user_id", session.user.id);
      if (ignore) return;

      if (error) {
        toast.error(error.message);
        setIsAdmin(false);
        return;
      }

      const admin = !!data?.some((row) => row.role === "admin");
      setIsAdmin(admin);
      if (admin) {
        void refreshOverview();
      }
    };

    void checkAdmin();
    return () => {
      ignore = true;
    };
  }, [refreshOverview, session]);

  const loadRegistrations = useCallback(async () => {
    setRegistrationLoading(true);
    try {
      let query = supabase
        .from("youth_registrations")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: false })
        .range((registrationPage - 1) * pageSize, registrationPage * pageSize - 1);

      if (registrationSearch.trim()) {
        const term = registrationSearch.trim();
        query = query.or(`full_name.ilike.%${term}%,email.ilike.%${term}%,phone_number.ilike.%${term}%`);
      }

      const { data, count, error } = await query;
      if (error) throw error;
      setRegistrations((data as RegistrationRow[]) ?? []);
      setRegistrationsTotal(count ?? 0);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to load registrations.");
    } finally {
      setRegistrationLoading(false);
    }
  }, [registrationPage, registrationSearch]);

  const loadDonations = useCallback(async () => {
    setDonationLoading(true);
    try {
      let query = supabase
        .from("donations")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: false })
        .range((donationPage - 1) * pageSize, donationPage * pageSize - 1);

      if (donationSearch.trim()) {
        const term = donationSearch.trim();
        query = query.or(`mpesa_phone_number.ilike.%${term}%,transaction_reference.ilike.%${term}%,merchant_request_id.ilike.%${term}%`);
      }

      const { data, count, error } = await query;
      if (error) throw error;
      setDonations((data as DonationRow[]) ?? []);
      setDonationsTotal(count ?? 0);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to load donations.");
    } finally {
      setDonationLoading(false);
    }
  }, [donationPage, donationSearch]);

  const loadDonors = useCallback(async () => {
    setDonorLoading(true);
    try {
      let query = supabase
        .from("donors")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: false })
        .range((donorPage - 1) * pageSize, donorPage * pageSize - 1);

      if (donorSearch.trim()) {
        const term = donorSearch.trim();
        query = query.or(`first_name.ilike.%${term}%,last_name.ilike.%${term}%,email.ilike.%${term}%,phone_number.ilike.%${term}%`);
      }

      const { data, count, error } = await query;
      if (error) throw error;
      setDonors((data as DonorRow[]) ?? []);
      setDonorsTotal(count ?? 0);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to load donors.");
    } finally {
      setDonorLoading(false);
    }
  }, [donorPage, donorSearch]);

  const loadRoles = useCallback(async () => {
    setRoleLoading(true);
    try {
      const { data, count, error } = await supabase
        .from("user_roles")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: false })
        .range((rolePage - 1) * pageSize, rolePage * pageSize - 1);

      if (error) throw error;
      setRoles((data as UserRoleRow[]) ?? []);
      setRolesTotal(count ?? 0);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to load access roles.");
    } finally {
      setRoleLoading(false);
    }
  }, [rolePage]);

  useEffect(() => {
    if (isAdmin) {
      void loadRegistrations();
      void loadDonations();
      void loadDonors();
      void loadRoles();
    }
  }, [isAdmin, loadRegistrations, loadDonations, loadDonors, loadRoles]);

  const signIn = async (event: React.FormEvent) => {
    event.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) toast.error(error.message);
  };

  const signUp = async () => {
    if (!email || !password) {
      toast.error("Enter email and password first.");
      return;
    }

    setBusy(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: window.location.origin + "/admin" },
    });
    setBusy(false);

    if (error) toast.error(error.message);
    else toast.success("Account created. An existing admin must grant you the admin role.");
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setSidebarOpen(false);
    setDetailRow(null);
  };

  const totalRaised = useMemo(() => formatCurrency(overview.donationsTotal), [overview.donationsTotal]);

  if (loading) {
    return <Centered><Loader2 className="h-6 w-6 animate-spin" /></Centered>;
  }

  if (!session) {
    return (
      <Centered>
        <form onSubmit={signIn} className="w-full max-w-sm rounded-3xl border border-border bg-card p-8 shadow-card">
          <h1 className="font-display text-2xl">Admin sign in</h1>
          <p className="mt-1 text-sm text-muted-foreground">Use your project admin account to access the dashboard.</p>
          <div className="mt-6 space-y-4">
            <Input type="email" required placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} />
            <Input type="password" required placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} />
          </div>
          <Button type="submit" className="mt-6 w-full" disabled={busy}>
            {busy ? "Signing in..." : "Sign in"}
          </Button>
          <Button type="button" variant="ghost" className="mt-3 w-full" onClick={signUp} disabled={busy}>
            Create new account
          </Button>
          <Toaster richColors position="top-center" />
        </form>
      </Centered>
    );
  }

  if (isAdmin === null) {
    return <Centered><Loader2 className="h-6 w-6 animate-spin" /></Centered>;
  }

  if (!isAdmin) {
    return (
      <Centered>
        <div className="max-w-lg rounded-3xl border border-border bg-card p-8 text-center shadow-card">
          <h1 className="font-display text-2xl">No admin access</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Your account ({session.user.email}) does not have the admin role yet. Ask an existing admin to grant access by
            inserting a row into <code>user_roles</code> with your user id and the role <code>admin</code>.
          </p>
          <Button onClick={signOut} variant="outline" className="mt-6">
            <LogOut className="h-4 w-4" /> Sign out
          </Button>
          <Toaster richColors position="top-center" />
        </div>
      </Centered>
    );
  }

  return (
    <div className="min-h-screen bg-muted/40 text-foreground">
      <SidebarLayout
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        session={session}
        onSignOut={signOut}
      >
        <div className="flex min-h-screen flex-col">
          <header className="border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-3">
                <Button variant="outline" size="icon" className="md:hidden" onClick={() => setSidebarOpen(true)}>
                  <Menu className="h-4 w-4" />
                </Button>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Admin dashboard</p>
                  <h1 className="font-display text-2xl">{navItems.find((item) => item.id === activeSection)?.label ?? "Overview"}</h1>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="secondary" className="hidden sm:inline-flex">{session.user.email ?? "admin@wazee"}</Badge>
                <Button variant="outline" onClick={signOut}>
                  <LogOut className="h-4 w-4" /> Sign out
                </Button>
              </div>
            </div>
          </header>

          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
            {activeSection === "overview" && (
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  <StatCard icon={FileText} label="Registrations" value={overview.registrationsTotal.toLocaleString()} description="Youth sign-ups" />
                  <StatCard icon={DollarSign} label="Raised" value={totalRaised} description="Total donation amount" />
                  <StatCard icon={Users} label="Donors" value={overview.donorsTotal.toLocaleString()} description="Active supporters" />
                  <StatCard icon={ShieldCheck} label="Admin roles" value={overview.adminRolesTotal.toLocaleString()} description="Authorized staff" />
                </div>

                <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
                  <Card>
                    <CardHeader className="pb-4">
                      <CardTitle className="flex items-center gap-2 text-lg"><TrendingUp className="h-5 w-5" /> Registration trend</CardTitle>
                      <CardDescription>Recent sign-up activity</CardDescription>
                    </CardHeader>
                    <CardContent className="h-72">
                      {overviewLoading ? (
                        <LoadingBox />
                      ) : (
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={overview.registrationTrend}>
                            <defs>
                              <linearGradient id="fillTrend" x1="0" x2="0" y1="0" y2="1">
                                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.4} />
                                <stop offset="95%" stopColor="#22c55e" stopOpacity={0.05} />
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis dataKey="label" tickLine={false} axisLine={false} />
                            <YAxis allowDecimals={false} tickLine={false} axisLine={false} />
                            <Tooltip />
                            <Area type="monotone" dataKey="count" stroke="#16a34a" strokeWidth={3} fill="url(#fillTrend)" />
                          </AreaChart>
                        </ResponsiveContainer>
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-4">
                      <CardTitle className="flex items-center gap-2 text-lg"><BarChart3 className="h-5 w-5" /> Payment status</CardTitle>
                      <CardDescription>Recent donation pipeline</CardDescription>
                    </CardHeader>
                    <CardContent className="h-72">
                      {overviewLoading ? (
                        <LoadingBox />
                      ) : (
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={overview.donationStatus}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis dataKey="name" tickLine={false} axisLine={false} />
                            <YAxis allowDecimals={false} tickLine={false} axisLine={false} />
                            <Tooltip />
                            <Bar dataKey="value" fill="#0f172a" radius={[6, 6, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      )}
                    </CardContent>
                  </Card>
                </div>

                <div className="grid gap-6 xl:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent registrations</CardTitle>
                      <CardDescription>Newest youth applicants</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {(overview.recentRegistrations.length ? overview.recentRegistrations : []).map((item) => (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setDetailRow({ table: "registrations", data: normalizeRecord(item) })}
                            className="flex w-full items-center justify-between rounded-xl border border-border bg-muted/30 px-3 py-2 text-left transition hover:bg-muted/50"
                          >
                            <div>
                              <p className="font-medium">{item.full_name}</p>
                              <p className="text-xs text-muted-foreground">{item.email}</p>
                            </div>
                            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                          </button>
                        ))}
                        {overview.recentRegistrations.length === 0 && <p className="text-sm text-muted-foreground">No registrations available yet.</p>}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Recent donations</CardTitle>
                      <CardDescription>Latest payer activity</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {(overview.recentDonations.length ? overview.recentDonations : []).map((item) => (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setDetailRow({ table: "donations", data: normalizeRecord(item) })}
                            className="flex w-full items-center justify-between rounded-xl border border-border bg-muted/30 px-3 py-2 text-left transition hover:bg-muted/50"
                          >
                            <div>
                              <p className="font-medium">{item.payment_status}</p>
                              <p className="text-xs text-muted-foreground">{formatCurrency(Number(item.amount) || 0)} · {item.currency}</p>
                            </div>
                            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                          </button>
                        ))}
                        {overview.recentDonations.length === 0 && <p className="text-sm text-muted-foreground">No donations recorded yet.</p>}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {activeSection === "registrations" && (
              <DataTable
                title="Youth registrations"
                description="Applicant records from the youth programme"
                searchValue={registrationSearch}
                onSearchChange={setRegistrationSearch}
                loading={registrationLoading}
                rows={registrations}
                total={registrationsTotal}
                page={registrationPage}
                onPageChange={setRegistrationPage}
                onView={(row) => setDetailRow({ table: "registrations", data: normalizeRecord(row) })}
                columns={[
                  { key: "full_name", label: "Full name" },
                  { key: "email", label: "Email" },
                  { key: "phone_number", label: "Phone" },
                  { key: "ward", label: "Ward" },
                  { key: "created_at", label: "Created" },
                ]}
              />
            )}

            {activeSection === "donations" && (
              <DataTable
                title="Donations"
                description="Supporter contributions and payment flow"
                searchValue={donationSearch}
                onSearchChange={setDonationSearch}
                loading={donationLoading}
                rows={donations}
                total={donationsTotal}
                page={donationPage}
                onPageChange={setDonationPage}
                onView={(row) => setDetailRow({ table: "donations", data: normalizeRecord(row) })}
                columns={[
                  { key: "amount", label: "Amount" },
                  { key: "currency", label: "Currency" },
                  { key: "payment_status", label: "Status" },
                  { key: "mpesa_phone_number", label: "Phone" },
                  { key: "created_at", label: "Date" },
                ]}
              />
            )}

            {activeSection === "donors" && (
              <DataTable
                title="Donors"
                description="Supporter profiles and contact details"
                searchValue={donorSearch}
                onSearchChange={setDonorSearch}
                loading={donorLoading}
                rows={donors}
                total={donorsTotal}
                page={donorPage}
                onPageChange={setDonorPage}
                onView={(row) => setDetailRow({ table: "donors", data: normalizeRecord(row) })}
                columns={[
                  { key: "first_name", label: "First name" },
                  { key: "last_name", label: "Last name" },
                  { key: "email", label: "Email" },
                  { key: "phone_number", label: "Phone" },
                  { key: "country", label: "Country" },
                ]}
              />
            )}

            {activeSection === "roles" && (
              <DataTable
                title="Admin access"
                description="Current user roles in the application"
                searchValue=""
                onSearchChange={() => undefined}
                loading={roleLoading}
                rows={roles}
                total={rolesTotal}
                page={rolePage}
                onPageChange={setRolePage}
                onView={(row) => setDetailRow({ table: "roles", data: normalizeRecord(row) })}
                columns={[
                  { key: "role", label: "Role" },
                  { key: "user_id", label: "User ID" },
                  { key: "created_at", label: "Created" },
                ]}
              />
            )}

            {activeSection === "database" && (
              <Card>
                <CardHeader>
                  <CardTitle>Project database overview</CardTitle>
                  <CardDescription>Available operational tables and counts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-wrap gap-2">
                    {(["registrations", "donations", "donors", "roles"] as const).map((table) => (
                      <Button
                        key={table}
                        variant={databaseTable === table ? "default" : "outline"}
                        size="sm"
                        onClick={() => setDatabaseTable(table)}
                      >
                        {table}
                      </Button>
                    ))}
                  </div>

                  {databaseTable === "registrations" && (
                    <SummaryList
                      rows={registrations.slice(0, 5)}
                      count={registrationsTotal}
                      label="registrations"
                      onView={(row) => setDetailRow({ table: "registrations", data: normalizeRecord(row) })}
                    />
                  )}

                  {databaseTable === "donations" && (
                    <SummaryList
                      rows={donations.slice(0, 5)}
                      count={donationsTotal}
                      label="donations"
                      onView={(row) => setDetailRow({ table: "donations", data: normalizeRecord(row) })}
                    />
                  )}

                  {databaseTable === "donors" && (
                    <SummaryList
                      rows={donors.slice(0, 5)}
                      count={donorsTotal}
                      label="donors"
                      onView={(row) => setDetailRow({ table: "donors", data: normalizeRecord(row) })}
                    />
                  )}

                  {databaseTable === "roles" && (
                    <SummaryList
                      rows={roles.slice(0, 5)}
                      count={rolesTotal}
                      label="roles"
                      onView={(row) => setDetailRow({ table: "roles", data: normalizeRecord(row) })}
                    />
                  )}
                </CardContent>
              </Card>
            )}
          </main>
        </div>
      </SidebarLayout>

      {detailRow && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-auto rounded-3xl border border-border bg-background p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Record detail</p>
                <h2 className="font-display text-2xl capitalize">{detailRow.table}</h2>
              </div>
              <Button variant="outline" size="icon" onClick={() => setDetailRow(null)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {Object.entries(detailRow.data).map(([key, value]) => (
                <div key={key} className="rounded-xl border border-border bg-muted/20 p-3">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">{key}</p>
                  <p className="mt-2 text-sm break-words">{formatDetail(value)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <Toaster richColors position="top-center" />
    </div>
  );
}

function SidebarLayout({
  activeSection,
  setActiveSection,
  sidebarOpen,
  setSidebarOpen,
  session,
  onSignOut,
  children,
}: {
  activeSection: SectionKey;
  setActiveSection: (section: SectionKey) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (state: boolean) => void;
  session: SessionUser;
  onSignOut: () => Promise<void>;
  children: React.ReactNode;
}) {
  const sidebarContent = (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex items-center justify-between border-b border-sidebar-border px-4 py-5">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-sidebar-foreground/70">Wazee</p>
          <h2 className="font-display text-xl">Admin</h2>
        </div>
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSidebarOpen(false)}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <nav className="space-y-2 p-3">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => {
              setActiveSection(id);
              setSidebarOpen(false);
            }}
            className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm transition ${
              activeSection === id ? "bg-primary text-primary-foreground" : "text-sidebar-foreground/80 hover:bg-sidebar-accent"
            }`}
          >
            <Icon className="h-4 w-4" />
            {label}
          </button>
        ))}
      </nav>

      <Separator className="my-2 bg-sidebar-border" />

      <div className="mt-auto p-3">
        <div className="rounded-xl border border-sidebar-border bg-sidebar-accent/30 p-3 text-sm">
          <p className="font-medium">{session.user.email ?? "Admin"}</p>
          <p className="text-xs text-sidebar-foreground/70">Role: admin</p>
        </div>
        <Button variant="secondary" className="mt-3 w-full" onClick={onSignOut}>
          <LogOut className="h-4 w-4" /> Sign out
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <div className="hidden h-screen md:block">
        <div className="flex h-screen">
          <aside className="w-72 border-r border-border bg-sidebar text-sidebar-foreground">
            {sidebarContent}
          </aside>
          <div className="flex-1">{children}</div>
        </div>
      </div>

      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-72 border-r border-border bg-sidebar p-0 text-sidebar-foreground md:hidden">
          <SheetHeader className="sr-only">
            <SheetTitle>Sidebar</SheetTitle>
          </SheetHeader>
          {sidebarContent}
        </SheetContent>
      </Sheet>

      <div className="md:hidden">{children}</div>
    </>
  );
}

function DataTable<T extends Record<string, unknown>>({
  title,
  description,
  searchValue,
  onSearchChange,
  loading,
  rows,
  total,
  page,
  onPageChange,
  onView,
  columns,
}: {
  title: string;
  description: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
  loading: boolean;
  rows: T[];
  total: number;
  page: number;
  onPageChange: (nextPage: number) => void;
  onView: (row: T) => void;
  columns: { key: keyof T; label: string }[];
}) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <Card>
      <CardHeader className="gap-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <div className="relative w-full max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="pl-9"
              placeholder="Search..."
              value={searchValue}
              onChange={(event) => {
                onSearchChange(event.target.value);
                onPageChange(1);
              }}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <LoadingBox />
        ) : (
          <>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    {columns.map((column) => (
                      <TableHead key={String(column.key)}>{column.label}</TableHead>
                    ))}
                    <TableHead className="w-24 text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={columns.length + 1} className="py-8 text-center text-sm text-muted-foreground">
                        No records found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    rows.map((row) => (
                      <TableRow key={String(row.id ?? row.email ?? row.user_id ?? Math.random())}>
                        {columns.map((column) => (
                          <TableCell key={String(column.key)}>
                            {formatCellValue(row[column.key] as string | number | boolean | null | undefined)}
                          </TableCell>
                        ))}
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm" onClick={() => onView(row)}>
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="mt-4 flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {rows.length} of {total} records
              </p>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => onPageChange(Math.max(page - 1, 1))}>
                  Previous
                </Button>
                <span className="text-sm text-muted-foreground">Page {page} of {totalPages}</span>
                <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => onPageChange(Math.min(page + 1, totalPages))}>
                  Next
                </Button>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

function SummaryList({ rows, count, label, onView }: { rows: Record<string, unknown>[]; count: number; label: string; onView: (row: Record<string, unknown>) => void }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold capitalize">{label}</h3>
        <Badge variant="secondary">{count.toLocaleString()} total</Badge>
      </div>
      <div className="space-y-3">
        {rows.length === 0 ? (
          <p className="text-sm text-muted-foreground">No {label} found.</p>
        ) : (
          rows.map((row, index) => (
            <button
              key={String(row.id ?? row.user_id ?? index)}
              type="button"
              onClick={() => onView(row)}
              className="flex w-full items-center justify-between rounded-xl border border-border bg-muted/30 px-3 py-2 text-left transition hover:bg-muted/50"
            >
              <div>
                <p className="font-medium">{row.full_name ?? row.first_name ?? row.email ?? row.role ?? row.id}</p>
                <p className="text-xs text-muted-foreground">{Object.values(row).slice(0, 2).join(" · ") || "Record"}</p>
              </div>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
            </button>
          ))
        )}
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, description }: { icon: typeof LayoutDashboard; label: string; value: string; description: string }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{label}</CardTitle>
        <div className="rounded-full bg-primary/10 p-2 text-primary">
          <Icon className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{value}</div>
        <p className="mt-2 text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

function Centered({ children }: { children: React.ReactNode }) {
  return <div className="grid min-h-screen place-items-center bg-muted/40 px-4">{children}</div>;
}

function LoadingBox() {
  return <div className="flex h-full min-h-48 items-center justify-center"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>;
}

function normalizeRecord(row: Record<string, unknown>): DetailRow {
  const normalized: DetailRow = {};
  Object.entries(row).forEach(([key, value]) => {
    normalized[key] = typeof value === "string" || typeof value === "number" || typeof value === "boolean" || value === null || value === undefined ? value : JSON.stringify(value);
  });
  return normalized;
}

function formatDetail(value: string | number | boolean | null | undefined) {
  if (value === null || value === undefined) return "—";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (typeof value === "number") return value.toLocaleString();
  if (value instanceof Date) return value.toISOString();
  return value;
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatCellValue(value: string | number | boolean | null | undefined) {
  if (value === null || value === undefined || value === "") return "—";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (typeof value === "number") return value.toLocaleString();

  const date = new Date(value);
  if (!Number.isNaN(date.getTime()) && value.length >= 10) {
    return date.toLocaleDateString("en-KE", { day: "2-digit", month: "short", year: "numeric" });
  }

  return value;
}
