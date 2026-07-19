"use client";

import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import PageTransition from "@/components/dashboard/PageTransition";

export default function AppShellClient({
  student,
  children,
}: {
  student: { name: string; initials: string; coins: number; level: number; streak: number };
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="paper-grain min-h-screen bg-paper md:flex">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="min-w-0 flex-1">
        <Topbar onMenu={() => setSidebarOpen(true)} student={student} />
        <main className="mx-auto max-w-6xl px-5 py-6 md:px-8 md:py-8">
          <PageTransition>{children}</PageTransition>
        </main>
      </div>
    </div>
  );
}
