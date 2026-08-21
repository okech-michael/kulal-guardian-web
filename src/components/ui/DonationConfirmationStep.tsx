import React from "react";

interface ConfirmationData {
  firstName: string;
  amount: number;
  currency: "KES" | "USD";
  frequency: "once" | "monthly";
  mpesaReceiptNumber?: string;
  transactionReference?: string;
  dedicatedTo?: string;
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
    return `$${(amount / 130).toFixed(2)}`; // Simple conversion for display
  };

  const frequencyLabel = data.frequency === "monthly" ? "every month" : "one-time";

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
          <p className="pt-2">
            A detailed receipt has been sent to your email address. Thank you for being a conservation
            partner!
          </p>
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
            If you continue to experience issues, please try again later or contact us at{" "}
            <span className="font-semibold">support@wazeemamazingira.org</span>
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
