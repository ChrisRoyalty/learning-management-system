"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, UploadCloud } from "lucide-react";

type Row = {
  title: string;
  course: string;
  kind: "Assignment" | "Project" | "Quiz" | "Capstone";
  due: string;
  status: "Pending" | "In Progress" | "Submitted" | "Graded";
};

const DATA: Row[] = [
  { title: "React Component Design", course: "React Fundamentals", kind: "Assignment", due: "2024-08-20", status: "Pending" },
  { title: "State Management Project", course: "React Fundamentals", kind: "Project", due: "2024-08-25", status: "In Progress" },
  { title: "JavaScript ES6 Quiz", course: "UI/UX Design Principles", kind: "Quiz", due: "2024-08-18", status: "Submitted" },
  { title: "Final Capstone Project", course: "React Fundamentals", kind: "Capstone", due: "2024-09-01", status: "Graded" },
];

const FILTERS = ["Pending", "Submitted", "Graded", "All"] as const;
type Filter = (typeof FILTERS)[number];

export default function StudentAssignments() {
  const [filter, setFilter] = useState<Filter>("Pending");

  const rows = useMemo(() => {
    if (filter === "All") return DATA;
    return DATA.filter((r) =>
      filter === "Pending" ? r.status === "Pending" || r.status === "In Progress" : r.status === filter
    );
  }, [filter]);

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight">Assignments & Projects</h2>
        <p className="text-sm text-zinc-500">Track your assignments and project deadlines</p>
      </div>

      <div className="flex gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-full text-sm border ${
              filter === f ? "bg-zinc-900 text-white border-zinc-900" : "bg-white hover:bg-zinc-50 border-zinc-200"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {rows.map((r) => (
          <div key={r.title} className="rounded-2xl border border-zinc-200 p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold">{r.title}</h3>
                <div className="text-sm text-zinc-600">{r.course}</div>
                <div className="mt-3 flex items-center gap-3 text-sm">
                  <span className="px-2 py-0.5 rounded-md text-[11px] bg-zinc-100 text-zinc-700 border border-zinc-200">{r.kind}</span>
                  <span className="text-zinc-500">Due: {r.due}</span>
                </div>
              </div>
              <span
                className={`px-2 py-0.5 h-7 rounded-md text-[11px] self-start border ${
                  r.status === "Pending" || r.status === "In Progress"
                    ? "bg-amber-50 text-amber-700 border-amber-200"
                    : r.status === "Submitted"
                    ? "bg-sky-50 text-sky-700 border-sky-200"
                    : "bg-emerald-50 text-emerald-700 border-emerald-200"
                }`}
              >
                {r.status}
              </span>
            </div>

            {/* Actions */}
            <div className="mt-4 flex items-center gap-2">
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" /> Download
              </Button>
              <Button className="gap-2">
                <UploadCloud className="h-4 w-4" /> Submit
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
