"use client";

import { useMemo, useState } from "react";
import { Plus, Eye, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Mock data – replace with API later
const ASSIGNMENTS = [
  { title: "React Component Design", course: "React Fundamentals", type: "Assignment", due: "2025-08-25", submitted: 20, total: 25, status: "Active" },
  { title: "State Management Project", course: "React Fundamentals", type: "Project", due: "2025-09-01", submitted: 15, total: 25, status: "Active" },
  { title: "JavaScript ES6 Quiz", course: "Advanced JavaScript", type: "Quiz", due: "2025-08-18", submitted: 18, total: 18, status: "Completed" },
  { title: "Final Capstone Project", course: "React Fundamentals", type: "Capstone", due: "2025-09-20", submitted: 5, total: 25, status: "Active" },
] as const;

const FILTERS = ["All", "Active", "Completed", "Need Grading"] as const;

type Filter = typeof FILTERS[number];

export default function AssignmentsPage() {
  const [filter, setFilter] = useState<Filter>("All");

  const rows = useMemo(() => {
    if (filter === "All") return ASSIGNMENTS;
    if (filter === "Need Grading") return ASSIGNMENTS.filter(a => a.submitted < a.total && a.status !== "Completed");
    return ASSIGNMENTS.filter(a => a.status === filter);
  }, [filter]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Assignment Management</h2>
          <p className="text-sm text-zinc-500">Create and manage assignments for your courses</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Create Assignment
        </Button>
      </div>

      <div className="flex gap-2">
        {FILTERS.map(f => (
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

      <div className="rounded-2xl border border-zinc-200">
        <div className="px-2 pb-3">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Assignment</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Submissions</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((a, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{a.title}</TableCell>
                  <TableCell>{a.course}</TableCell>
                  <TableCell><Badge variant="secondary" className="rounded-md">{a.type}</Badge></TableCell>
                  <TableCell>{a.due}</TableCell>
                  <TableCell className="min-w-[160px]">
                    <div className="h-2 rounded-full bg-zinc-200 overflow-hidden">
                      <div className="h-full bg-blue-600" style={{ width: `${(a.submitted / a.total) * 100}%` }} />
                    </div>
                    <div className="text-xs text-zinc-500 mt-1">{a.submitted}/{a.total}</div>
                  </TableCell>
                  <TableCell>
                    {a.status === "Active" ? (
                      <span className="px-2 py-0.5 rounded-md text-[11px] bg-blue-600/10 text-blue-700 border border-blue-200">Active</span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-md text-[11px] bg-zinc-200 text-zinc-700 border border-zinc-300">Completed</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right space-x-1">
                    <button className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-zinc-100" aria-label="View"><Eye className="h-4 w-4" /></button>
                    <button className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-zinc-100" aria-label="Edit"><Edit2 className="h-4 w-4" /></button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
