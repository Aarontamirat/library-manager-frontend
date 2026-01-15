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
import { Mail, Shield, User } from "lucide-react";

interface ViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  memberData: any;
}

export default function View({ isOpen, onClose, memberData }: ViewModalProps) {
  if (!memberData) return null;
  const userName = memberData.username;
  const email = memberData.email;
  const role = memberData.role;

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
          <DialogTitle>View Staff Member</DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-300">
            View staff member details
          </DialogDescription>
        </DialogHeader>

        {/* CONTENT */}
        <div className="space-y-4 text-xl">
          <div className="space-y-1">
            <div className="mb-8 text-xl">
              <h2 className="text-2xl font-bold">{userName}</h2>
              <p className="text-lg text-gray-600">Member Details</p>
            </div>
            <div className="space-y-6">
              <div className="grid grid-cols-3">
                <p className="font-semibold">Username:</p>
                <div className="col-span-2 flex space-x-2 items-center">
                  <User size={20} />
                  <p>{userName}</p>
                </div>
              </div>
              <div className="grid grid-cols-3">
                <p className="font-semibold">Email:</p>
                <div className="col-span-2 flex space-x-2 items-center">
                  <Mail size={20} />
                  <p>{email}</p>
                </div>
              </div>
              <div className="grid grid-cols-3">
                <p className="font-semibold">Role:</p>
                <div className="col-span-2 flex space-x-2 items-center">
                  <Shield size={20} />
                  <p>{role}</p>
                </div>
              </div>
            </div>
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
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
