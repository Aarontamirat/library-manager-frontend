"use client";

import { Button } from "@/components/ui/button";
import { Edit, Plus, SearchIcon, Trash2 } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useState, useEffect } from "react";
import { apiFetch } from "@/lib/api";
import Add from "@/components/modals/genres/Add";
import EditModal from "@/components/modals/genres/Edit";
import Delete from "@/components/modals/genres/Delete";
import { getUserRole } from "@/lib/user";
import Unauthorized from "@/components/layout/Unauthorized";
import { DNA } from "react-loader-spinner";

export default function genres() {
  const [genres, setGenres] = useState([]);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [dataFetching, setDataFetching] = useState(false);

  const fetchGenres = async () => {
    setDataFetching(true);
    // Get genres
    try {
      const data = await apiFetch("/genres", {
        method: "GET",
      });

      setGenres(data);
    } catch (err: any) {
      console.log(err);
    } finally {
      setDataFetching(false);
    }
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  const filteredGenres = genres.filter((genre: any) => {
    return genre.name.toLowerCase().includes(search.toLowerCase());
  });

  const userRole = getUserRole();
  if (userRole === "admin") {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="md:h-20 h-32 flex flex-col md:flex-row justify-between items-center space-y-2">
          <div>
            <h1 className="text-3xl font-bold">Genre Management</h1>
            <p className="mt-1 text-gray-500">
              Manage book genres (Admin Only)
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
              Add Genre
            </Button>
          </div>
        </div>

        {/* Search bar */}
        <div className="mt-6">
          <InputGroup>
            <InputGroupInput
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search genres..."
            />
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
          </InputGroup>
        </div>

        {/* Grid of 3 cards */}
        <div className="md:grid md:grid-cols-3 space-y-6 md:space-y-0 md:gap-6 mt-6">
          {dataFetching && (
            <div className="flex h-screen col-span-3 justify-center">
              <DNA
                visible={true}
                height="80"
                width="80"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
              />
            </div>
          )}

          {filteredGenres.map((genre: any) => {
            return (
              <div
                key={genre.id}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow"
              >
                <div className="flex justify-between items-center">
                  <div className="flex flex-col items-baseline">
                    <h3 className="text-lg font-semibold">{genre.name}</h3>
                  </div>
                  {/* actions like edit and delete */}
                  <div className="flex justify-end gap-2 mt-6">
                    {/* Edit Button */}
                    <Button
                      onClick={() => {
                        setIsEditModalOpen(true);
                        setSelectedMember(genre.id);
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
                        setSelectedMember(genre.id);
                      }}
                      variant={"outline"}
                      size={"icon-lg"}
                    >
                      <Trash2 className="w-6 h-6" />
                    </Button>
                  </div>
                </div>
                <div className="text-sm flex flex-col gap-2 mt-6">
                  <p className="font-semibold text-gray-600">
                    Genre ID: <span className="text-gray-500">{genre.id}</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Add Modal */}
        <Add
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={fetchGenres}
        />

        {/* Edit Modal */}
        <EditModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          genreData={genres.find((genre: any) => genre.id === selectedMember)}
          onSuccess={fetchGenres}
        />

        {/* Delete Modal */}
        <Delete
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          genreData={genres.find((genre: any) => genre.id === selectedMember)}
          onSuccess={fetchGenres}
        />
      </div>
    );
  } else {
    return <Unauthorized />;
  }
}
