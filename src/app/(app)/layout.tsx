"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { DNA } from "react-loader-spinner";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace("/login");
    } else {
      setCheckingAuth(false);
    }
  }, [router]);

  if (checkingAuth) {
    return (
      <div className="flex h-screen items-center justify-center">
        <DNA height="80" width="80" ariaLabel="dna-loading" />
      </div>
    );
  }

  return (
    <div className="md:flex h-screen relative">
      {/* Sidebar */}
      <div className="fixed md:relative z-20">
        <div className="fixed top-3 left-3 z-30 md:hidden">
          <Button
            variant="secondary"
            size="icon"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        <div
          className={`absolute top-0 left-0 bottom-0 md:relative
          ${menuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          transition-transform duration-300 ease-in-out`}
        >
          <Sidebar />
        </div>
      </div>

      {/* Click-outside overlay (mobile only) */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-10 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <div
        className={`md:flex md:flex-1 md:flex-col ${
          menuOpen ? "brightness-50 md:brightness-100" : ""
        }`}
      >
        <Topbar />
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-800 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
