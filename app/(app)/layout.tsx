"use client";

import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="paper-grain min-h-screen bg-paper md:flex">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="min-w-0 flex-1">
        <Topbar onMenu={() => setSidebarOpen(true)} />
        <main className="mx-auto max-w-6xl px-5 py-6 md:px-8 md:py-8">{children}</main>
      </div>
    </div>
  );
}
