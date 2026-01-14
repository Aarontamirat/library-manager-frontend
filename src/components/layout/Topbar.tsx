"use client";

import { getUserEmail, getUsername, getUserRole } from "@/lib/user";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import LogoutButton from "./LogoutButton";
import { useEffect, useState } from "react";
import { DropdownMenuSub } from "@radix-ui/react-dropdown-menu";
import { User } from "lucide-react";
import Link from "next/link";

export default function Topbar() {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userRole, setUserRole] = useState("");

  // Fetch Username
  const fetchUserName = async () => {
    const userNameData = await getUsername();
    const userEmailData = await getUserEmail();
    const userRoleData = await getUserRole();
    if (userNameData !== null) {
      setUserName(userNameData);
    }
    if (userEmailData !== null) {
      setUserEmail(userEmailData);
    }
    if (userRoleData !== null) {
      setUserRole(userRoleData);
    }
  };

  useEffect(() => {
    fetchUserName();
  }, []);

  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-6">
      <div />
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">Welcome, {userRole}</span>

        {/* Avatar & Dropdowns*/}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className="cursor-pointer">
              <AvatarFallback className="text-black font-semibold">
                {userName.charAt(0).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{userName}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {userEmail}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href="/profile">
              <DropdownMenuItem className="mb-2 cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem className="cursor-pointer">
              <LogoutButton />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
