import React, { useEffect, useState } from "react";
import { useDonationModal } from "@/lib/donationModal";

const AMOUNTS = [500, 1000, 2000, 5000, 10000, 20000];

export function DonationModalRoot() {
  // this component mounts once and listens for an open signal via a small DOM trick
  // we use a simple event to open the modal so we avoid global state complexity
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<number | null>(1000);
  const [isMonthly, setIsMonthly] = useState(false);
  const [custom, setCustom] = useState<string>("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    function handler() {
      setOpen(true);
      setStatus("idle");
      setMessage(null);
    }
    window.addEventListener("openDonationModal", handler as EventListener);
    return () => window.removeEventListener("openDonationModal", handler as EventListener);
  }, []);

  const amount = selected ?? (custom ? parseInt(custom.replace(/[^0-9]/g, ""), 10) || 0 : 0);

  async function submit() {
    if (!amount || amount <= 0) {
      setMessage("Please select or enter a valid amount.");
      return;
    }
    if (!phone || !/^07|\+254|254/.test(phone)) {
      setMessage("Enter a valid Safaricom phone number (eg. 07XXXXXXXX).");
      return;
    }

    setStatus("loading");
    setMessage(null);

    try {
      const res = await fetch("/api/donations/mpesa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, amount, type: isMonthly ? "monthly" : "once" }),
      });

      let data: any;
      const text = await res.text();
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error(`Server response was not JSON: ${text}`);
      }

      if (!res.ok) throw new Error(data?.message || "Payment request failed");

      setStatus("success");
      setMessage("STK Push initiated. Check your phone to complete the payment.");
    } catch (err: any) {
      setStatus("error");
      setMessage(err?.message || "Failed to initiate payment.");
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
      <div className="relative z-10 w-full max-w-xl rounded-2xl bg-card p-6 shadow-2xl">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-semibold">Support Conservation of Mount Kulal</h3>
            <p className="mt-2 text-sm text-muted-foreground">Your contribution helps protect Mount Kulal's biodiversity, cultural heritage, and community conservation initiatives.</p>
          </div>
          <button aria-label="Close" className="ml-4 text-muted-foreground" onClick={() => setOpen(false)}>✕</button>
        </div>

        <div className="mt-5 grid gap-4">
          <div className="rounded-full bg-muted p-1 inline-flex">
            <button className={`px-4 py-2 rounded-full ${!isMonthly ? "bg-accent text-accent-foreground" : "text-foreground"}`} onClick={() => setIsMonthly(false)}>Give Once</button>
            <button className={`px-4 py-2 rounded-full ${isMonthly ? "bg-accent text-accent-foreground" : "text-foreground"}`} onClick={() => setIsMonthly(true)}>Monthly</button>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {AMOUNTS.map((a) => (
              <button key={a} onClick={() => { setSelected(a); setCustom(""); }} className={`rounded-lg border p-3 text-sm ${selected === a ? "border-accent bg-accent/10" : "border-border bg-card"}`}>
                KSh {a.toLocaleString()}
              </button>
            ))}
            <div className="col-span-3">
              <label className="text-sm">Custom amount (KES)</label>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-sm font-semibold">KSh</span>
                <input value={custom} onChange={(e) => { setCustom(e.target.value); setSelected(null); }} placeholder="0" inputMode="numeric" className="w-full rounded-lg border px-3 py-2" />
              </div>
            </div>
          </div>

          <div>
            <label className="text-sm">M-Pesa Phone Number</label>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="07XXXXXXXX" inputMode="tel" className="mt-2 w-full rounded-lg border px-3 py-2" />
          </div>

          {message && <div className={`rounded-md px-3 py-2 ${status === "error" ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"}`}>{message}</div>}

          <div className="mt-2 flex items-center justify-end gap-3">
            <button onClick={() => setOpen(false)} className="rounded-md px-4 py-2">Cancel</button>
            <button onClick={submit} disabled={status === "loading"} className="rounded-md bg-accent px-4 py-2 text-accent-foreground">
              {status === "loading" ? "Processing…" : "Donate Now"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function openDonationModal() {
  window.dispatchEvent(new Event("openDonationModal"));
}
