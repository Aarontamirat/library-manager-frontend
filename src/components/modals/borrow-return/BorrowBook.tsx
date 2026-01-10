import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { apiFetch } from "@/lib/api";

interface BorrowBookProps {
  isOpen: boolean;
  onClose: () => void;
  borrowBookData: any;
  onSuccess: () => void;
}

export default function BorrowBook({
  isOpen,
  onClose,
  borrowBookData,
  onSuccess,
}: BorrowBookProps) {
  const [books, setBooks] = useState([]);
  const [bookId, setBookId] = useState("");
  const [members, setMembers] = useState([]);
  const [memberId, setMemberId] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchBooks = async () => {
    // Get books
    try {
      const data = await apiFetch("/books", {
        method: "GET",
      });

      setBooks(data);
    } catch (err: any) {
      console.log(err);
    }
  };

  const fetchMembers = async () => {
    // Get members
    try {
      const data = await apiFetch("/members", {
        method: "GET",
      });

      setMembers(data);
    } catch (err: any) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBooks();
    fetchMembers();
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await apiFetch("/borrow-records/borrow", {
        method: "POST",
        body: JSON.stringify({
          book_id: bookId,
          member_id: memberId,
          due_date: dueDate,
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
      max-w-lg text-base
      bg-linear-to-br 
      from-white via-slate-100 to-white 
      dark:from-gray-700 dark:via-gray-800 dark:to-gray-700
      text-gray-900 dark:text-gray-100
      border border-slate-300 dark:border-gray-700
    "
      >
        <DialogHeader>
          <DialogTitle className="text-2xl">Borrow Book</DialogTitle>
          <DialogDescription className="text-md text-gray-600 dark:text-gray-300">
            Select a book and member to create a new borrow record
          </DialogDescription>
        </DialogHeader>

        {/* Books */}
        <div className="mt-5">
          <Label className="block text-xl font-medium mb-1">Select Book</Label>
          <Select value={bookId} onValueChange={setBookId}>
            <SelectTrigger
              className="
                          w-full mt-1 text-lg py-6
                          bg-white dark:bg-gray-800 
                          border border-slate-300 dark:border-gray-700
                        "
            >
              <SelectValue placeholder="Choose a Book to Borrow" />
            </SelectTrigger>

            <SelectContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
              {books.map((book: any) => (
                <SelectItem
                  key={book.id}
                  value={book.id}
                  className="whitespace-nowrap"
                >
                  <div className="flex flex-col text-base">
                    <p className="text-black font-semibold">{book.title}</p>
                    <p className="text-gray-600 font-semibold">
                      by <span> {book.author}</span> -{" "}
                      <span>{book.available_copies} available</span>
                    </p>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Members */}
        <div className="mt-5">
          <Label className="block text-xl font-medium mb-1">
            Select Member
          </Label>
          <Select value={memberId} onValueChange={setMemberId}>
            <SelectTrigger
              className="
                          w-full mt-1 text-lg py-6
                          bg-white dark:bg-gray-800 
                          border border-slate-300 dark:border-gray-700
                        "
            >
              <SelectValue placeholder="Choose a Book to Borrow" />
            </SelectTrigger>

            <SelectContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
              {members.map((member: any) => (
                <SelectItem
                  key={member.id}
                  value={member.id}
                  className="whitespace-nowrap"
                >
                  <div className="flex flex-col text-base">
                    <p className="text-black font-semibold">{member.name}</p>
                    <p className="text-gray-600 font-semibold">
                      <span> {member.email}</span>
                    </p>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Due Date */}
        <div className="mt-5">
          <Label className="block text-xl font-medium mb-1">Due Date</Label>
          <Input
            type="date"
            value={dueDate}
            onChange={(e) => {
              setDueDate((e.target as HTMLInputElement).value);
            }}
            className="
            w-full mt-1 text-xl py-6
            bg-white dark:bg-gray-800 
            border border-slate-300 dark:border-gray-700
          "
          />
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

            {loading ? "Borrowing..." : "Borrow Book"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
