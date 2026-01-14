"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function Home() {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const testConnection = async () => {
      try {
        await apiFetch("/auth/users");
        setIsConnected(true);
      } catch {
        setIsConnected(false);
      }
    };

    testConnection();
  }, []);

  useEffect(() => {
    if (isConnected === true) {
      router.replace("/dashboard");
    }
  }, [isConnected, router]);

  return null;
}
