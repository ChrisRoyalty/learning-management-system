"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function StudentHome() {
  const stats = { enrolled: 3, pending: 2, avgGrade: "B+", completion: 87 };

  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="rounded-2xl border-zinc-200">
          <CardHeader className="pb-2"><CardTitle className="text-sm text-zinc-500">Enrolled Courses</CardTitle></CardHeader>
          <CardContent className="flex items-end justify-between">
            <div className="text-3xl font-bold">{stats.enrolled}</div>
            <div className="text-xs text-zinc-500">Active this semester</div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-zinc-200">
          <CardHeader className="pb-2"><CardTitle className="text-sm text-zinc-500">Pending Tasks</CardTitle></CardHeader>
          <CardContent className="flex items-end justify-between">
            <div className="text-3xl font-bold text-amber-500">{stats.pending}</div>
            <div className="text-xs text-zinc-500">Assignments due soon</div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-zinc-200">
          <CardHeader className="pb-2"><CardTitle className="text-sm text-zinc-500">Average Grade</CardTitle></CardHeader>
          <CardContent className="flex items-end justify-between">
            <div className="text-3xl font-bold text-emerald-600">{stats.avgGrade}</div>
            <div className="text-xs text-zinc-500">Across all courses</div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-zinc-200">
          <CardHeader className="pb-2"><CardTitle className="text-sm text-zinc-500">Completion Rate</CardTitle></CardHeader>
          <CardContent className="flex items-end justify-between">
            <div className="text-3xl font-bold text-sky-600">{stats.completion}%</div>
            <div className="text-xs text-zinc-500">Assignments completed</div>
          </CardContent>
        </Card>
      </div>

      {/* Course Progress */}
      <Card className="rounded-2xl border-zinc-200">
        <CardHeader>
          <CardTitle className="text-base">Course Progress</CardTitle>
          <p className="text-sm text-zinc-500">Your progress across all enrolled courses</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {[
            { title: "React Fundamentals", grade: "B+", pct: 68, next: "2024-08-20" },
            { title: "UI/UX Design Principles", grade: "A-", pct: 45, next: "2024-08-25" },
            { title: "Python Data Science", grade: "B", pct: 20, next: "—" },
          ].map((c) => (
            <div key={c.title} className="space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="font-medium">{c.title}</div>
                <span className="px-2 py-0.5 rounded-md text-[11px] bg-zinc-100 text-zinc-700 border border-zinc-200">{c.grade}</span>
              </div>
              <div className="h-2 rounded-full bg-zinc-200 overflow-hidden">
                <div className="h-full bg-blue-600" style={{ width: `${c.pct}%` }} />
              </div>
              <div className="text-xs text-zinc-500 flex justify-between">
                <span>{c.pct}% complete</span>
                <span>Next: {c.next}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
