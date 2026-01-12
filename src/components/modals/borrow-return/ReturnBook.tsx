import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { apiFetch } from "@/lib/api";
import { useEffect, useState } from "react";

interface returnBookProps {
  isOpen: boolean;
  onClose: () => void;
  borrowBookData: any;
  onSuccess: () => void;
}

export default function ReturnBook({
  isOpen,
  onClose,
  borrowBookData,
  onSuccess,
}: returnBookProps) {
  const [books, setBooks] = useState([]);
  const [bookId, setBookId] = useState("");
  const [returnDate, setReturnDate] = useState("");
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
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBorrowedRecords();
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="max-w-lg bg-linear-to-br 
      from-white via-slate-100 to-white 
      dark:from-gray-700 dark:via-gray-800 dark:to-gray-700
      text-gray-900 dark:text-gray-100
      border border-slate-300 dark:border-gray-700"
      >
        <DialogHeader></DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
