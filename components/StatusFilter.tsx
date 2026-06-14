"use client";

import { useState } from "react";

type StatusFilterProps = {
  filter: string;
  setFilter: (value: string) => void;
};

const statuses = [
  "All",
  "Applied",
  "Interview",
  "Offer",
  "Rejected",
];

export default function StatusFilter({
  filter,
  setFilter,
}: StatusFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  function getStatusStyle(status: string) {
    switch (status) {
      case "Applied":
        return "bg-blue-100 text-blue-800";

      case "Interview":
        return "bg-amber-100 text-amber-800";

      case "Offer":
        return "bg-green-100 text-green-800";

      case "Rejected":
        return "bg-red-100 text-red-800";

      default:
        return "bg-gray-200 text-gray-900";
    }
  }

  return (
    <div className="relative w-full md:w-56">
      {/* Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
          w-full
          bg-white
          border border-gray-300
          rounded-2xl
          px-4 py-3
          flex items-center justify-between
          shadow-sm
          hover:border-[#165DFF]
          transition-all
        "
      >
        <span
          className={`
            px-3 py-1 rounded-full text-sm font-semibold
            ${getStatusStyle(filter)}
          `}
        >
          {filter}
        </span>

        <span
          className={`
            text-gray-900 transition-transform
            ${isOpen ? "rotate-180" : ""}
          `}
        >
          ▼
        </span>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          className="
            absolute
            mt-2
            w-full
            bg-white
            border border-gray-300
            rounded-2xl
            shadow-lg
            overflow-hidden
            z-50
          "
        >
          {statuses.map((status) => (
            <button
              key={status}
              onClick={() => {
                setFilter(status);
                setIsOpen(false);
              }}
              className="
                w-full
                px-4 py-3
                flex items-center justify-between
                hover:bg-gray-100
                transition
              "
            >
              <span
                className={`
                  px-3 py-1 rounded-full text-sm font-semibold
                  ${getStatusStyle(status)}
                `}
              >
                {status}
              </span>

              {filter === status && (
                <span className="text-[#165DFF] font-bold">
                  ✓
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}