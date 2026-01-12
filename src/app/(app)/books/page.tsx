"use client";

import { Button } from "@/components/ui/button";
import {
  Edit,
  Eye,
  Filter,
  Plus,
  SearchIcon,
  Trash,
  Trash2,
} from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useState, useEffect } from "react";
import { apiFetch } from "@/lib/api";
import Add from "@/components/modals/books/Add";
import View from "@/components/modals/books/View";
import EditModal from "@/components/modals/books/Edit";
import Delete from "@/components/modals/books/Delete";

export default function Books() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<any>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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

  useEffect(() => {
    fetchBooks();
  }, []);

  const filteredBooks = books.filter((book: any) => {
    return (
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase()) ||
      book.genre.name.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="h-20 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Books</h1>
          <p className="mt-1 text-gray-500">
            Manage your library's book collection
          </p>
        </div>
        <div className="">
          <Button
            variant="default"
            size="lg"
            className=""
            onClick={() => setIsModalOpen(true)}
          >
            <Plus />
            Add Book
          </Button>
        </div>
      </div>

      {/* Search bar */}
      <div className="mt-6">
        <InputGroup>
          <InputGroupInput
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search books by title, author, or genre ..."
          />
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
        </InputGroup>
      </div>

      {/* Grid of 3 cards */}
      <div className="grid grid-cols-3 gap-5 mt-6">
        {filteredBooks.map((book: any) => {
          const available = book.available_copies > 0;
          return (
            <div
              key={book.id}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow"
            >
              <div className="flex justify-between items-center">
                <div className="flex flex-col items-baseline">
                  <h3 className="text-lg font-semibold">{book.title}</h3>
                </div>
                {/* status */}
                <span
                  className={`text-sm text-gray-50 dark:text-gray-900 items-center ${
                    available
                      ? "bg-black dark:bg-white"
                      : "bg-red-500 dark:bg-red-600"
                  } rounded-full px-2`}
                >
                  {available ? "Available" : "Out of Stock"}
                </span>
              </div>
              <p className=" text-sm text-gray-500">by {book.author}</p>
              <div className="text-sm flex flex-col gap-2 mt-6">
                <p className="font-semibold text-gray-600">
                  Genre:{" "}
                  <span className="text-gray-500">{book.genre.name}</span>
                </p>
                <p className="font-semibold text-gray-600">
                  Published:{" "}
                  <span className="text-gray-500">{book.published_year}</span>
                </p>
                <p className="font-semibold text-gray-600">
                  Available Copies:{" "}
                  <span className="text-gray-500">{book.available_copies}</span>
                </p>
              </div>
              {/* actions like view, edit and delete */}
              <div className="flex justify-end gap-2 mt-6">
                {/* View Button */}
                <Button
                  onClick={() => {
                    setIsViewModalOpen(true);
                    setSelectedBook(book.id);
                  }}
                  variant={"outline"}
                  size={"icon-lg"}
                >
                  <Eye className="w-6 h-6" />
                </Button>
                {/* Edit Button */}
                <Button
                  onClick={() => {
                    setIsEditModalOpen(true);
                    setSelectedBook(book.id);
                  }}
                  variant={"outline"}
                  size={"icon-lg"}
                >
                  <Edit className="w-6 h-6" />
                </Button>
                {/* Delete Button */}
                <Button
                  onClick={() => {
                    setIsDeleteModalOpen(true);
                    setSelectedBook(book.id);
                  }}
                  variant={"outline"}
                  size={"icon-lg"}
                >
                  <Trash2 className="w-6 h-6" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Modal */}
      <Add
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchBooks}
      />

      {/* View Modal */}
      <View
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        bookData={books.find((book: any) => book.id === selectedBook)}
      />

      {/* Edit Modal */}
      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        bookData={books.find((book: any) => book.id === selectedBook)}
        onSuccess={fetchBooks}
      />

      {/* Delete Modal */}
      <Delete
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        bookData={books.find((book: any) => book.id === selectedBook)}
        onSuccess={fetchBooks}
      />
    </div>
  );
}
