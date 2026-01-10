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

interface AddModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: any;
  onSuccess: () => void;
}

export default function Add({ isOpen, onClose, onSuccess }: AddModalProps) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published_year, setPublishedYear] = useState(0);
  const [available_copies, setAvailableCopies] = useState(0);
  const [genres, setGenres] = useState([]);
  const [genre_id, setGenreId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTitle("");
    setAuthor("");
    setPublishedYear(0);
    setAvailableCopies(0);
    setGenreId("");
  }, [isOpen]);

  const fetchGenres = async () => {
    try {
      const genreData = await apiFetch("/genres");
      setGenres(genreData);
    } catch (err: any) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  const handleSubmit = async () => {
    if (!title.trim()) {
      console.log("Title is invalid or invalid type");
      return;
    }
    if (!author.trim()) {
      console.log("Author is invalid or invalid type");
      return;
    }

    setLoading(true);
    try {
      const res = await apiFetch("/books", {
        method: "POST",
        body: JSON.stringify({
          title,
          author,
          published_year,
          available_copies,
          genre_id,
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
          <DialogTitle>Add New Book</DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-300">
            Add new book information
          </DialogDescription>
        </DialogHeader>

        {/* CONTENT */}
        <div className="space-y-4 mt-3">
          {/* TITLE */}
          <div>
            <label className="block text-lg font-medium mb-1">Title</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="
              bg-white dark:bg-gray-800 
              border border-slate-300 dark:border-gray-700
            "
            />
          </div>

          {/* Author */}
          <div>
            <label className="block text-lg font-medium mb-1">Author</label>
            <Input
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="
              bg-white dark:bg-gray-800 
              border border-slate-300 dark:border-gray-700
            "
            />
          </div>

          {/* published_year */}
          <div>
            <label className="block text-lg font-medium mb-1">
              Published Year
            </label>
            <Input
              value={published_year || new Date().getFullYear().toString()}
              onChange={(e) => setPublishedYear(Number(e.target.value))}
              className="
              bg-white dark:bg-gray-800 
              border border-slate-300 dark:border-gray-700
            "
            />
          </div>

          {/* available_copies */}
          <div>
            <label className="block text-lg font-medium mb-1">
              Available Copies
            </label>
            <Input
              value={available_copies}
              onChange={(e) => setAvailableCopies(Number(e.target.value))}
              className="
              bg-white dark:bg-gray-800 
              border border-slate-300 dark:border-gray-700
            "
            />
          </div>

          {/* Select Genre */}
          <Label className="block text-lg font-medium mb-1">Genre</Label>
          <Select value={genre_id} onValueChange={setGenreId}>
            <SelectTrigger
              className="
              w-full mt-1 
              bg-white dark:bg-gray-800 
              border border-slate-300 dark:border-gray-700
            "
            >
              <SelectValue placeholder="Select a genre" />
            </SelectTrigger>

            <SelectContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
              {genres.map((genre: any) => (
                <SelectItem
                  key={genre.id}
                  value={genre.id}
                  className="whitespace-nowrap"
                >
                  {genre.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
