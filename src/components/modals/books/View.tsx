"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookData: any;
}

export default function View({ isOpen, onClose, bookData }: ViewModalProps) {
  if (!bookData) return null;
  const title = bookData.title;
  const author = bookData.author;
  const published_year = bookData.published_year;
  const available_copies = bookData.available_copies;
  const genre = bookData.genre.name;

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
          <DialogTitle>View Book</DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-300">
            View book information
          </DialogDescription>
        </DialogHeader>

        {/* CONTENT */}
        <DialogContent className="space-y-4 text-xl">
          <div className="space-y-4">
            <div className="mb-8 text-xl">
              <h2 className="text-2xl font-bold">{title}</h2>
              <p className="text-lg text-gray-600">Book Details</p>
            </div>
            <div className="grid grid-cols-3">
              <p className="font-semibold">Author:</p>
              <p className="col-span-2">{author}</p>
            </div>
            <div className="grid grid-cols-3">
              <p className="font-semibold">Genre:</p>
              <p className="font-semibold col-span-2">
                <span className="text-base bg-neutral-100 px-2">{genre}</span>
              </p>
            </div>
            <div className="grid grid-cols-3">
              <p className="font-semibold">Published:</p>
              <p className=" col-span-2">{published_year}</p>
            </div>
            <div className="grid grid-cols-3">
              <p className="font-semibold">Available:</p>
              <p className="text-base col-span-2">
                <span
                  className={`font-semibold rounded-full px-4 ${
                    available_copies > 0
                      ? "bg-black dark:bg-white text-neutral-50 dark:text-black"
                      : "bg-red-400 text-white"
                  }`}
                >
                  {available_copies} copies
                </span>
              </p>
            </div>
            <div className="grid grid-cols-3">
              <p className="font-semibold">Status:</p>
              <p className="text-base col-span-2">
                <span
                  className={`font-semibold rounded-full px-4 ${
                    available_copies > 0
                      ? "bg-black dark:bg-white text-neutral-50 dark:text-black"
                      : "bg-red-400 text-white"
                  }`}
                >
                  {available_copies > 0 ? "available" : "Out of Stock"}
                </span>
              </p>
            </div>
          </div>
        </DialogContent>

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
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
