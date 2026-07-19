"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { WalletApi } from "@/services/wallet.api";

interface WalletState {
  todayCoins: number;
  lifetimeCoins: number;
  pendingSync: number;
  storeCredit: number;
}

interface WalletContextValue {
  wallet: WalletState | null;
  loading: boolean;
  refresh: () => void;
}

const WalletContext = createContext<WalletContextValue | null>(null);

/**
 * NOT currently mounted - see AuthProvider.tsx for why. Dashboard, Topbar,
 * and the Earn page all read wallet data directly via WalletApi today,
 * which is correct and sufficient until there's a real backend pushing
 * live balance updates (e.g. after a mission completes elsewhere in the
 * app). Wire this in when that becomes necessary.
 */
export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [wallet, setWallet] = useState<WalletState | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(() => {
    setLoading(true);
    WalletApi.getWallet()
      .then(setWallet)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refresh();
  }, [refresh]);

  return <WalletContext.Provider value={{ wallet, loading, refresh }}>{children}</WalletContext.Provider>;
}

export function useWallet() {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error("useWallet must be used within a WalletProvider");
  return ctx;
}
