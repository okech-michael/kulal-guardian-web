import React, { useEffect, useState } from "react";
import { useDonationModal } from "@/lib/donationModal";

const AMOUNTS = [500, 1000, 2000, 5000, 10000, 20000];

export function DonationModalRoot() {
  // this component mounts once and listens for an open signal via a small DOM trick
  // we use a simple event to open the modal so we avoid global state complexity
  const [open, setOpen] = useState(false);
  // selected is stored in KES (base amount)
  const [selected, setSelected] = useState<number | null>(1000);
  const [isMonthly, setIsMonthly] = useState(false);
  const [custom, setCustom] = useState<string>("");
  // customBase stores the custom amount in KES (base currency)
  const [customBase, setCustomBase] = useState<number | null>(null);
  const [currency, setCurrency] = useState<"KES" | "USD">("KES");
  const [rate, setRate] = useState<number | null>(null); // 1 USD = rate KES
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

  // Fetch exchange rate when modal opens (cache in sessionStorage)
  useEffect(() => {
    if (!open) return;

    async function fetchRate() {
      try {
        const cached = sessionStorage.getItem("usd_kes_rate");
        if (cached) {
          const parsed = JSON.parse(cached);
          if (parsed?.rate) setRate(parsed.rate);
        }

        const res = await fetch("https://api.exchangerate.host/latest?base=USD&symbols=KES");
        if (!res.ok) throw new Error("Rate fetch failed");
        const data = await res.json();
        const fetched = data?.rates?.KES;
        if (fetched) {
          setRate(fetched);
          sessionStorage.setItem("usd_kes_rate", JSON.stringify({ rate: fetched, ts: Date.now() }));
        }
      } catch (err) {
        // fallback to previously cached or a sensible default (130)
        const cached = sessionStorage.getItem("usd_kes_rate");
        if (cached) {
          const parsed = JSON.parse(cached);
          if (parsed?.rate) setRate(parsed.rate);
        } else {
          setRate(130);
        }
      }
    }

    fetchRate();
  }, [open]);

  // compute the final amount in KES for submission
  const amount = selected ?? (customBase ? Math.round(customBase) : (custom ? parseInt(custom.replace(/[^0-9]/g, ""), 10) || 0 : 0));

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
      // Ensure amount sent to backend is in KES (M-Pesa requirement)
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

  const formatDisplay = (kes: number) => {
    if (currency === "KES") return `KSh ${kes.toLocaleString()}`;
    const r = rate || 130;
    const usd = kes / r;
    return `$${usd.toFixed(2)}`;
  };

  const formatInputDisplay = (kes: number | null) => {
    if (!kes && kes !== 0) return "";
    if (currency === "KES") return Math.round(kes as number).toString();
    const r = rate || 130;
    return ( (kes as number) / r ).toFixed(2);
  };

  function handleCustomChange(val: string) {
    // parse numeric value from current currency input and store base KES
    const cleaned = val.replace(/[^0-9.]/g, "");
    if (cleaned === "") {
      setCustom("");
      setCustomBase(null);
      setSelected(null);
      return;
    }
    const num = parseFloat(cleaned);
    if (Number.isNaN(num)) return;
    if (currency === "KES") {
      setCustom(cleaned);
      setCustomBase(Math.round(num));
    } else {
      // USD entered -> convert to KES
      const r = rate || 130;
      setCustom(cleaned);
      setCustomBase(num * r);
    }
    setSelected(null);
  }

  function switchCurrency(to: "KES" | "USD") {
    if (currency === to) return;
    setCurrency(to);
    // Update custom input visible string to reflect new currency
    if (customBase != null) {
      setCustom(formatInputDisplay(customBase));
    } else {
      setCustom("");
    }
  }

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
          <div className="flex items-center gap-3">
            <label className="text-sm">Currency</label>
            <div className="rounded-full bg-muted p-1 inline-flex">
              <button className={`px-3 py-1 rounded-full ${currency === "KES" ? "bg-accent text-accent-foreground" : "text-foreground"}`} onClick={() => switchCurrency("KES")}>KES</button>
              <button className={`px-3 py-1 rounded-full ${currency === "USD" ? "bg-accent text-accent-foreground" : "text-foreground"}`} onClick={() => switchCurrency("USD")}>USD</button>
            </div>
          </div>
          <div className="rounded-full bg-muted p-1 inline-flex">
            <button className={`px-4 py-2 rounded-full ${!isMonthly ? "bg-accent text-accent-foreground" : "text-foreground"}`} onClick={() => setIsMonthly(false)}>Give Once</button>
            <button className={`px-4 py-2 rounded-full ${isMonthly ? "bg-accent text-accent-foreground" : "text-foreground"}`} onClick={() => setIsMonthly(true)}>Monthly</button>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {AMOUNTS.map((a) => (
              <button key={a} onClick={() => { setSelected(a); setCustom(""); setCustomBase(null); }} className={`rounded-lg border p-3 text-sm ${selected === a ? "border-accent bg-accent/10" : "border-border bg-card"}`}>
                {formatDisplay(a)}
              </button>
            ))}
            <div className="col-span-3">
              <label className="text-sm">Custom amount ({currency})</label>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-sm font-semibold">{currency === "KES" ? "KSh" : "$"}</span>
                <input value={custom} onChange={(e) => { handleCustomChange(e.target.value); }} placeholder="0" inputMode="numeric" className="w-full rounded-lg border px-3 py-2" />
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
