import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { apiFetch } from "@/lib/api";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface returnBookProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function ReturnBook({
  isOpen,
  onClose,
  onSuccess,
}: returnBookProps) {
  const [books, setBooks] = useState([]);
  const [borrowRecordId, setBorrowRecordId] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch books that are not returned yet from the borrowed records list
  const fetchBorrowedRecords = async () => {
    // get the books
    try {
      const data = await apiFetch("/borrow-records", {
        method: "GET",
      });

      // remove the books that are returned
      const borrowedRecords = data.filter(
        (record: any) => record.return_date === null
      );

      setBooks(borrowedRecords);
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  // iif it is open, fetch the books
  useEffect(() => {
    if (isOpen) {
      fetchBorrowedRecords();
    }
  }, [isOpen]);

  useEffect(() => {
    fetchBorrowedRecords();
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await apiFetch(`/borrow-records/return`, {
        method: "POST",
        body: JSON.stringify({
          borrow_record_id: borrowRecordId,
        }),
      });
      setBorrowRecordId("");
      onClose();
      onSuccess();
      toast.success("Book returned successfully");
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="max-w-lg bg-linear-to-br 
      from-white via-slate-100 to-white 
      dark:from-gray-700 dark:via-gray-800 dark:to-gray-700
      text-gray-900 dark:text-gray-100
      border border-slate-300 dark:border-gray-700"
      >
        <DialogHeader>
          <DialogTitle className="text-2xl">Return Book</DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-300">
            Select a borrowed book to mark as returned.
          </DialogDescription>
        </DialogHeader>

        {/* Unreturned books */}
        <div className="mt-5 space-y-5">
          <Label className="block font-medium mb-1">
            Select a book to return
          </Label>
          <Select value={borrowRecordId} onValueChange={setBorrowRecordId}>
            <SelectTrigger className="w-full py-6 bg-white dark:bg-gray-800 border border-slate-300 dark:border-gray-700">
              <SelectValue placeholder="Choose a book to return" />
            </SelectTrigger>

            <SelectContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
              {books.map((b: any) => (
                <SelectItem
                  key={b.id}
                  value={b.id}
                  className="whitespace-nowrap"
                >
                  <div className="flex flex-col">
                    <p className="text-black font-semibold">{b.book.title}</p>
                    <div className="flex gap-2">
                      <p className="text-gray-600 font-semibold">
                        by {b.book.author}
                        {""}
                      </p>
                      <p className="text-gray-600 font-semibold">
                        {" -  "}
                        {b.member.name}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <p className="text-gray-700">Due Date:</p>
                      <p className="text-gray-600">{b.due_date}</p>
                    </div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <hr />
          <div className="">
            <p className="text-gray-700">Return Date</p>
            <p className="text-gray-600">{new Date().toLocaleDateString()}</p>
          </div>
        </div>

        {/* Footer */}
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

            {loading ? "Returning..." : "Return Book"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
