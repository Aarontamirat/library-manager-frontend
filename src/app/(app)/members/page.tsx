"use client";

import { Button } from "@/components/ui/button";
import { Edit, Eye, History, Plus, SearchIcon, Trash2 } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useState, useEffect } from "react";
import { apiFetch } from "@/lib/api";
import Add from "@/components/modals/members/Add";
import View from "@/components/modals/members/View";
import EditModal from "@/components/modals/members/Edit";
import Delete from "@/components/modals/members/Delete";
import HistoryView from "@/components/modals/members/HistoryView";
import { getUserRole } from "@/lib/user";

export default function Members() {
  const [members, setMembers] = useState([]);
  const [borrowRecords, setBorrowRecords] = useState([]);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isHistoryViewModalOpen, setIsHistoryViewModalOpen] = useState(false);

  const fetchMembers = async () => {
    // Get books
    try {
      const data = await apiFetch("/members", {
        method: "GET",
      });

      setMembers(data);
    } catch (err: any) {
      console.log(err);
    }
  };

  const fetchBorrowRecords = async () => {
    // Get borrow records
    try {
      const data = await apiFetch("/borrow-records", {
        method: "GET",
      });

      setBorrowRecords(data);
    } catch (err: any) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMembers();
    fetchBorrowRecords();
  }, []);

  const filteredMembers = members.filter((member: any) => {
    return (
      member.name.toLowerCase().includes(search.toLowerCase()) ||
      member.email.toLowerCase().includes(search.toLowerCase()) ||
      member.phone.toLowerCase().includes(search.toLowerCase())
    );
  });

  //   get how many books member has borrowed
  const borrowedCount = (memberId: number) => {
    return borrowRecords.filter(
      (record: any) =>
        record.member_id === memberId && record.return_date === null
    ).length;
  };

  const userRole = getUserRole();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="h-20 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Members</h1>
          <p className="mt-1 text-gray-500">Manage library members</p>
        </div>
        <div className="">
          <Button
            variant="default"
            size="lg"
            className=""
            onClick={() => setIsModalOpen(true)}
          >
            <Plus />
            Add Member
          </Button>
        </div>
      </div>

      {/* Search bar */}
      <div className="mt-6">
        <InputGroup>
          <InputGroupInput
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search members by name, email, or phone ..."
          />
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
        </InputGroup>
      </div>

      {/* Grid of 3 cards */}
      <div className="grid grid-cols-3 gap-5 mt-6">
        {filteredMembers.map((member: any) => {
          // get borrowed count
          const borrowed = borrowedCount(member.id);
          return (
            <div
              key={member.id}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow"
            >
              <div className="flex justify-between items-center">
                <div className="flex flex-col items-baseline">
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                </div>
                {/* status */}
                <span
                  className={`text-sm text-gray-50 dark:text-gray-900 items-center ${
                    borrowed != 0
                      ? "bg-black dark:bg-white"
                      : "bg-gray-300 dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                  } rounded-full px-2`}
                >
                  {member ? `${borrowed} active` : `${borrowed} active`}
                </span>
              </div>
              <p className=" text-sm text-gray-500">{member.email}</p>
              <div className="text-sm flex flex-col gap-2 mt-6">
                <p className="font-semibold text-gray-600">
                  Phone: <span className="text-gray-500">{member.phone}</span>
                </p>
                <p className="font-semibold text-gray-600">
                  Joined:{" "}
                  <span className="text-gray-500">{member.join_date}</span>
                </p>
                <p className="font-semibold text-gray-600">
                  Active Borrows:{" "}
                  <span className="text-gray-500">{borrowed}</span>
                </p>
              </div>
              {/* actions like view, edit and delete */}
              <div className="flex justify-end gap-2 mt-6">
                {/* View Button */}
                <Button
                  onClick={() => {
                    setIsViewModalOpen(true);
                    setSelectedMember(member.id);
                  }}
                  variant={"outline"}
                  size={"icon-lg"}
                >
                  <Eye className="w-6 h-6" />
                </Button>
                {/* Borrowing History Button */}
                <Button
                  onClick={() => {
                    setIsHistoryViewModalOpen(true);
                    setSelectedMember(member.id);
                  }}
                  variant={"outline"}
                  size={"icon-lg"}
                >
                  <History className="w-6 h-6" />
                </Button>
                {/* Edit Button */}
                <Button
                  onClick={() => {
                    setIsEditModalOpen(true);
                    setSelectedMember(member.id);
                  }}
                  variant={"outline"}
                  size={"icon-lg"}
                >
                  <Edit className="w-6 h-6" />
                </Button>
                {/* Delete Button */}
                {userRole == "admin" && (
                  <Button
                    onClick={() => {
                      setIsDeleteModalOpen(true);
                      setSelectedMember(member.id);
                    }}
                    variant={"outline"}
                    size={"icon-lg"}
                  >
                    <Trash2 className="w-6 h-6" />
                  </Button>
                )}
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
        memberData={members.find((member: any) => member.id === selectedMember)}
        borrowedCount={borrowedCount(selectedMember)}
      />

      {/* History Modal */}
      <HistoryView
        isOpen={isHistoryViewModalOpen}
        onClose={() => setIsHistoryViewModalOpen(false)}
        memberData={members.find((member: any) => member.id === selectedMember)}
      />

      {/* Edit Modal */}
      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        memberData={members.find((member: any) => member.id === selectedMember)}
        onSuccess={fetchMembers}
      />

      {/* Delete Modal */}
      {userRole == "admin" && (
        <Delete
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          memberData={members.find(
            (member: any) => member.id === selectedMember
          )}
          onSuccess={fetchMembers}
        />
      )}
    </div>
  );
}
