"use client";

import { useRouter } from "next/navigation";
import { removeToken } from "@/lib/auth";

export default function LogoutButton() {
  const router = useRouter();

  function handleLogout() {
    removeToken();
    router.push("/login");
  }

  return (
    <button
      onClick={handleLogout}
      className="rounded bg-red-500 px-3 py-1 text-white"
    >
      Logout
    </button>
  );
}
