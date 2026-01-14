export type UserRole = "admin" | "librarian";
import { Shield, User } from "lucide-react";

export const permissionsList = [
  {
    label: "Full system administration access",
    roles: ["admin"],
    icon: Shield,
  },
  {
    label: "Manage all books, members, and genres",
    roles: ["admin"],
    icon: Shield,
  },
  {
    label: "Delete records and manage staff",
    roles: ["admin"],
    icon: Shield,
  },
  {
    label: "Access all reports and analytics",
    roles: ["admin"],
    icon: Shield,
  },
  {
    label: "Manage books and members",
    roles: ["librarian"],
    icon: User,
  },
  {
    label: "Handle borrow/return operations",
    roles: ["librarian"],
    icon: User,
  },
  {
    label: "View basic reports",
    roles: ["librarian"],
    icon: User,
  },
];
