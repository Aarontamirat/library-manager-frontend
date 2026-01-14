"use client";

import { permissionsList } from "@/components/layout/permissionsList";
import { getUserEmail, getUsername, getUserRole } from "@/lib/user";
import { Mail, Shield, User } from "lucide-react";

export default function Profile() {
  const userName = getUsername();
  const emailAddress = getUserEmail();
  const userRole = getUserRole();
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="h-20 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Profile</h1>
          <p className="mt-1 text-gray-500">
            View your account information and permissions
          </p>
        </div>
      </div>
      {/* COntent */}
      <div className="w-full md:w-1/2 space-y-6">
        <div className="border bg-white dark:bg-gray-800 border-gray-300 p-8 rounded-lg space-y-8">
          {/* Title */}
          <div className="flex items-center gap-6">
            <div className="rounded-full bg-blue-400/20 p-4">
              {userRole == "admin" ? (
                <Shield className="text-blue-600" size={35} />
              ) : (
                <User className="text-blue-600" size={35} />
              )}
            </div>
            <div className="flex flex-col items-center space-y-1">
              <h2 className="w-full text-2xl font-semibold">
                {userRole == "admin" ? "Administrator" : "Librarian"}
              </h2>
              <p
                className={`w-full px-2 text-center rounded-full uppercase ${
                  userRole == "admin"
                    ? "bg-red-400 text-white"
                    : "bg-black dark:bg-white text-white dark:text-black"
                } `}
              >
                {userRole}
              </p>
            </div>
          </div>

          {/* Basic Informations */}
          <div className="">
            <h2 className="text-xl font-semibold">Basic Information</h2>
          </div>
          <div className="flex items-center gap-10 text-gray-600">
            <User size={24} />
            <div className="flex flex-col">
              <p className=" font-semibold">Username</p>
              <p className="text-gray-900 font-semibold">{userName}</p>
            </div>
          </div>
          <div className="flex items-center gap-10 text-gray-600">
            <Mail size={24} />
            <div className="flex flex-col">
              <p className=" font-semibold">Email Address</p>
              <p className="text-gray-900 font-semibold">{emailAddress}</p>
            </div>
          </div>
          <div className="flex items-center gap-10 text-gray-600">
            <User size={24} />
            <div className="flex flex-col">
              <p className=" font-semibold">Role</p>
              <p className="text-gray-900 font-semibold">{userRole}</p>
            </div>
          </div>
        </div>
        {/* Permissions and Access */}
        <div className="border bg-white dark:bg-gray-800 border-gray-300 p-8 rounded-lg space-y-6">
          <div className="flex flex-col space-y-1">
            <h2 className="text-xl font-semibold">Permissions and Access</h2>
            <p className="text-gray-600">Your current role permissions</p>
          </div>
          <div className="flex flex-col space-y-3">
            {permissionsList
              .filter((item) => item.roles.includes(userRole || ""))
              .map((permission) => {
                return (
                  <div
                    key={permission.label}
                    className="flex items-center gap-3"
                  >
                    <permission.icon
                      className={`${
                        userRole == "admin" ? "text-green-700" : "text-blue-500"
                      }`}
                      size={20}
                    />
                    <p
                      className={`${
                        userRole == "admin" ? "text-green-700" : "text-blue-500"
                      }`}
                    >
                      {permission.label}
                    </p>
                  </div>
                );
              })}
            {/* <div className="flex items-center gap-3">
              <User size={20} />
              <p className="text-gray-600">Manage books and members</p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
