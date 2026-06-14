"use client";

import { useEffect, useState } from "react";

import StatsCards from "@/components/StatsCards";
import ApplicationTable from "@/components/ApplicationTable";
import ApplicationForm from "@/components/ApplicationForm";
import StatusFilter from "@/components/StatusFilter";
import { supabase } from "@/lib/supabase";

import { Application } from "@/types/Application";

export default function Home() {
const [applications, setApplications] =
  useState<Application[]>([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");

  async function fetchApplications() {
  const { data, error } = await supabase
    .from("applications")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error(error);
    return;
  }

  const formattedApplications =
    data.map((app) => ({
      id: app.id,
      company: app.company,
      position: app.position,
      status: app.status,
      location: app.location,
      salary: app.salary,
      notes: app.notes,
      createdAt: app.created_at,
    }));

  setApplications(formattedApplications);
}

  useEffect(() => {
    fetchApplications();
  }, []);


  async function handleAddApplication(application: {
  company: string;
  position: string;
  status: string;
  location: string;
  salary: string;
  notes: string;
}) {
  const { error } = await supabase
    .from("applications")
    .insert([
      {
        company: application.company,
        position: application.position,
        status: application.status,
        location: application.location,
        salary: application.salary,
        notes: application.notes,
      },
    ]);

  if (error) {
    console.error(error);

    alert(
      "Failed to add application:\n" +
      error.message
    );

    return;
  }

  await fetchApplications();
}

  async function handleDelete(id: number) {
  const confirmed = window.confirm(
    "Are you sure you want to delete this application?"
  );

  if (!confirmed) {
    return;
  }

  const { error } = await supabase
    .from("applications")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);

    alert(
      "Failed to delete application:\n" +
      error.message
    );

    return;
  }

  await fetchApplications();
}

  async function handleStatusChange(
  id: number,
  status: string
) {
  const { error } = await supabase
    .from("applications")
    .update({
      status,
    })
    .eq("id", id);

  if (error) {
    console.error(error);

    alert(
      "Failed to update status:\n" +
      error.message
    );

    return;
  }

  await fetchApplications();
}

  const filteredApplications = applications.filter(
    (app) => {
      const matchesSearch = app.company
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesFilter =
        filter === "All" ||
        app.status === filter;

      return matchesSearch && matchesFilter;
    }
  );

  return (
    <main className="min-h-screen bg-[#F8F9FA]">
      <div className="max-w-6xl mx-auto px-6 py-10 space-y-10">

        {/* Hero */}
        <section className="bg-white rounded-3xl border border-gray-300 shadow-sm p-8">
          <h1 className="text-4xl font-bold text-gray-900">
            Job Application Tracker
          </h1>

          <p className="mt-4 text-gray-900 max-w-3xl">
            Track and manage your job applications efficiently.
            Stay organized and never miss an opportunity.
          </p>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCards
            title="Total Applications"
            value={applications.length}
          />

          <StatsCards
            title="Interviews"
            value={
              applications.filter(
                (app) =>
                  app.status === "Interview"
              ).length
            }
          />

          <StatsCards
            title="Offers"
            value={
              applications.filter(
                (app) => app.status === "Offer"
              ).length
            }
          />
        </section>

        <ApplicationForm
          onAddApplication={handleAddApplication}
        />

        {/* Search + Filter */}
        <section className="flex flex-col md:flex-row gap-4">
          <input
            className="
              flex-1
              bg-white
              border border-gray-300
              rounded-2xl
              px-4 py-3
              text-gray-900
              placeholder:text-gray-700
              shadow-sm
              focus:outline-none
              focus:ring-2
              focus:ring-[#165DFF]
              focus:border-[#165DFF]
            "
            placeholder="Search by company..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
          />

          <StatusFilter
            filter={filter}
            setFilter={setFilter}
          />
        </section>

        {/* Applications */}
        <ApplicationTable
          applications={filteredApplications}
          onDelete={handleDelete}
          onStatusChange={
            handleStatusChange
          }
        />
      </div>
    </main>
  );
}