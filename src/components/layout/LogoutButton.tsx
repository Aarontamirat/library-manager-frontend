"use client";

import { useRouter } from "next/navigation";
import { removeToken } from "@/lib/auth";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const router = useRouter();

  function handleLogout() {
    removeToken();
    router.push("/login");
  }

  return (
    // <button
    //   onClick={handleLogout}
    //   className=""
    // >
    //   Logout
    // </button>
    <div className="flex items-center cursor-pointer" onClick={handleLogout} title="Logout">
      <LogOut className="mr-3 w-4 h-4"/>
      <p>Logout</p>
    </div>
  );
}
