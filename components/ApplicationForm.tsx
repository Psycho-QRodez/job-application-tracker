"use client";

import { useState } from "react";
import { Application } from "@/types/Application";

type ApplicationFormProps = {
  onAddApplication: (application: {
    company: string;
    position: string;
    status: string;
    location: string;
    salary: string;
    notes: string;
  }) => Promise<void>;
};

export default function ApplicationForm({
  onAddApplication,
}: ApplicationFormProps) {
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [status, setStatus] = useState("Applied");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [notes, setNotes] = useState("");

  async function handleSubmit() {
    if (!company.trim() || !position.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    await onAddApplication({
      company,
      position,
      status,
      location,
      salary,
      notes,
    });

    setCompany("");
    setPosition("");
    setStatus("Applied");
  }

  return (
    <section className="bg-white rounded-2xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        Add Application
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          className="border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#165DFF] text-gray-700"
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />

        <input
          className="border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#165DFF] text-gray-700"
          placeholder="Position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />
        <input
          className="border border-gray-300 rounded-xl px-4 py-3 text-gray-900"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <input
          className="border border-gray-300 rounded-xl px-4 py-3 text-gray-900"
          placeholder="Salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
        />

        <textarea
          className="border border-gray-300 rounded-xl px-4 py-3 text-gray-900 md:col-span-3"
          placeholder="Notes..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <select
          className="border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#165DFF] text-gray-600"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>Applied</option>
          <option>Interview</option>
          <option>Offer</option>
          <option>Rejected</option>
        </select>
      </div>

      <button
        onClick={handleSubmit}
        className="mt-6 bg-[#165DFF] text-white px-6 py-3 rounded-xl hover:opacity-90 transition"
      >
        + Add Application
      </button>
    </section>
  );
}