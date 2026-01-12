"use client";

import { Button } from "@/components/ui/button";
import {
  ArrowLeftRight,
  BookOpen,
  Calendar,
  Edit,
  Eye,
  Filter,
  Plus,
  SearchIcon,
  Trash,
  Trash2,
  User,
} from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useState, useEffect } from "react";
import { apiFetch } from "@/lib/api";
import BorrowBook from "@/components/modals/borrow-return/BorrowBook";
import ReturnBook from "@/components/modals/borrow-return/ReturnBook";

export default function Books() {
  const [borrowRecords, setBorrowRecords] = useState([]);
  const [isBorrowModalOpen, setIsBorrowModalOpen] = useState(false);
  const [isReturnModalOpen, setIsReturnModalOpen] = useState(false);

  const fetchBorrowRecords = async () => {
    // Get books
    try {
      const data = await apiFetch("/borrow-records", {
        method: "GET",
      });

      setBorrowRecords(data);
    } catch (err: any) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBorrowRecords();
  }, []);

  const now = new Date().toISOString().split("T")[0];

  return (
    <div>
      {/* Header */}
      <div className="h-20 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Borrow & Return</h1>
          <p className="mt-1 text-gray-500">
            Manage book borrowing and return operations
          </p>
        </div>
        <div className="text-base space-x-2">
          <Button
            variant="default"
            size="lg"
            className=""
            onClick={() => setIsBorrowModalOpen(true)}
          >
            <ArrowLeftRight />
            Borrow Book
          </Button>

          <Button
            variant="outline"
            size="lg"
            className=""
            onClick={() => setIsReturnModalOpen(true)}
          >
            <ArrowLeftRight />
            Return Book
          </Button>
        </div>
      </div>
      {/* Content */}
      <div className="mt-6">
        <div className="flex flex-col gap-5">
          {borrowRecords.map((record: any, index: number) => {
            return (
              <div
                key={index}
                className="p-6 bg-white border border-gray-200 rounded-lg space-y-1"
              >
                <div className="flex justify-between">
                  <div className="flex gap-3 items-center">
                    <BookOpen />
                    <h1 className=" font-semibold">{record.book.title}</h1>
                  </div>
                  <div className="text-xs font-bold">
                    {record.return_date && (
                      <span className="bg-gray-200 px-3 rounded-full text-gray-900">
                        RETURNED
                      </span>
                    )}
                    {!record.return_date && record.due_date < now && (
                      <span className="bg-red-400 px-3 rounded-full text-gray-50">
                        OVERDUE
                      </span>
                    )}
                    {!record.return_date && record.due_date >= now && (
                      <span className="bg-black px-3 rounded-full text-gray-50">
                        ACTIVE
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 items-center text-gray-500 text-sm">
                  <User className="w-4 h-4" />
                  <p className="font-semibold">{record.member.name}</p>
                </div>

                <div className="grid grid-cols-3 mt-5 text-sm text-gray-600">
                  <div className="flex gap-3 items-center ">
                    <Calendar className="w-4 h-4" />
                    <div className="flex flex-col">
                      <p className=" font-semibold">Borrowed:</p>
                      <p className="">{record.borrow_date}</p>
                    </div>
                  </div>
                  {record.due_date && (
                    <div className=" flex gap-3 items-center ">
                      <Calendar className="w-4 h-4" />
                      <div className="flex flex-col">
                        <p className=" font-semibold">Due:</p>
                        <p className="">{record.due_date}</p>
                      </div>
                    </div>
                  )}
                  {record.return_date && (
                    <div className=" flex gap-3 items-center ">
                      <Calendar className="w-4 h-4" />
                      <div className="flex flex-col">
                        <p className=" font-semibold">Returned:</p>
                        <p className="">{record.return_date}</p>
                      </div>
                    </div>
                  )}
                </div>
                {/* Mark as Read Button */}
                {!record.return_date && record.due_date >= now && (
                  <div className="mt-5">
                    <Button size="lg" className="text-base" onClick={() => {}}>
                      Mark as Returned
                    </Button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <BorrowBook
        isOpen={isBorrowModalOpen}
        onClose={() => setIsBorrowModalOpen(false)}
        borrowBookData={borrowRecords}
        onSuccess={() => fetchBorrowRecords()}
      ></BorrowBook>
      <ReturnBook
        isOpen={isReturnModalOpen}
        onClose={() => setIsReturnModalOpen(false)}
        borrowBookData={borrowRecords}
        onSuccess={() => fetchBorrowRecords()}
      ></ReturnBook>
    </div>
  );
}
