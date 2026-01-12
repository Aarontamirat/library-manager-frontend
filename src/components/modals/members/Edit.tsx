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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!memberData) return;
    setId(memberData.id);
    setName(memberData.name);
    setEmail(memberData.email);
    setPhoneNumber(memberData.phone);
  }, [memberData, isOpen]);

  if (!memberData) return null;

  const handleSubmit = async () => {
    // Check full name
    if (!name.trim()) {
      console.log("Full name is required");
      return;
    }

    // Check email
    if (!email.trim()) {
      console.log("Email is required");
      return;
    }

    // Check email validity
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log("Invalid email format");
      return;
    }

    // Check phone number
    if (!phoneNumber.trim()) {
      console.log("Phone number is required");
      return;
    }

    setLoading(true);
    try {
      const res = await apiFetch(`/members/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
          name,
          email,
          phone: phoneNumber,
        }),
      });
      onClose();
      onSuccess();
    } catch (err: any) {
      console.log(err);
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
          <DialogTitle>Edit Member</DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-300">
            Edit member information
          </DialogDescription>
        </DialogHeader>

        {/* CONTENT */}
        <div className="space-y-4 mt-3">
          {/* name */}
          <div>
            <label className="block text-lg font-medium mb-1">Full Name</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
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

          {/* phoneNumber */}
          <div>
            <label className="block text-lg font-medium mb-1">
              Phone Number
            </label>
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
