"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarMenu } from "./sidebarMenu";
import { getUserRole } from "@/lib/user";

export default function Sidebar() {
  const pathname = usePathname();

  const userRole = getUserRole();

  return (
    <aside className="w-64 border-r border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800">
      <div className="h-20 px-5 py-4 text-xl text-center font-bold">
        Library Manager
      </div>

      <nav className="py-2 space-y-2 px-4">
        {sidebarMenu
          .filter((item) => item.roles.includes(userRole || ""))
          .map((item) => {
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center rounded px-3 py-2 text-sm font-semibold ${
                  pathname === item.path
                    ? "bg-blue-100 text-blue-700 dark:text-blue-400 dark:bg-blue-900"
                    : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600"
                }`}
              >
                <item.icon className="mr-3 w-5 h-5 inline-block" />
                {item.label}
              </Link>
            );
          })}
      </nav>
    </aside>
  );
}
