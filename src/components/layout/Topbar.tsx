"use client";

import LogoutButton from "./LogoutButton";

export default function Topbar() {
  return (
    <header className="flex h-20 items-center justify-between border-b border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-6">
      <div />
      <div className="flex items-center gap-4">
        <span className="text-lg text-gray-600">Welcome, admin</span>
        <LogoutButton />
      </div>
    </header>
  );
}
