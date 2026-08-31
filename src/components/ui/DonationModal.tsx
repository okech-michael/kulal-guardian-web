import React, { useEffect, useState } from "react";
import { useDonationModal } from "@/lib/donationModal";
import { DonorFormStep } from "./DonorFormStep";
import { DonationConfirmationStep } from "./DonationConfirmationStep";

const AMOUNTS = [500, 1000, 2000, 5000, 10000, 20000];

interface DonorData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  country: string;
  regionOrCounty: string;
  cityOrTown: string;
}

interface DedicationData {
  enabled: boolean;
  type: "honour" | "memory" | "love" | "";
  honoureeFirstName: string;
  honoureeLastName: string;
  message: string;
  notificationRequested: boolean;
  notificationRecipientName: string;
  notificationRecipientEmail: string;
  notificationMessage: string;
}

export function DonationModalRoot() {
  // Modal state
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3>(1); // 1: donor info, 2: donation amount, 3: confirmation

  // Step 1: Donor Information
  const [donor, setDonor] = useState<DonorData | null>(null);
  const [dedication, setDedication] = useState<DedicationData | null>(null);
  const [donorId, setDonorId] = useState<string | null>(null);

  // Step 2: Donation Amount & Payment
  const [selected, setSelected] = useState<number | null>(null);
  const [isMonthly, setIsMonthly] = useState(false);
  const [custom, setCustom] = useState<string>("");
  const [customBase, setCustomBase] = useState<number | null>(null);
  const [currency, setCurrency] = useState<"KES" | "USD">("KES");
  const [rate, setRate] = useState<number | null>(null);
  const [phone, setPhone] = useState("");
  const [donationId, setDonationId] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error" | "pending">("idle");
  const [message, setMessage] = useState<string | null>(null);

  // Step 3: Confirmation state
  const [confirmationData, setConfirmationData] = useState<any>(null);
  const [confirmationStatus, setConfirmationStatus] = useState<"success" | "failed" | "pending">("pending");

  useEffect(() => {
    function handler() {
      setOpen(true);
      setStep(1);
      setStatus("idle");
      setMessage(null);
      resetForm();
    }
    window.addEventListener("openDonationModal", handler as EventListener);
    return () => window.removeEventListener("openDonationModal", handler as EventListener);
  }, []);

  // Fetch exchange rate when modal opens
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

  const resetForm = () => {
    setDonor(null);
    setDedication(null);
    setDonorId(null);
    setSelected(null);
    setIsMonthly(false);
    setCustom("");
    setCustomBase(null);
    setCurrency("KES");
    setPhone("");
    setDonationId(null);
    setStatus("idle");
    setMessage(null);
    setConfirmationData(null);
    setConfirmationStatus("pending");
  };

  // Step 1: Handle donor information submission
  const handleDonorSubmit = async (donorData: DonorData, dedicationData: DedicationData) => {
    setStatus("loading");
    try {
      const donorPayload = {
        ...donorData,
        phoneNumber: donorData.phoneNumber?.trim() || "254700000000",
      };

      // Create donor record
      const donorRes = await fetch("/api/donations/donors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(donorPayload),
      });

      if (!donorRes.ok) {
        throw new Error("Failed to create donor record");
      }

      const donorResult = await donorRes.json();
      setDonor(donorData);
      setDedication(dedicationData);
      setDonorId(donorResult.donor_id);
      setStep(2);
      setStatus("idle");
      setMessage(null);
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Failed to save your information");
      throw err;
    }
  };

  // Step 2: Handle donation submission
  const amount = selected ?? (customBase ? Math.round(customBase) : (custom ? parseInt(custom.replace(/[^0-9]/g, ""), 10) || 0 : 0));

  function normalizePhone(raw: string) {
    const digits = raw.replace(/\D/g, "");
    if (!digits) return null;
    if (digits.startsWith("254")) return digits;
    if (digits.startsWith("07")) return `254${digits.slice(1)}`;
    if (digits.startsWith("7")) return `254${digits}`;
    return digits;
  }

  const handleDonationSubmit = async () => {
    if (!amount || amount <= 0) {
      setMessage("Please select or enter a valid amount.");
      return;
    }

    if (!donorId) {
      setMessage("Donor information is missing. Please go back and try again.");
      return;
    }

    setStatus("loading");
    setMessage(null);

    try {
      // Create donation record with a placeholder phone number for the database
      // (since we're using manual M-Pesa payment, actual phone isn't needed for STK Push)
      const donationRes = await fetch("/api/donations/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          donor_id: donorId,
          amount,
          currency,
          frequency: isMonthly ? "monthly" : "once",
          mpesa_phone_number: "254700000000", // Placeholder for manual payment flow
          dedication_enabled: dedication?.enabled || false,
          dedication_type: dedication?.enabled ? dedication.type : null,
          honouree_first_name: dedication?.enabled ? dedication.honoureeFirstName : null,
          honouree_last_name: dedication?.enabled ? dedication.honoureeLastName : null,
          dedication_message: dedication?.enabled ? dedication.message : null,
          notification_requested: dedication?.enabled ? dedication.notificationRequested : false,
          notification_recipient_name: dedication?.enabled ? dedication.notificationRecipientName : null,
          notification_recipient_email: dedication?.enabled ? dedication.notificationRecipientEmail : null,
          notification_message: dedication?.enabled ? dedication.notificationMessage : null,
        }),
      });

      if (!donationRes.ok) {
        throw new Error("Failed to create donation record");
      }

      const donationResult = await donationRes.json();
      setDonationId(donationResult.donation_id);

      // For manual M-Pesa payment, skip STK Push and go directly to confirmation
      setStatus("pending");
      setStep(3);
      setConfirmationStatus("pending");
      setConfirmationData({
        firstName: donor?.firstName,
        amount: currency === "KES" ? amount : amount / (rate || 130),
        currency,
        frequency: isMonthly ? "monthly" : "once",
        dedicatedTo: dedication?.enabled
          ? `${dedication.honoureeFirstName} ${dedication.honoureeLastName}`
          : null,
        isManualPayment: true, // Flag to indicate manual M-Pesa payment
      });
    } catch (err: any) {
      setStatus("error");
      setMessage(err?.message || "Failed to process donation.");
    }
  };

  // Monitor donation status (skip for manual M-Pesa payments)
  useEffect(() => {
    if (step !== 3 || !donationId || !confirmationData || confirmationData.isManualPayment) return;

    let isMounted = true;
    let pollCount = 0;
    const maxPolls = 60; // Poll for up to 2 minutes (60 * 2 seconds)

    const pollDonationStatus = async () => {
      if (pollCount >= maxPolls || !isMounted) {
        if (isMounted) {
          setConfirmationStatus("failed");
          setConfirmationData((prev: any) => ({
            ...prev,
            failureReason: "Payment confirmation timed out. You can try again.",
          }));
        }
        return;
      }
      pollCount++;

      try {
        const res = await fetch(`/api/donations/get?id=${donationId}`);
        if (!res.ok) return;

        const donation = await res.json();

        if (!isMounted) return;

        if (donation.payment_status === "completed") {
          setConfirmationStatus("success");
          setConfirmationData((prev: any) => ({
            ...prev,
            mpesaReceiptNumber: donation.mpesa_receipt_number,
            transactionReference: donation.transaction_reference,
          }));
        } else if (donation.payment_status === "failed" || donation.payment_status === "cancelled") {
          setConfirmationStatus("failed");
          setConfirmationData((prev: any) => ({
            ...prev,
            failureReason: donation.failure_reason,
          }));
        }
      } catch (err) {
        console.error("Error polling donation status:", err);
      }
    };

    const interval = setInterval(pollDonationStatus, 2000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [step, donationId, confirmationData, confirmationStatus]);

  const handleBackStep2 = () => {
    setStep(1);
    setStatus("idle");
    setMessage(null);
  };

  const switchCurrency = (nextCurrency: "KES" | "USD") => {
    if (nextCurrency === currency) return;
    setCurrency(nextCurrency);
    if (customBase !== null) {
      setCustom(nextCurrency === "KES"
        ? String(Math.round(customBase))
        : (customBase / (rate || 130)).toFixed(2));
    }
  };

  const handleConfirmationClose = () => {
    setOpen(false);
    resetForm();
  };

  const handleConfirmationRetry = () => {
    setStep(2);
    setStatus("idle");
    setMessage(null);
    setConfirmationData(null);
    setConfirmationStatus("pending");
  };

  if (!open) return null;

  // Render current step
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
      <div className="relative z-10 w-full max-w-2xl rounded-2xl bg-card p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Step Indicator */}
        {step < 3 && (
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  step >= 1 ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                {step > 1 ? "✓" : "1"}
              </div>
              <span className={step >= 1 ? "font-semibold" : "text-muted-foreground"}>
                Your Information
              </span>
            </div>

            <div className={`flex-1 h-1 mx-4 ${step >= 2 ? "bg-accent" : "bg-muted"}`} />

            <div className="flex items-center gap-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  step >= 2 ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                {step > 2 ? "✓" : "2"}
              </div>
              <span className={step >= 2 ? "font-semibold" : "text-muted-foreground"}>
                Donation
              </span>
            </div>

            <div className={`flex-1 h-1 mx-4 ${step >= 3 ? "bg-accent" : "bg-muted"}`} />

            <div className="flex items-center gap-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  step >= 3 ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                3
              </div>
              <span className={step >= 3 ? "font-semibold" : "text-muted-foreground"}>
                Confirmation
              </span>
            </div>
          </div>
        )}

        {/* Close Button */}
        {step < 3 && (
          <button
            aria-label="Close"
            className="absolute top-6 right-6 text-muted-foreground hover:text-foreground"
            onClick={() => setOpen(false)}
          >
            ✕
          </button>
        )}

        {/* Step 1: Donor Information */}
        {step === 1 && (
          <DonorFormStep
            onContinue={handleDonorSubmit}
            onBack={() => setOpen(false)}
            initialData={
              donor ? { ...donor, dedication } : undefined
            }
          />
        )}

        {/* Step 2: Donation Amount & Payment */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold">Support Conservation of Mount Kulal</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Your contribution helps protect Mount Kulal's biodiversity, cultural heritage, and
                community conservation initiatives.
              </p>
            </div>

            <div className="mt-5 grid gap-4">
              <div className="flex items-center gap-3">
                <label className="text-sm">Currency</label>
                <div className="rounded-full bg-muted p-1 inline-flex">
                  <button
                    className={`px-3 py-1 rounded-full ${
                      currency === "KES" ? "bg-accent text-accent-foreground" : "text-foreground"
                    }`}
                    onClick={() => switchCurrency("KES")}
                  >
                    KES
                  </button>
                  <button
                    className={`px-3 py-1 rounded-full ${
                      currency === "USD" ? "bg-accent text-accent-foreground" : "text-foreground"
                    }`}
                    onClick={() => switchCurrency("USD")}
                  >
                    USD
                  </button>
                </div>
              </div>
              <div className="rounded-full bg-muted p-1 inline-flex">
                <button
                  className={`px-4 py-2 rounded-full ${
                    !isMonthly ? "bg-accent text-accent-foreground" : "text-foreground"
                  }`}
                  onClick={() => setIsMonthly(false)}
                >
                  Give Once
                </button>
                <button
                  className={`px-4 py-2 rounded-full ${
                    isMonthly ? "bg-accent text-accent-foreground" : "text-foreground"
                  }`}
                  onClick={() => setIsMonthly(true)}
                >
                  Monthly
                </button>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {AMOUNTS.map((a) => (
                  <button
                    key={a}
                    onClick={() => {
                      setSelected(a);
                      setCustom("");
                      setCustomBase(null);
                    }}
                    className={`rounded-lg border p-3 text-sm ${
                      selected === a ? "border-accent bg-accent/10" : "border-border bg-card"
                    }`}
                  >
                    {formatDisplay(a, currency, rate)}
                  </button>
                ))}
                <div className="col-span-3">
                  <label className="text-sm">Enter donation amount ({currency})</label>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-sm font-semibold">{currency === "KES" ? "KSh" : "$"}</span>
                    <input
                      value={custom}
                      onChange={(e) => {
                        handleCustomChange(e.target.value, currency, rate, setCustom, setCustomBase, setSelected);
                      }}
                      placeholder="Enter amount"
                      inputMode="numeric"
                      className="w-full rounded-lg border px-3 py-2"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-border pt-8">
                <div className="text-center space-y-4">
                  <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                    M-PESA PAYMENT
                  </h4>

                  <div className="space-y-3">
                    <div className="rounded-2xl border border-accent/30 bg-accent/5 p-6 shadow-sm">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                        Paybill
                      </p>
                      <p className="mt-3 text-4xl font-black tracking-wide text-accent sm:text-5xl">
                        400200
                      </p>

                      <div className="my-4 h-px bg-accent/20" />

                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                        Account Number
                      </p>
                      <p className="mt-3 break-all text-2xl font-black tracking-wide text-accent sm:text-4xl">
                        01102713585001
                      </p>

                      <div className="mt-5 border-t border-accent/20 pt-4">
                        <p className="text-sm font-semibold text-foreground">
                          Donation Amount: {currency === "KES" ? `KSh ${amount.toLocaleString()}` : `$${(amount / (rate || 130)).toFixed(2)}`}
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground">
                    Use the M-Pesa Paybill above to complete your donation manually.
                  </p>
                </div>
              </div>

              {message && (
                <div
                  className={`rounded-md px-3 py-2 ${
                    status === "error" ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"
                  }`}
                >
                  {message}
                </div>
              )}

              <div className="mt-2 flex items-center justify-between gap-3">
                <button
                  onClick={handleBackStep2}
                  disabled={status === "loading" || status === "pending"}
                  className="rounded-md px-4 py-2 border border-border hover:bg-muted disabled:opacity-50"
                >
                  Back
                </button>
                <button
                  onClick={handleDonationSubmit}
                  disabled={status === "loading" || status === "pending"}
                  className="rounded-md bg-accent px-4 py-2 text-accent-foreground hover:opacity-90 disabled:opacity-50"
                >
                  {status === "loading" || status === "pending" ? "Processing…" : "Payment Instructions"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Confirmation */}
        {step === 3 && confirmationData && (
          <DonationConfirmationStep
            data={confirmationData}
            status={confirmationStatus}
            onClose={handleConfirmationClose}
            onRetry={handleConfirmationRetry}
          />
        )}
      </div>
    </div>
  );
}

// Helper functions
function formatDisplay(kes: number, currency: string, rate: number | null) {
  if (currency === "KES") return `KSh ${kes.toLocaleString()}`;
  const r = rate || 130;
  const usd = kes / r;
  return `$${usd.toFixed(2)}`;
}

function handleCustomChange(
  val: string,
  currency: string,
  rate: number | null,
  setCustom: (val: string) => void,
  setCustomBase: (val: number | null) => void,
  setSelected: (val: null) => void
) {
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
    const r = rate || 130;
    setCustom(cleaned);
    setCustomBase(num * r);
  }
  setSelected(null);
}

export function openDonationModal() {
  window.dispatchEvent(new Event("openDonationModal"));
}
