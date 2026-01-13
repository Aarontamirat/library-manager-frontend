"use client";

import { apiFetch } from "@/lib/api";
import {
  AlertTriangle,
  ArrowLeftRight,
  BookOpen,
  ChartColumn,
  Plus,
  Settings,
  Shield,
  User,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getUserRole } from "@/lib/user";

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

  // get user role
  const userRole = getUserRole();

  useEffect(() => {
    fetchBooks();
    fetchMembers();
    fetchBorrows();
    fetchOverdueBooks();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="h-20">
        <div className="flex items-center space-x-2">
          <h1 className="text-3xl font-bold">
            {userRole == "admin" ? "Admin" : "Librarian"} Dashboard
          </h1>
          <div
            className={`flex items-center justify-center space-x-1 px-3 py-0.5 text-xs font-bold rounded-full ${
              userRole == "admin"
                ? "bg-red-500 dark:bg-red-400"
                : "bg-black dark:bg-neutral-200 dark:text-gray-900"
            } text-white`}
          >
            {userRole == "admin" ? (
              <Shield className="w-3 h-3" />
            ) : (
              <User className="w-3 h-3" />
            )}

            <p>{userRole == "admin" ? "ADMINISTRATOR" : "LIBRARIAN"}</p>
          </div>
        </div>
        <p className="text-gray-500">
          {userRole == "admin"
            ? "Full system access – Manage all library operations"
            : "Standard library operations - Books, members, and borrowing"}
        </p>
      </div>

      {/* Alert */}
      <div
        className={`flex items-center rounded-lg border ${
          userRole == "admin"
            ? "border-red-300 bg-red-300/20 "
            : "border-green-300 bg-green-300/20 "
        } p-4`}
      >
        {userRole == "admin" ? (
          <Shield className="h-8 w-8 text-red-800 dark:text-red-400" />
        ) : (
          <User className="h-8 w-8 text-green-800 dark:text-green-400" />
        )}
        <div>
          <p
            className={`px-4 text-lg font-semibold ${
              userRole == "admin"
                ? "text-red-900 dark:text-red-400"
                : "text-green-900 dark:text-green-400"
            } `}
          >
            {userRole == "admin" ? "Administrator" : "Librarian"} Access
          </p>
          <p
            className={`px-4 text-sm ${
              userRole == "admin"
                ? "text-red-700 dark:text-red-300"
                : "text-green-700 dark:text-green-300"
            } `}
          >
            {userRole == "admin"
              ? "You have full system privileges including delete operations, genre management, and staff administration."
              : "You can manage books and members, handle borrowing operations, and view reports. Contact admin for advanced operations."}
          </p>
        </div>
      </div>

      {/* 4 Cards */}
      <div className="grid grid-cols-4 gap-6">
        <div className="px-5 py-6 rounded-lg border border-gray-300 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold">Total Books</h2>
            <BookOpen className="h-4 w-4 text-gray-600" />
          </div>
          <p className="mt-2 text-2xl font-bold">{totalBooks}</p>
          {userRole == "admin" && (
            <p className="text-xs text-gray-500 dark:text-gray-600">
              All books in system
            </p>
          )}
        </div>
        <div className="px-5 py-6 rounded-lg border border-gray-300 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold">Total Members</h2>
            <Users className="h-4 w-4 text-gray-600" />
          </div>
          <p className="mt-2 text-2xl font-bold">{totalMembers}</p>
        </div>
        <div className="px-5 py-6 rounded-lg border border-gray-300 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold">Active Borrows</h2>
            <ArrowLeftRight className="h-4 w-4 text-gray-600" />
          </div>
          <p className="mt-2 text-2xl font-bold">{totalBorrows}</p>
        </div>
        <div className="px-5 py-6 rounded-lg border border-gray-300 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold">Overdue Books</h2>
            <AlertTriangle className="h-4 w-4 text-red-400" />
          </div>
          <p className="mt-2 text-2xl text-red-400 font-semibold">
            {totalOverdueBooks}
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-6 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700">
        {/* Header */}
        <div className="">
          <h2 className="text-2xl font-semibold">Quick Actions</h2>
          <p className="text-gray-500">
            {userRole == "admin"
              ? "Administartive and library operations"
              : "Common library operations"}
          </p>
        </div>

        {/* Cards that Link to routes */}
        <div className="grid grid-cols-4 gap-6 py-6">
          <Link href="/borrow-return">
            <div className="px-5 py-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-950 text-gray-200 dark:bg-gray-50 dark:text-gray-900">
              <div className="flex flex-col items-center gap-4">
                <ArrowLeftRight className="w-4 h-4" />
                <h2 className="text-sm font-semibold">Borrow Book</h2>
              </div>
            </div>
          </Link>

          <Link href="/borrow-return">
            <div className="px-5 py-4 rounded-lg border border-gray-300 dark:border-gray-700">
              <div className="flex flex-col items-center gap-4">
                <ArrowLeftRight className="w-4 h-4" />
                <h2 className="text-sm font-semibold">Return Book</h2>
              </div>
            </div>
          </Link>

          <Link href="/members">
            <div className="px-5 py-4 rounded-lg border border-gray-300 dark:border-gray-700">
              <div className="flex flex-col items-center gap-4">
                <Plus className="w-4 h-4" />
                <h2 className="text-sm font-semibold">Add Member</h2>
              </div>
            </div>
          </Link>

          <Link href="/books">
            <div className="px-5 py-4 rounded-lg border border-gray-300 dark:border-gray-700">
              <div className="flex flex-col items-center gap-4">
                <Plus className="h-4 w-4" />
                <h2 className="text-sm font-semibold">Add Book</h2>
              </div>
            </div>
          </Link>

          {userRole == "admin" && (
            <>
              <Link href="/genres">
                <div className="px-5 py-4 rounded-lg border border-red-300 bg-red-300/20 text-red-700 dark:border-red-500/40 dark:bg-red-500/10 dark:text-red-400">
                  <div className="flex flex-col items-center gap-4">
                    <Settings className="h-4 w-4" />
                    <h2 className="text-sm font-semibold">Manage Genres</h2>
                  </div>
                </div>
              </Link>

              <Link href="/reports">
                <div className="px-5 py-4 rounded-lg border border-red-300 bg-red-300/20 text-red-700 dark:border-red-500/40 dark:bg-red-500/10 dark:text-red-400">
                  <div className="flex flex-col items-center gap-4">
                    <ChartColumn className="h-4 w-4" />
                    <h2 className="text-sm font-semibold">Admin Reports</h2>
                  </div>
                </div>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Recent Activity */}
    </div>
  );
}
