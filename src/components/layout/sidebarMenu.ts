export type UserRole = "admin" | "librarian";
import {
  House,
  BookOpen,
  ArrowLeftRight,
  Users,
  UserCog,
  ChartColumn,
  Tag,
} from "lucide-react";

export const sidebarMenu = [
  {
    label: "Dashboard",
    path: "/dashboard",
    roles: ["admin", "librarian"],
    icon: House,
  },
  {
    label: "Books",
    path: "/books",
    roles: ["admin", "librarian"],
    icon: BookOpen,
  },
  {
    label: "Borrow/Return",
    path: "/borrow-return",
    roles: ["admin", "librarian"],
    icon: ArrowLeftRight,
  },
  {
    label: "Members",
    path: "/members",
    roles: ["admin", "librarian"],
    icon: Users,
  },
  {
    label: "Staff",
    path: "/staffs",
    roles: ["admin"],
    icon: UserCog,
  },
  {
    label: "Reports",
    path: "/reports",
    roles: ["admin"],
    icon: Tag,
  },
  {
    label: "Genres",
    path: "/genres",
    roles: ["admin"],
    icon: ChartColumn,
  },
];
