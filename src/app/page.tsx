"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

export default function Home() {
  const [status, setStatus] = useState("Not connected");

  useEffect(() => {
    async function testConnection() {
      try {
        await apiFetch("/auth/users");
        setStatus("Connected to backend API");
      } catch {
        setStatus("Failed to connect to backend");
      }
    }

    testConnection();
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center gap-4">
      <h2 className="text-2xl font-semibold">{status}</h2>
    </main>
  );
}
