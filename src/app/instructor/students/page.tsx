"use client";

import { useMemo, useState } from "react";
import { Eye } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const allRows = [
  { name: "Alice Cooper", course: "React Fundamentals", progress: 85, grade: "A", last: "2024-08-10", status: "Active" },
  { name: "Bob Wilson", course: "React Fundamentals", progress: 72, grade: "B+", last: "2024-08-09", status: "Active" },
  { name: "Charlie Brown", course: "Advanced JavaScript", progress: 45, grade: "C", last: "2024-08-05", status: "Behind" },
  { name: "Diana Prince", course: "React Fundamentals", progress: 90, grade: "A+", last: "2024-08-11", status: "Active" },
];

export default function StudentsPage() {
  const [course, setCourse] = useState<string>("All");
  const courses = ["All", "React Fundamentals", "Advanced JavaScript"];

  const rows = useMemo(() => (course === "All" ? allRows : allRows.filter(r => r.course === course)), [course]);

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-semibold">My Students</h2>
        <p className="text-sm text-zinc-500">Students enrolled in your courses</p>
      </div>

      <div className="flex justify-end">
        <Select defaultValue={course} onValueChange={setCourse}>
          <SelectTrigger className="w-56"><SelectValue placeholder="All Courses" /></SelectTrigger>
          <SelectContent>
            {courses.map(c => (<SelectItem key={c} value={c}>{c}</SelectItem>))}
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-2xl border border-zinc-200">
        <div className="px-2 pb-3">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Last Activity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((r, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{r.name}</TableCell>
                  <TableCell>{r.course}</TableCell>
                  <TableCell className="min-w-[160px]">
                    <div className="h-2 rounded-full bg-zinc-200 overflow-hidden">
                      <div className="h-full bg-blue-600" style={{ width: `${r.progress}%` }} />
                    </div>
                    <div className="text-xs text-zinc-500 mt-1">{r.progress}%</div>
                  </TableCell>
                  <TableCell><Badge variant="secondary" className="rounded-md">{r.grade}</Badge></TableCell>
                  <TableCell>{r.last}</TableCell>
                  <TableCell>
                    {r.status === "Active" ? (
                      <span className="px-2 py-0.5 rounded-md text-[11px] bg-blue-600/10 text-blue-700 border border-blue-200">Active</span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-md text-[11px] bg-zinc-200 text-zinc-700 border border-zinc-300">Behind</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <button className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-zinc-100" aria-label="View">
                      <Eye className="h-4 w-4" />
                    </button>
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
