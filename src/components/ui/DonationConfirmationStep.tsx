import React from "react";

interface ConfirmationData {
  firstName: string;
  amount: number;
  currency: "KES" | "USD";
  frequency: "once" | "monthly";
  mpesaReceiptNumber?: string;
  transactionReference?: string;
  dedicatedTo?: string;
  failureReason?: string;
  isManualPayment?: boolean; // Flag for manual M-Pesa payment flow
}

interface DonationConfirmationStepProps {
  data: ConfirmationData;
  status: "success" | "failed" | "pending";
  onClose: () => void;
  onRetry?: () => void;
}

export function DonationConfirmationStep({
  data,
  status,
  onClose,
  onRetry,
}: DonationConfirmationStepProps) {
  const formatCurrency = (amount: number, currency: string) => {
    if (currency === "KES") return `KSh ${amount.toLocaleString()}`;
    return `$${amount.toFixed(2)}`;
  };

  const frequencyLabel = data.frequency === "monthly" ? "every month" : "one-time";

  // Manual M-Pesa payment instruction screen
  if (data.isManualPayment && status === "pending") {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-accent/10 p-4">
              <svg
                className="w-8 h-8 text-accent"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
          <h3 className="text-2xl font-bold">How to Pay Using Safaricom M-Pesa</h3>
        </div>

        <div className="space-y-5">
          <div className="rounded-2xl border border-accent/20 bg-accent/5 p-5">
            <div className="text-center">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Paybill
              </p>
              <p className="mt-3 text-4xl font-black tracking-wide text-accent">400200</p>

              <div className="my-4 h-px bg-accent/20" />

              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Account Number
              </p>
              <p className="mt-3 break-all text-2xl font-black tracking-wide text-accent sm:text-3xl">
                01102713585001
              </p>
            </div>

            <div className="mt-5 rounded-xl border border-accent/20 bg-background/60 p-4 text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Donation Amount
              </p>
              <p className="mt-2 text-xl font-bold text-foreground">
                {formatCurrency(data.amount, data.currency)}
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                {data.frequency === "monthly" ? "Recurring monthly donation" : "One-time donation"}
              </p>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-xl border border-accent/20 bg-accent/5 p-5">
              <h4 className="text-base font-bold text-foreground">Using SIM Toolkit</h4>
              <ol className="mt-4 space-y-3 text-sm text-foreground/90">
                <li><span className="font-semibold">1.</span> Open <strong>SIM Toolkit</strong> on your phone.</li>
                <li><span className="font-semibold">2.</span> Select <strong>Safaricom</strong>.</li>
                <li><span className="font-semibold">3.</span> Select <strong>M-PESA</strong>.</li>
                <li><span className="font-semibold">4.</span> Select <strong>Lipa na M-PESA</strong>.</li>
                <li><span className="font-semibold">5.</span> Select <strong>Pay Bill</strong>.</li>
                <li><span className="font-semibold">6.</span> Enter Paybill Number: <strong>400200</strong>.</li>
                <li><span className="font-semibold">7.</span> Enter Account Number: <strong>01102713585001</strong>.</li>
                <li><span className="font-semibold">8.</span> Enter the donation amount: <strong>{formatCurrency(data.amount, data.currency)}</strong>.</li>
                <li><span className="font-semibold">9.</span> Enter your M-Pesa PIN and confirm the payment.</li>
              </ol>
            </div>

            <div className="rounded-xl border border-accent/20 bg-accent/5 p-5">
              <h4 className="text-base font-bold text-foreground">Or Pay Using <span className="text-accent">*334#</span></h4>
              <ol className="mt-4 space-y-3 text-sm text-foreground/90">
                <li><span className="font-semibold">1.</span> Dial <strong>*334#</strong> on your Safaricom phone.</li>
                <li><span className="font-semibold">2.</span> Select <strong>Lipa na M-PESA</strong>.</li>
                <li><span className="font-semibold">3.</span> Select <strong>Pay Bill</strong>.</li>
                <li><span className="font-semibold">4.</span> Enter Paybill: <strong>400200</strong>.</li>
                <li><span className="font-semibold">5.</span> Enter Account Number: <strong>01102713585001</strong>.</li>
                <li><span className="font-semibold">6.</span> Enter the donation amount: <strong>{formatCurrency(data.amount, data.currency)}</strong>.</li>
                <li><span className="font-semibold">7.</span> Enter your M-Pesa PIN and confirm the payment.</li>
              </ol>
            </div>
          </div>

          {data.dedicatedTo && (
            <div className="rounded-lg bg-muted p-4">
              <p className="text-xs text-muted-foreground">This donation is dedicated to:</p>
              <p className="font-semibold mt-1">{data.dedicatedTo}</p>
            </div>
          )}
        </div>

        <div className="pt-4 border-t border-border">
          <p className="text-xs text-center text-muted-foreground">
            Please complete the payment using the steps above. Once the payment is sent, we will record your donation.
          </p>
        </div>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="space-y-6 text-center">
        <div className="flex justify-center">
          <div className="rounded-full bg-green-100 p-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold">Thank You, {data.firstName}!</h3>
          <p className="mt-2 text-muted-foreground">
            Your generous donation has been received and will make a real impact.
          </p>
        </div>

        <div className="rounded-lg bg-muted p-6 text-left space-y-3">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Donation Amount:</span>
            <span className="font-semibold">{formatCurrency(data.amount, data.currency)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Donation Type:</span>
            <span className="font-semibold capitalize">{frequencyLabel}</span>
          </div>
          {data.mpesaReceiptNumber && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Receipt Number:</span>
              <span className="font-mono text-sm">{data.mpesaReceiptNumber}</span>
            </div>
          )}
          {data.transactionReference && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Transaction ID:</span>
              <span className="font-mono text-sm">{data.transactionReference.slice(-8)}</span>
            </div>
          )}
          {data.dedicatedTo && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Dedicated To:</span>
              <span className="font-semibold">{data.dedicatedTo}</span>
            </div>
          )}
        </div>

        <div className="rounded-lg bg-blue-50 p-4 text-sm text-blue-900 space-y-2">
          <p className="font-semibold">Your Impact</p>
          <p>
            Your generous donation of {formatCurrency(data.amount, data.currency)} has been received.
            Your support helps Wazee wa Mazingira protect biodiversity, preserve cultural heritage,
            and strengthen conservation initiatives around Mount Kulal.
          </p>
          <p className="pt-2">Thank you for being a conservation partner!</p>
        </div>

        <div>
          <button
            onClick={onClose}
            className="w-full rounded-md bg-accent px-6 py-2 text-accent-foreground hover:opacity-90"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="space-y-6 text-center">
        <div className="flex justify-center">
          <div className="rounded-full bg-red-100 p-4">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold">Payment Could Not Be Processed</h3>
          <p className="mt-2 text-muted-foreground">
            Your donation was not completed. Your information has been saved, and you can try again
            without re-entering your details.
          </p>
        </div>

        <div className="rounded-lg bg-red-50 p-4 text-sm text-red-900">
          <p>
            {data.failureReason || "The payment was not completed. Please try again."}
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-md border border-border px-6 py-2 hover:bg-muted"
          >
            Close
          </button>
          {onRetry && (
            <button
              onClick={onRetry}
              className="flex-1 rounded-md bg-accent px-6 py-2 text-accent-foreground hover:opacity-90"
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    );
  }

  // Pending state
  return (
    <div className="space-y-6 text-center">
      <div className="flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent" />
      </div>

      <div>
        <h3 className="text-xl font-semibold">Processing Your Donation</h3>
        <p className="mt-2 text-muted-foreground">
          Please check your phone to complete the M-Pesa payment.
        </p>
      </div>

      <div className="rounded-lg bg-blue-50 p-4 text-sm text-blue-900">
        <p>
          An STK Push has been sent to your phone number. Enter your M-Pesa PIN to complete the
          payment.
        </p>
      </div>

      <div className="text-muted-foreground text-sm">
        <p>This may take a few moments. Do not close this window.</p>
      </div>
    </div>
  );
}
