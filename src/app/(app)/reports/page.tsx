"use client";

import { ChartColumn, TrendingUp, TriangleAlert } from "lucide-react";
import { useState, useEffect } from "react";
import { apiFetch } from "@/lib/api";
import { Progress } from "@/components/ui/progress";
import { getUserRole } from "@/lib/user";
import Unauthorized from "@/components/layout/Unauthorized";

export default function Members() {
  const [popularGenres, setPopularGenres] = useState<any[]>([]);
  const [overdueRecords, setOverdueRecords] = useState<any[]>([]);
  const [summaryReport, setSummaryReport] = useState<any>({});

  // Fetch overdue records
  const fetchOverdueRecords = async () => {
    try {
      const data = await apiFetch("/borrow-records/reports/overdue", {
        method: "GET",
      });

      setOverdueRecords(
        data.filter(
          (record: any) =>
            record.due_date < new Date().toISOString().split("T")[0] &&
            record.return_date === null
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch popular genres
  const fetchPopularGenres = async () => {
    try {
      const data = await apiFetch("/borrow-records/reports/popular-genres", {
        method: "GET",
      });

      setPopularGenres(data);
    } catch (err) {
      console.error(err);
    }
  };

  //   Fetch summary report
  const fetchSummaryReport = async () => {
    try {
      const data = await apiFetch("/borrow-records/reports/summary", {
        method: "GET",
      });

      setSummaryReport(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOverdueRecords();
    fetchPopularGenres();
    fetchSummaryReport();
  }, []);

  // maxborrow count for percentage
  const maxBorrowCount =
    popularGenres.length > 0
      ? Math.max(...popularGenres.map((g) => g.borrow_count))
      : 0;

  const userRole = getUserRole();
  if (userRole === "admin") {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="h-20 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Reports</h1>
            <p className="mt-1 text-gray-500">Library analytics and reports</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Overdue Books */}
          <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-lg border border-gray-300">
            <div className="mb-6">
              <div className="flex items-center space-x-2">
                <TriangleAlert className="h-5 w-5 text-red-500" />
                <h2 className="text-2xl font-semibold">Overdue Books</h2>
              </div>
              <p className="text-gray-600 text-sm">
                Books that are past their due date
              </p>
            </div>

            {overdueRecords.map((overdue) => {
              const overdueDays = Math.floor(
                (new Date().getTime() - new Date(overdue.due_date).getTime()) /
                  86400000
              );

              return (
                <div
                  key={overdue.id}
                  className="flex flex-col mt-4 space-y-1 p-3 rounded-lg bg-red-400/10"
                >
                  <h3 className="font-semibold">{overdue.book.title}</h3>

                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">
                      Member: <span>{overdue.member.name}</span>
                    </p>
                    <span className="text-xs px-2 py-0.5 bg-red-500/90 text-white font-semibold rounded-full">
                      {overdueDays} days overdue
                    </span>
                  </div>

                  <p className="text-sm text-gray-600">
                    Due: <span>{overdue.due_date}</span>
                  </p>
                </div>
              );
            })}
          </div>

          {/* Popular Genres */}
          <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-lg border border-gray-300">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                <h2 className="text-2xl font-semibold">Popular Genres</h2>
              </div>
              <p className="text-gray-600 text-sm">Most borrowed book genres</p>
            </div>

            {/* Genres List */}
            <div className="space-y-4">
              {popularGenres.map((genre: any, index: number) => {
                const percentage =
                  maxBorrowCount > 0
                    ? Math.round((genre.borrow_count / maxBorrowCount) * 100)
                    : 0;

                return (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    {/* Rank and Genre */}
                    <div className="flex items-center space-x-3 w-1/2">
                      <span className="text-sm text-gray-500">
                        #{index + 1}
                      </span>
                      <span className="text-sm font-medium">
                        {genre.genre_name}
                      </span>
                    </div>

                    {/* Progress*/}
                    <div className="flex items-center space-x-3 w-1/2 justify-end">
                      <div className="w-32">
                        <Progress value={percentage} />
                      </div>
                      <span className="text-sm text-gray-600 w-6 text-right">
                        {genre.borrow_count}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {/* Summary Report */}
        <div className="grid grid-cols-3 gap-6">
          <div className="px-5 py-6 rounded-lg border border-gray-300 dark:border-gray-700">
            <div className="flex justify-between items-center">
              <h2 className="font-semibold">Total Borrows This Month</h2>
              <ChartColumn className="h-4 w-4 text-gray-600" />
            </div>
            <p className="mt-2 text-2xl font-bold">
              {summaryReport.totalBorrowsThisMonth}
            </p>
          </div>
          <div className="px-5 py-6 rounded-lg border border-gray-300 dark:border-gray-700">
            <div className="flex justify-between items-center">
              <h2 className="font-semibold">Average Borrow Duration</h2>
              <ChartColumn className="h-4 w-4 text-gray-600" />
            </div>
            <p className="mt-2 text-2xl font-bold">
              {summaryReport.averageBorrowDuration} days
            </p>
          </div>
          <div className="px-5 py-6 rounded-lg border border-gray-300 dark:border-gray-700">
            <div className="flex justify-between items-center">
              <h2 className="font-semibold">Return Rate</h2>
              <ChartColumn className="h-4 w-4 text-gray-600" />
            </div>
            <p className="mt-2 text-2xl font-bold">
              {summaryReport.returnRate}%
            </p>
          </div>
        </div>
      </div>
    );
  } else {
    return <Unauthorized />;
  }
}
