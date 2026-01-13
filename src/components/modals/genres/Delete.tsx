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
import { apiFetch } from "@/lib/api";
import { toast } from "sonner";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  genreData: any;
  onSuccess: () => void;
}

export default function Delete({
  isOpen,
  onClose,
  genreData,
  onSuccess,
}: EditModalProps) {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!genreData) return;
    setId(genreData.id);
    setName(genreData.name);
  }, [genreData, isOpen]);

  if (!genreData) return null;

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await apiFetch(`/genres/${id}`, {
        method: "DELETE",
      });
      onClose();
      onSuccess();
      toast.success("Genre deleted successfully");
    } catch (err: any) {
      toast.error(err.message);
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
          <DialogTitle className="text-xl">Delete Genre</DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-300 text-base">
            Delete genre
          </DialogDescription>
        </DialogHeader>

        {/* CONTENT */}
        <div className="space-y-4 mt-3">
          <p className="text-gray-500">
            Are you sure you want to delete "{name}"? This action cannot be
            undone.
          </p>
        </div>

        {/* FOOTER */}
        <DialogFooter className="mt-4 flex justify-end space-x-2">
          <Button
            variant="outline"
            className="
          bg-white dark:bg-gray-700 
          text-gray-900 dark:text-gray-100
          border border-slate-300 dark:border-gray-700 text-lg
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
          border border-red-400 
          text-red-500 
          hover:bg-red-400 hover:text-gray-50
          dark:text-red-300 dark:hover:text-gray-900 text-lg
        "
          >
            {loading && (
              <svg
                className="animate-spin h-4 w-4 text-red-400"
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

            {loading ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
