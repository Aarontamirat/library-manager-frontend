"use client";

import { Button } from "@/components/ui/button";
import {
  Edit,
  Eye,
  Filter,
  Plus,
  SearchIcon,
  Trash,
  Trash2,
} from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useState, useEffect } from "react";
import { apiFetch } from "@/lib/api";
// import Add from "@/components/modals/staffs/Add";
// import View from "@/components/modals/staffs/View";
// import EditModal from "@/components/modals/staffs/Edit";
// import Delete from "@/components/modals/staffs/Delete";

export default function Staffs() {
  const [staffs, setStaffs] = useState([]);
  const [staffId, setStaffId] = useState("");
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const fetchStaffs = async () => {
    // Get staffs
    try {
      const data = await apiFetch("/auth/users", {
        method: "GET",
      });

      setStaffs(data);
    } catch (err: any) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchStaffs();
  }, []);

  const filteredStaffs = staffs.filter((staff: any) => {
    return (
      staff.username.toLowerCase().includes(search.toLowerCase()) ||
      staff.email.toLowerCase().includes(search.toLowerCase()) ||
      staff.role.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="h-20 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Staff Management</h1>
          <p className="mt-1 text-gray-500">
            Manage library staff and administrators (Admin Only)
          </p>
        </div>
        <div className="">
          <Button
            variant="default"
            size="lg"
            className=""
            onClick={() => setIsModalOpen(true)}
          >
            <Plus />
            Add Staff
          </Button>
        </div>
      </div>

      {/* Search bar */}
      <div className="mt-6">
        <InputGroup>
          <InputGroupInput
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search staffs by name, email, or role ..."
          />
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
        </InputGroup>
      </div>

      {/* Grid of 3 cards */}
      <div className="grid grid-cols-3 gap-5 mt-6">
        {filteredStaffs.map((staff: any) => {
          // get borrowed count
          const borrowed = borrowedCount(staff.id);
          return (
            <div
              key={staff.id}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow"
            >
              <div className="flex justify-between items-center">
                <div className="flex flex-col items-baseline">
                  <h3 className="text-lg font-semibold">{staff.name}</h3>
                </div>
                {/* status */}
                <span
                  className={`text-sm text-gray-50 dark:text-gray-900 items-center ${
                    borrowed != 0
                      ? "bg-black dark:bg-white"
                      : "bg-gray-300 dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                  } rounded-full px-2`}
                >
                  {staff ? `${borrowed} active` : `${borrowed} active`}
                </span>
              </div>
              <p className=" text-sm text-gray-500">{staff.email}</p>
              <div className="text-sm flex flex-col gap-2 mt-6">
                <p className="font-semibold text-gray-600">
                  role: <span className="text-gray-500">{staff.role}</span>
                </p>
                <p className="font-semibold text-gray-600">
                  Joined:{" "}
                  <span className="text-gray-500">{staff.join_date}</span>
                </p>
                <p className="font-semibold text-gray-600">
                  Active Borrows:{" "}
                  <span className="text-gray-500">{staff.role}</span>
                </p>
              </div>
              {/* actions like view, edit and delete */}
              <div className="flex justify-end gap-2 mt-6">
                {/* View Button */}
                <Button
                  onClick={() => {
                    setIsViewModalOpen(true);
                    setSelectedMember(staff.id);
                  }}
                  variant={"outline"}
                  size={"icon-lg"}
                >
                  <Eye className="w-6 h-6" />
                </Button>
                {/* Edit Button */}
                <Button
                  onClick={() => {
                    setIsEditModalOpen(true);
                    setSelectedMember(staff.id);
                  }}
                  variant={"outline"}
                  size={"icon-lg"}
                >
                  <Edit className="w-6 h-6" />
                </Button>
                {/* Delete Button */}
                <Button
                  onClick={() => {
                    setIsDeleteModalOpen(true);
                    setSelectedMember(staff.id);
                  }}
                  variant={"outline"}
                  size={"icon-lg"}
                >
                  <Trash2 className="w-6 h-6" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Modal */}
      <Add
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchMembers}
      />

      {/* View Modal */}
      <View
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        memberData={staffs.find((staff: any) => staff.id === selectedMember)}
        borrowedCount={borrowedCount(selectedMember)}
      />

      {/* Edit Modal */}
      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        memberData={staffs.find((staff: any) => staff.id === selectedMember)}
        onSuccess={fetchMembers}
      />

      {/* Delete Modal */}
      <Delete
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        memberData={staffs.find((staff: any) => staff.id === selectedMember)}
        onSuccess={fetchMembers}
      />
    </div>
  );
}
