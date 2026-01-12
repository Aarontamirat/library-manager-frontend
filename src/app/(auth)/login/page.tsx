"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { setToken } from "@/lib/auth";
import { BookOpen } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { setUserEmail, setUserId, setUsername, setUserRole } from "@/lib/user";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      setToken(data.access_token);
      setUserId(data.user.id);
      setUsername(data.user.username);
      setUserEmail(data.user.email);
      setUserRole(data.user.role);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded bg-white dark:bg-gray-800 p-6 shadow space-y-5"
      >
        {/* logo */}
        <div className="flex justify-center">
          <BookOpen className="h-12 w-12 text-blue-600" />
        </div>
        {/* Title and description */}
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Library Manager System
          </h1>
          <p className="text-base text-gray-600">Sign in to your account to continue</p>
        </div>
        {/* Email and Password Input Section */}
        <div className="space-y-5">
          {/* Email */}
          <Label className="text-gray-800" htmlFor="email">Email</Label>
          <Input 
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
          {/* Password */}
          <Label className="text-gray-800" htmlFor="password">Password</Label>
          <Input 
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
          {/* Sign In Button */}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </Button>
          {/* Error */}
          {error && <p className="text-red-500">{error}</p>}
          <hr />
          {/* login Information */}
          <div className="text-xs text-gray-600 space-y-2">
            <p className="flex justify-center">
              Test Credentials
            </p>
            <div className="flex justify-between items-center">
              {/* type of account */}
              <div className="space-y-1">
                <p>Admin:</p>
                <p>Librarian:</p>
              </div>
              {/* credentials */}
              <div className="space-y-1">
                <p>admin@gmail.com</p>
                <p>librarian@gmail.com</p>
              </div>
            </div>
          </div>
          </div>
      </form>
    </div>
  );
}
