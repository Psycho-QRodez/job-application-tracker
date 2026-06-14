"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";

import { Application } from "@/types/Application";

type ApplicationTableProps = {
  applications: Application[];

  onDelete: (id: number) => void;

  onStatusChange: (
    id: number,
    status: string
  ) => void;
};

export default function ApplicationTable({
  applications,
  onDelete,
  onStatusChange,
}: ApplicationTableProps) {
  const [expandedId, setExpandedId] =
    useState<number | null>(null);

  const statuses = [
    "Applied",
    "Interview",
    "Offer",
    "Rejected",
  ];

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
    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">
        Recent Applications
      </h2>

      {applications.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-300 shadow-sm p-6 text-gray-900">
          No applications found.
        </div>
      ) : (
        applications.map((application) => (
          <div
            key={application.id}
            className="
              bg-white
              border border-gray-300
              rounded-3xl
              shadow-sm
              hover:shadow-lg
              transition-all
              duration-200
              cursor-pointer
            "
            onClick={() =>
              setExpandedId(
                expandedId ===
                  application.id
                  ? null
                  : application.id
              )
            }
          >
            <div className="p-6">

              <div className="flex flex-col md:flex-row md:justify-between gap-4">

                {/* Left */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {application.company}
                  </h3>

                  <p className="mt-1 text-gray-900">
                    {application.position}
                  </p>
                </div>

                {/* Right */}
                <div
                  className="flex flex-wrap gap-2"
                  onClick={(e) =>
                    e.stopPropagation()
                  }
                >
                  <select
                    value={application.status}
                    onChange={(e) =>
                      onStatusChange(
                        application.id,
                        e.target.value
                      )
                    }
                    className={`
                      px-4 py-2
                      rounded-full
                      text-sm
                      font-semibold
                      border-none
                      outline-none
                      cursor-pointer
                      ${getStatusStyle(
                        application.status
                      )}
                    `}
                  >
                    {statuses.map((status) => (
                      <option
                        key={status}
                        value={status}
                      >
                        {status}
                      </option>
                    ))}
                  </select>

                  <button
                      onClick={() => {
                      if (
                        confirm(
                          `Delete application for ${application.company}?`
                        )
                      ) {
                        onDelete(application.id);
                      }
                    }}
                    className="
                    p-2
                    rounded-xl
                    text-red-600
                    hover:bg-red-100
                    transition
                  "
                  title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              {/* Expanded Details */}
              {expandedId ===
                application.id && (
                <div className="mt-6 border-t border-gray-300 pt-6 space-y-3 text-gray-900">

                  <p>
                    <strong>
                      Applied Date:
                    </strong>{" "}
                    {application.createdAt ||
                      "-"}
                  </p>

                  <p>
                    <strong>
                      Location:
                    </strong>{" "}
                    {application.location ||
                      "-"}
                  </p>

                  <p>
                    <strong>
                      Salary:
                    </strong>{" "}
                    {application.salary ||
                      "-"}
                  </p>

                  <p>
                    <strong>
                      Notes:
                    </strong>{" "}
                    {application.notes ||
                      "-"}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </section>
  );
}