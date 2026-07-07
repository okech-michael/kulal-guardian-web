import React, { createContext, useContext, useState } from "react";

type OpenFn = () => void;

const DonationModalContext = createContext<{ open: OpenFn } | null>(null);

export function DonationModalProvider({ children }: { children: React.ReactNode }) {
  const [, setCounter] = useState(0);
  const open = () => setCounter((c) => c + 1);

  return <DonationModalContext.Provider value={{ open }}>{children}</DonationModalContext.Provider>;
}

export function useDonationModal() {
  const ctx = useContext(DonationModalContext);
  if (!ctx) throw new Error("useDonationModal must be used within DonationModalProvider");
  return ctx;
}
