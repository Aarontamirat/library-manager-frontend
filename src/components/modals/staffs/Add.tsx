"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { apiFetch } from "@/lib/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface AddModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: any;
  onSuccess: () => void;
}

export default function Add({ isOpen, onClose, onSuccess }: AddModalProps) {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("librarian");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setUserName("");
    setEmail("");
    setRole("librarian");
    setPassword("");
    setConfirmPassword("");
  }, [isOpen]);

  const handleSubmit = async () => {
    // Check full name
    if (!userName.trim()) {
      toast.error("Username is required");
      return;
    }

    // Check email
    if (!email.trim()) {
      toast.error("Email is required");
      return;
    }

    // Check email validity
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Invalid email format");
      return;
    }

    // Check Role
    if (!role.trim()) {
      toast.error("Role is required");
      return;
    }

    // Check Password
    if (!password.trim()) {
      toast.error("Password is required");
      return;
    }

    // Check Confirm Password
    if (!confirmPassword.trim()) {
      toast.error("Confirm Password is required");
      return;
    }

    // Check Password and Confirm Password
    if (password !== confirmPassword) {
      toast.error("Password and Confirm Password do not match");
      return;
    }

    setLoading(true);
    try {
      const res = await apiFetch("/staff", {
        method: "POST",
        body: JSON.stringify({
          username: userName,
          email,
          password,
          role,
        }),
      });
      onClose();
      onSuccess();
      toast.success("Staff member added successfully");
    } catch (err: any) {
      toast.error(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="
      max-w-lg 
      bg-linear-to-br 
      from-white via-slate-100 to-white 
      dark:from-gray-700 dark:via-gray-800 dark:to-gray-700
      text-gray-900 dark:text-gray-100
      border border-slate-300 dark:border-gray-700
    "
      >
        <DialogHeader>
          <DialogTitle>Add New Staff Member</DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-300">
            Enter the details for the new staff member
          </DialogDescription>
        </DialogHeader>

        {/* CONTENT */}
        <div className="space-y-4 mt-3">
          {/* Username */}
          <div>
            <Label className="block text-lg font-medium mb-1">Username</Label>
            <Input
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="
              bg-white dark:bg-gray-800 
              border border-slate-300 dark:border-gray-700
            "
            />
          </div>

          {/* Email */}
          <div>
            <Label className="block text-lg font-medium mb-1">
              Email Address
            </Label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="
              bg-white dark:bg-gray-800 
              border border-slate-300 dark:border-gray-700
            "
            />
          </div>

          {/* Role */}
          <div>
            <Label className="block text-lg font-medium mb-1">Role</Label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger
                className="
                          w-full mt-1  py-3
                          bg-white dark:bg-gray-800 
                          border border-slate-300 dark:border-gray-700
                        "
              >
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                <SelectItem value="librarian">Librarian</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Password */}
          <div>
            <Label className="block text-lg font-medium mb-1">Password</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="
              bg-white dark:bg-gray-800 
              border border-slate-300 dark:border-gray-700
            "
            />
          </div>

          {/* Confirm Password */}
          <div>
            <Label className="block text-lg font-medium mb-1">
              Confirm Password
            </Label>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="
              bg-white dark:bg-gray-800 
              border border-slate-300 dark:border-gray-700
            "
            />
          </div>
        </div>

        {/* FOOTER */}
        <DialogFooter className="mt-4 flex justify-end space-x-2">
          <Button
            variant="outline"
            className="
          bg-white dark:bg-gray-700 
          text-gray-900 dark:text-gray-100
          border border-slate-300 dark:border-gray-700
        "
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>

          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="
          flex items-center gap-2 
          bg-transparent 
          border border-cyan-400 
          text-cyan-500 
          hover:bg-cyan-400 hover:text-gray-900
          dark:text-cyan-300 dark:hover:text-gray-900
        "
          >
            {loading && (
              <svg
                className="animate-spin h-4 w-4 text-cyan-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            )}

            {loading ? "Creating..." : "Create Staff"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
