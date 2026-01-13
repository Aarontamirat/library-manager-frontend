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
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setName("");
  }, [isOpen]);

  const handleSubmit = async () => {
    // Check genre name
    if (!name.trim()) {
      toast.error("Genre name is required");
      return;
    }

    setLoading(true);
    try {
      const res = await apiFetch("/genres", {
        method: "POST",
        body: JSON.stringify({
          name,
        }),
      });
      onClose();
      onSuccess();
      toast.success("Genre added successfully");
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
          <DialogTitle>Add New Genre</DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-300">
            Add new genre information
          </DialogDescription>
        </DialogHeader>

        {/* CONTENT */}
        <div className="space-y-4 mt-3">
          {/* Name */}
          <div>
            <Label className="block text-lg font-medium mb-1">Genre Name</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
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
