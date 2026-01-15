"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated, getToken } from "@/lib/auth";
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
        <DNA
          visible={true}
          height="80"
          width="80"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
        />
      </div>
    );
  }

  return (
    <div className="md:flex h-screen">
      <div className="">
        <div className="absolute top-3 left-3 z-20 md:hidden">
          <Button
            className=""
            variant="secondary"
            size="icon"
            onClick={() => {
              setMenuOpen(!menuOpen);
            }}
          >
            {menuOpen ? <X /> : <Menu />}
          </Button>
        </div>
        <div
          className={`absolute top-0 left-0 bottom-0 z-10 md:relative ${
            menuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }  transition-all ease-in-out duration-1300`}
        >
          <Sidebar />
        </div>
      </div>
      <div className="md:flex md:flex-1 md:flex-col">
        <Topbar />
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-800 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
