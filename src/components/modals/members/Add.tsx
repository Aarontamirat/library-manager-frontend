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

interface AddModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function Add({ isOpen, onClose, onSuccess }: AddModalProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFullName("");
    setEmail("");
    setPhoneNumber("");
  }, [isOpen]);

  const handleSubmit = async () => {
    // Check full name
    if (!fullName.trim()) {
      toast.error("Full name is required");
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

    // Check phone number
    if (!phoneNumber.trim()) {
      toast.error("Phone number is required");
      return;
    }

    setLoading(true);
    try {
      const res = await apiFetch("/members", {
        method: "POST",
        body: JSON.stringify({
          name: fullName,
          email,
          phone: phoneNumber,
          join_date: new Date().toISOString(),
        }),
      });
      onClose();
      onSuccess();
      toast.success("Member added successfully");
    } catch (err: any) {
      toast.error(err);
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
          <DialogTitle>Add New Member</DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-300">
            Add new member information
          </DialogDescription>
        </DialogHeader>

        {/* CONTENT */}
        <div className="space-y-4 mt-3">
          {/* Name */}
          <div>
            <Label className="block text-lg font-medium mb-1">Full Name</Label>
            <Input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="
              bg-white dark:bg-gray-800 
              border border-slate-300 dark:border-gray-700
            "
            />
          </div>

          {/* Email */}
          <div>
            <Label className="block text-lg font-medium mb-1">Email</Label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="
              bg-white dark:bg-gray-800 
              border border-slate-300 dark:border-gray-700
            "
            />
          </div>

          {/* phone number */}
          <div>
            <Label className="block text-lg font-medium mb-1">
              Phone Number
            </Label>
            <Input
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
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

            {loading ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
