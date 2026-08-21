import React, { useState } from "react";
import { Checkbox } from "./checkbox";

interface DonorFormData {
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

interface DonorFormStepProps {
  onContinue: (donor: DonorFormData, dedication: DedicationData) => void;
  initialData?: DonorFormData & { dedication?: DedicationData };
}

export function DonorFormStep({ onContinue, initialData }: DonorFormStepProps) {
  const [donor, setDonor] = useState<DonorFormData>(
    initialData
      ? {
          firstName: initialData.firstName || "",
          lastName: initialData.lastName || "",
          email: initialData.email || "",
          phoneNumber: initialData.phoneNumber || "",
          country: initialData.country || "Kenya",
          regionOrCounty: initialData.regionOrCounty || "",
          cityOrTown: initialData.cityOrTown || "",
        }
      : {
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          country: "Kenya",
          regionOrCounty: "",
          cityOrTown: "",
        }
  );

  const [dedication, setDedication] = useState<DedicationData>(
    initialData?.dedication
      ? initialData.dedication
      : {
          enabled: false,
          type: "",
          honoureeFirstName: "",
          honoureeLastName: "",
          message: "",
          notificationRequested: false,
          notificationRecipientName: "",
          notificationRecipientEmail: "",
          notificationMessage: "",
        }
  );

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  // Validation functions
  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const normalizePhone = (raw: string) => {
    const digits = raw.replace(/\D/g, "");
    if (!digits) return null;
    if (digits.startsWith("254")) return digits;
    if (digits.startsWith("07")) return `254${digits.slice(1)}`;
    if (digits.startsWith("7")) return `254${digits}`;
    return digits;
  };

  const validatePhone = (phone: string) => {
    const normalized = normalizePhone(phone);
    if (!normalized) return false;
    return /^2547\d{8}$/.test(normalized);
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!donor.firstName.trim()) newErrors.firstName = "First name is required";
    if (!donor.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!donor.email.trim()) newErrors.email = "Email is required";
    else if (!validateEmail(donor.email)) newErrors.email = "Enter a valid email address";
    if (!donor.phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required";
    else if (!validatePhone(donor.phoneNumber))
      newErrors.phoneNumber = "Enter a valid Safaricom number (07XXXXXXXX)";
    if (!donor.country.trim()) newErrors.country = "Country is required";
    if (!donor.regionOrCounty.trim()) newErrors.regionOrCounty = "County/Region is required";
    if (!donor.cityOrTown.trim()) newErrors.cityOrTown = "Town/City is required";

    // Validate dedication if enabled
    if (dedication.enabled) {
      if (!dedication.type) newErrors.dedicationType = "Please select a dedication type";
      if (!dedication.honoureeFirstName.trim())
        newErrors.honoureeFirstName = "Honouree first name is required";
      if (!dedication.honoureeLastName.trim())
        newErrors.honoureeLastName = "Honouree last name is required";

      if (dedication.notificationRequested) {
        if (!dedication.notificationRecipientName.trim())
          newErrors.notificationRecipientName = "Recipient name is required";
        if (!dedication.notificationRecipientEmail.trim())
          newErrors.notificationRecipientEmail = "Recipient email is required";
        else if (!validateEmail(dedication.notificationRecipientEmail))
          newErrors.notificationRecipientEmail = "Enter a valid email address";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleDonorChange = (field: keyof DonorFormData, value: string) => {
    setDonor((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleDedicationChange = (field: keyof DedicationData, value: any) => {
    setDedication((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      onContinue(donor, dedication);
    } catch (err) {
      setErrors({ submit: err instanceof Error ? err.message : "Failed to continue" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold">Your Information</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Help us send you a receipt and acknowledge your generous support.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Fields */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={donor.firstName}
              onChange={(e) => handleDonorChange("firstName", e.target.value)}
              className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="Timothy"
            />
            {errors.firstName && <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>}
          </div>
          <div>
            <label className="text-sm font-medium">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={donor.lastName}
              onChange={(e) => handleDonorChange("lastName", e.target.value)}
              className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="Ledany"
            />
            {errors.lastName && <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>}
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="text-sm font-medium">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={donor.email}
            onChange={(e) => handleDonorChange("email", e.target.value)}
            className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
            placeholder="john@example.com"
          />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
        </div>

        {/* Phone Number */}
        <div>
          <label className="text-sm font-medium">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            value={donor.phoneNumber}
            onChange={(e) => handleDonorChange("phoneNumber", e.target.value)}
            className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
            placeholder="07XXXXXXXX"
            inputMode="tel"
          />
          {errors.phoneNumber && <p className="mt-1 text-xs text-red-500">{errors.phoneNumber}</p>}
        </div>

        {/* Location Fields */}
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="text-sm font-medium">
              Country <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={donor.country}
              onChange={(e) => handleDonorChange("country", e.target.value)}
              className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="Kenya"
            />
            {errors.country && <p className="mt-1 text-xs text-red-500">{errors.country}</p>}
          </div>
          <div>
            <label className="text-sm font-medium">
              County/Region <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={donor.regionOrCounty}
              onChange={(e) => handleDonorChange("regionOrCounty", e.target.value)}
              className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="County"
            />
            {errors.regionOrCounty && (
              <p className="mt-1 text-xs text-red-500">{errors.regionOrCounty}</p>
            )}
          </div>
          <div>
            <label className="text-sm font-medium">
              Town/City <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={donor.cityOrTown}
              onChange={(e) => handleDonorChange("cityOrTown", e.target.value)}
              className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="City"
            />
            {errors.cityOrTown && <p className="mt-1 text-xs text-red-500">{errors.cityOrTown}</p>}
          </div>
        </div>

        {/* Privacy Notice */}
        <div className="rounded-lg bg-muted p-4">
          <p className="text-xs text-muted-foreground">
            <strong>Your Privacy:</strong> Your information is collected securely to process and
            acknowledge your donation. Wazee wa Mazingira will not sell or misuse your personal
            information.
          </p>
        </div>

        {/* Dedication Section */}
        <div className="space-y-4 border-t border-border pt-6">
          <div className="flex items-center gap-3">
            <Checkbox
              id="dedication-enabled"
              checked={dedication.enabled}
              onCheckedChange={(checked) =>
                handleDedicationChange("enabled", checked === true)
              }
            />
            <label htmlFor="dedication-enabled" className="text-sm font-medium cursor-pointer">
              Dedicate this donation to someone
            </label>
          </div>

          {dedication.enabled && (
            <div className="space-y-4 rounded-lg bg-muted p-4">
              {/* Dedication Type */}
              <div>
                <label className="text-sm font-medium">
                  Dedication Type <span className="text-red-500">*</span>
                </label>
                <div className="mt-2 space-y-2">
                  {[
                    { value: "honour", label: "In Honour Of" },
                    { value: "memory", label: "In Memory Of" },
                    { value: "love", label: "Dedicated To Someone I Love" },
                  ].map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="dedicationType"
                        value={option.value}
                        checked={dedication.type === option.value}
                        onChange={(e) =>
                          handleDedicationChange("type", e.target.value)
                        }
                        className="w-4 h-4"
                      />
                      <span className="text-sm">{option.label}</span>
                    </label>
                  ))}
                </div>
                {errors.dedicationType && (
                  <p className="mt-1 text-xs text-red-500">{errors.dedicationType}</p>
                )}
              </div>

              {/* Honouree Info */}
              {dedication.type && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm font-medium">
                        Honouree First Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={dedication.honoureeFirstName}
                        onChange={(e) =>
                          handleDedicationChange("honoureeFirstName", e.target.value)
                        }
                        className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                        placeholder="First name"
                      />
                      {errors.honoureeFirstName && (
                        <p className="mt-1 text-xs text-red-500">{errors.honoureeFirstName}</p>
                      )}
                    </div>
                    <div>
                      <label className="text-sm font-medium">
                        Honouree Last Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={dedication.honoureeLastName}
                        onChange={(e) =>
                          handleDedicationChange("honoureeLastName", e.target.value)
                        }
                        className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                        placeholder="Last name"
                      />
                      {errors.honoureeLastName && (
                        <p className="mt-1 text-xs text-red-500">{errors.honoureeLastName}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Dedication Message (Optional)</label>
                    <textarea
                      value={dedication.message}
                      onChange={(e) => handleDedicationChange("message", e.target.value)}
                      className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                      placeholder="Share your message..."
                      rows={3}
                    />
                  </div>

                  {/* Notification Option */}
                  <div className="border-t border-border pt-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <Checkbox
                        id="notification-requested"
                        checked={dedication.notificationRequested}
                        onCheckedChange={(checked) =>
                          handleDedicationChange("notificationRequested", checked === true)
                        }
                      />
                      <label htmlFor="notification-requested" className="text-sm font-medium cursor-pointer">
                        Notify someone about this dedication
                      </label>
                    </div>

                    {dedication.notificationRequested && (
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm font-medium">
                            Recipient Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={dedication.notificationRecipientName}
                            onChange={(e) =>
                              handleDedicationChange("notificationRecipientName", e.target.value)
                            }
                            className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                            placeholder="Full name"
                          />
                          {errors.notificationRecipientName && (
                            <p className="mt-1 text-xs text-red-500">{errors.notificationRecipientName}</p>
                          )}
                        </div>
                        <div>
                          <label className="text-sm font-medium">
                            Recipient Email <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            value={dedication.notificationRecipientEmail}
                            onChange={(e) =>
                              handleDedicationChange("notificationRecipientEmail", e.target.value)
                            }
                            className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                            placeholder="email@example.com"
                          />
                          {errors.notificationRecipientEmail && (
                            <p className="mt-1 text-xs text-red-500">{errors.notificationRecipientEmail}</p>
                          )}
                        </div>
                        <div>
                          <label className="text-sm font-medium">Personal Message (Optional)</label>
                          <textarea
                            value={dedication.notificationMessage}
                            onChange={(e) =>
                              handleDedicationChange("notificationMessage", e.target.value)
                            }
                            className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                            placeholder="Add a personal message..."
                            rows={2}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {errors.submit && <p className="text-sm text-red-500">{errors.submit}</p>}

        {/* Buttons */}
        <div className="flex gap-3 justify-end pt-4">
          <button
            type="button"
            onClick={() => {
              // This will be handled by the parent
            }}
            className="rounded-md border border-border px-6 py-2 hover:bg-muted"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={loading}
            className="rounded-md bg-accent px-6 py-2 text-accent-foreground hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Processing..." : "Continue to Donation"}
          </button>
        </div>
      </form>
    </div>
  );
}
