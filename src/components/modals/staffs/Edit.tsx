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
import { toast } from "sonner";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  memberData: any;
  onSuccess: () => void;
}

export default function EditModal({
  isOpen,
  onClose,
  memberData,
  onSuccess,
}: EditModalProps) {
  const [id, setId] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!memberData) return;
    setId(memberData.id);
    setUserName(memberData.username);
    setEmail(memberData.email);
    setRole(memberData.role);
  }, [memberData, isOpen]);

  if (!memberData) return null;

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

    // Check Password
    if (!password.trim()) {
      toast.error("Password is required");
      return;
    }

    // Check confirm password
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    // Check password and Confirm password match
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    // Check role
    if (!role.trim()) {
      toast.error("Role is required");
      return;
    }

    setLoading(true);
    try {
      const res = await apiFetch(`/staff/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
          username: userName,
          email,
          password,
          role,
        }),
      });
      onClose();
      onSuccess();
      toast.success("Staff member updated successfully");
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
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
          <DialogTitle>Edit Staff Member</DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-300">
            Edit staff member information
          </DialogDescription>
        </DialogHeader>

        {/* CONTENT */}
        <div className="space-y-4 mt-3">
          {/* name */}
          <div>
            <label className="block text-lg font-medium mb-1">Username</label>
            <Input
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="
              bg-white dark:bg-gray-800 
              border border-slate-300 dark:border-gray-700
            "
            />
          </div>

          {/* email */}
          <div>
            <label className="block text-lg font-medium mb-1">Email</label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="
              bg-white dark:bg-gray-800 
              border border-slate-300 dark:border-gray-700
            "
            />
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

          {/* Role */}
          <div>
            <Label className="block text-lg font-medium mb-1">Role</Label>
            <Input
              value={role}
              onChange={(e) => setRole(e.target.value)}
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

            {loading ? "Updating..." : "Update Staff"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
