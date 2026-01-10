"use client";

import { apiFetch } from "@/lib/api";
import {
  AlertTriangle,
  ArrowLeftRight,
  Book,
  BookOpen,
  ChartColumn,
  Plus,
  Settings,
  Shield,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function DashboardPage() {
  const [books, setBooks] = useState([]);
  const [members, setMembers] = useState([]);
  const [borrows, setBorrows] = useState([]);
  const [overdueBooks, setOverdueBooks] = useState([]);

  // Total books
  const totalBooks = books.length;
  // Total members
  const totalMembers = members.length;
  // Total borrows
  const totalBorrows = borrows.length;
  // Total overdue books
  const totalOverdueBooks = overdueBooks.length;

  async function fetchBooks() {
    // Get books
    try {
      const data = await apiFetch("/books", {
        method: "GET",
      });

      setBooks(data);
    } catch (err: any) {
      console.log(err);
    }
  }

  async function fetchMembers() {
    // Get members
    try {
      const data = await apiFetch("/members", {
        method: "GET",
      });

      setMembers(data);
    } catch (err: any) {
      console.log(err);
    }
  }

  async function fetchBorrows() {
    // Get borrows
    try {
      const data = await apiFetch("/borrow-records", {
        method: "GET",
      });

      setBorrows(data);
    } catch (err: any) {
      console.log(err);
    }
  }

  async function fetchOverdueBooks() {
    // Get overdue books
    try {
      const data = await apiFetch("/borrow-records/reports/overdue", {
        method: "GET",
      });

      setOverdueBooks(data);
    } catch (err: any) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchBooks();
    fetchMembers();
    fetchBorrows();
    fetchOverdueBooks();
  }, []);

  return (
    <div>
      {/* Header */}

      <div className="h-20 py-4">
        <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
        <p className="mt-1 text-gray-500">
          Full system access – Manage all library operations
        </p>
      </div>

      {/* Alert */}
      <div className="mt-5 flex items-center gap-2 rounded-lg border border-red-300 bg-red-300/20 p-4">
        <Shield className="h-8 w-8 text-red-800 dark:text-red-400" />
        <div>
          <p className="px-4 text-xl font-semibold text-red-900 dark:text-red-400">
            Administrator Access
          </p>
          <p className="px-4 py-2 text-red-700 dark:text-red-300">
            You have full system privileges including delete operations, genre
            management, and staff administration.
          </p>
        </div>
      </div>

      {/* 4 Cards */}
      <div className="grid grid-cols-4 gap-6 py-6">
        <div className="px-5 py-6 rounded-lg border border-gray-300 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <h2 className="text-lg">Total Books</h2>
            <BookOpen className="h-5 w-5 text-gray-600" />
          </div>
          <p className="mt-4 text-3xl font-semibold">{totalBooks}</p>
          <p className="text-gray-500 dark:text-gray-600">
            All books in system
          </p>
        </div>
        <div className="px-5 py-6 rounded-lg border border-gray-300 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <h2 className="text-lg">Total Members</h2>
            <Users className="h-5 w-5 text-gray-600" />
          </div>
          <p className="mt-4 text-3xl font-semibold">{totalMembers}</p>
        </div>
        <div className="px-5 py-6 rounded-lg border border-gray-300 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <h2 className="text-lg">Active Borrows</h2>
            <ArrowLeftRight className="h-5 w-5 text-gray-600" />
          </div>
          <p className="mt-4 text-3xl font-semibold">{totalBorrows}</p>
        </div>
        <div className="px-5 py-6 rounded-lg border border-gray-300 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <h2 className="text-lg">Overdue Books</h2>
            <AlertTriangle className="h-5 w-5 text-red-400" />
          </div>
          <p className="mt-4 text-3xl text-red-400 font-semibold">
            {totalOverdueBooks}
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="py-6 rounded-lg">
        {/* Header */}
        <div className="">
          <h2 className="text-2xl font-semibold">Quick Actions</h2>
          <p className="text-gray-500">Administartive and library operations</p>
        </div>

        {/* 4 Cards that Link to routes */}
        <div className="grid grid-cols-4 gap-6 py-6">
          <Link href="/borrow-return">
            <div className="px-5 py-6 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-950 text-gray-200 dark:bg-gray-50 dark:text-gray-900">
              <div className="flex flex-col items-center gap-4">
                <ArrowLeftRight className="h-5 w-5" />
                <h2 className="text-lg">Borrow Book</h2>
              </div>
            </div>
          </Link>

          <Link href="/borrow-return">
            <div className="px-5 py-6 rounded-lg border border-gray-300 dark:border-gray-700">
              <div className="flex flex-col items-center gap-4">
                <ArrowLeftRight className="h-5 w-5" />
                <h2 className="text-lg">Return Book</h2>
              </div>
            </div>
          </Link>

          <Link href="/members">
            <div className="px-5 py-6 rounded-lg border border-gray-300 dark:border-gray-700">
              <div className="flex flex-col items-center gap-4">
                <Plus className="h-5 w-5" />
                <h2 className="text-lg">Add Member</h2>
              </div>
            </div>
          </Link>

          <Link href="/books">
            <div className="px-5 py-6 rounded-lg border border-gray-300 dark:border-gray-700">
              <div className="flex flex-col items-center gap-4">
                <Plus className="h-5 w-5" />
                <h2 className="text-lg">Add Book</h2>
              </div>
            </div>
          </Link>

          <Link href="/genres">
            <div className="px-5 py-6 rounded-lg border border-red-300 bg-red-300/20 text-red-700 dark:border-red-500/40 dark:bg-red-500/10 dark:text-red-400">
              <div className="flex flex-col items-center gap-4">
                <Settings className="h-5 w-5" />
                <h2 className="text-lg">Manage Genres</h2>
              </div>
            </div>
          </Link>

          <Link href="/reports">
            <div className="px-5 py-6 rounded-lg border border-red-300 bg-red-300/20 text-red-700 dark:border-red-500/40 dark:bg-red-500/10 dark:text-red-400">
              <div className="flex flex-col items-center gap-4">
                <ChartColumn className="h-5 w-5" />
                <h2 className="text-lg">Admin Reports</h2>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="py-6 rounded-lg">
        {/* Header */}
        <div className="">
          <h2 className="text-2xl font-semibold">Recent Activity</h2>
          <p className="text-gray-500">
            System-wide borrow and return operations
          </p>
        </div>
        <div className="flex flex-col gap-4 py-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-gray-300 dark:bg-gray-700" />
            <div className="flex flex-col">
              <h2 className="text-lg font-semibold">John Doe</h2>
              <p className="text-gray-500">Borrowed a book</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
