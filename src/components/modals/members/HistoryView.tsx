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
import { apiFetch } from "@/lib/api";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { DNA } from "react-loader-spinner";

interface ViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  memberData: any;
}

export default function HistoryView({
  isOpen,
  onClose,
  memberData,
}: ViewModalProps) {
  const [borrowHistory, setBorrowHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  //   Reset state
  useEffect(() => {
    if (!isOpen) {
      setBorrowHistory([]);
      setLoading(false);
    }
  }, [isOpen]);

  //   Fetch borrowing history
  useEffect(() => {
    if (!isOpen || !memberData?.id) return;

    const fetchBorrowingHistory = async () => {
      try {
        setLoading(true);
        const res = await apiFetch(
          `/members/${memberData.id}/borrowing-history`
        );
        setBorrowHistory(res ?? []);
      } catch (err: any) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBorrowingHistory();
  }, [isOpen, memberData]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="
          max-w-5xl
          p-0
          overflow-hidden
          bg-linear-to-br
          from-white via-slate-100 to-white
          dark:from-gray-800 dark:via-gray-900 dark:to-gray-800
          text-gray-900 dark:text-gray-100
          border border-slate-300 dark:border-gray-700
        "
      >
        {/* HEADER */}
        <DialogHeader className="px-6 py-4 border-b dark:border-gray-700">
          <DialogTitle className="text-2xl font-bold">
            Borrowing History
          </DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-400">
            Detailed borrowing records for this member
          </DialogDescription>
        </DialogHeader>

        {/* Contebt */}
        <div className="px-6 py-4 max-h-[65vh] overflow-y-auto space-y-6">
          {loading && (
            <div className="flex justify-center">
              <DNA
                visible={true}
                height="80"
                width="80"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
              />
            </div>
          )}

          {!loading && borrowHistory.length === 0 && (
            <p className="text-center text-gray-500">
              No borrowing history found.
            </p>
          )}

          {borrowHistory.map((history: any) => (
            <div
              key={history.id}
              className="
                rounded-xl
                border
                bg-white
                dark:bg-gray-800
                dark:border-gray-700
                p-6
                shadow-sm
                space-y-4
              "
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3">
                <Info label="Book Title" value={history.book.title} />
                <Info label="Author" value={history.book.author} />
                <Info
                  label="Published Year"
                  value={history.book.published_year}
                />
                <Info label="Genre" value={history.book.genre.name} />
                <Info label="Borrowed Date" value={history.borrow_date} />
                <Info label="Due Date" value={history.due_date} />
                <Info
                  label="Return Date"
                  value={history.return_date ?? "Not Returned"}
                  highlight={!history.return_date}
                />
              </div>
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <DialogFooter className="px-6 py-4 border-t dark:border-gray-700">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Reuse the infos
function Info({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex flex-col space-y-1">
      <Label className="text-sm text-gray-500 dark:text-gray-400">
        {label}
      </Label>
      <p className={`text-base font-medium ${highlight ? "text-red-500" : ""}`}>
        {value}
      </p>
    </div>
  );
}
