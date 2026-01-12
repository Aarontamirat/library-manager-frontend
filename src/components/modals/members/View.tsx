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

interface ViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  memberData: any;
  borrowedCount: number;
}

export default function View({
  isOpen,
  onClose,
  memberData,
  borrowedCount,
}: ViewModalProps) {
  if (!memberData) return null;
  const name = memberData.name;
  const email = memberData.email;
  const phone = memberData.phone;
  const join_date = memberData.join_date;
  //   const genre = memberData.genre.name;

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
          <DialogTitle>View Member</DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-300">
            View Member details
          </DialogDescription>
        </DialogHeader>

        {/* CONTENT */}
        <DialogContent className="space-y-4 text-xl">
          <div className="space-y-1">
            <div className="mb-8 text-xl">
              <h2 className="text-2xl font-bold">{name}</h2>
              <p className="text-lg text-gray-600">Member Details</p>
            </div>
            <div className="space-y-6">
              <div className="grid grid-cols-3">
                <p className="font-semibold">Name:</p>
                <p className="col-span-2">{name}</p>
              </div>
              <div className="grid grid-cols-3">
                <p className="font-semibold">Email:</p>
                <p className="col-span-2">{email}</p>
              </div>
              <div className="grid grid-cols-3">
                <p className="font-semibold">Phone:</p>
                <p className=" col-span-2">{phone}</p>
              </div>
              <div className="grid grid-cols-3">
                <p className="font-semibold">Joined:</p>
                <p className=" col-span-2">{join_date}</p>
              </div>
              <div className="grid grid-cols-3">
                <p className="font-semibold">Active Borrows:</p>
                <p className="text-base col-span-2">
                  <span
                    className={`font-semibold rounded-full px-4 ${
                      borrowedCount > 0
                        ? "bg-black dark:bg-white text-neutral-50 dark:text-black"
                        : "bg-gray-300 dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                    }`}
                  >
                    {borrowedCount} books
                  </span>
                </p>
              </div>
              <div className="grid grid-cols-3">
                <p className="font-semibold">Status:</p>
                <p className="text-base col-span-2">
                  <span
                    className={`font-semibold rounded-full px-4 ${
                      1 > 0
                        ? "bg-black dark:bg-white text-neutral-50 dark:text-black"
                        : "bg-red-400 text-white"
                    }`}
                  >
                    {1 > 0 ? "Active Member" : "Not Active"}
                  </span>
                </p>
              </div>
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
