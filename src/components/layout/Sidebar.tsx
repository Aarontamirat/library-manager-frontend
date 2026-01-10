"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarMenu } from "./sidebarMenu";

const MOCK_ROLE = "admin"; // temporary

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-80 border-r border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800">
      <div className="h-20 p-5 text-2xl text-center font-bold">
        Library Manager
      </div>

      <nav className="py-4 space-y-1 px-4">
        {sidebarMenu
          .filter((item) => item.roles.includes(MOCK_ROLE))
          .map((item) => {
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`block rounded px-3 py-2 text-lg font-normal ${
                  pathname === item.path
                    ? "bg-blue-100 text-blue-700 dark:text-blue-400 dark:bg-blue-900"
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                }`}
              >
                <item.icon className="mr-3 inline-block" />
                {item.label}
              </Link>
            );
          })}
      </nav>
    </aside>
  );
}
