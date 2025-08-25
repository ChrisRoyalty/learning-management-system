"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

export default function StudentCourses() {
  const courses = [
    { title: "React Fundamentals", instructor: "John Smith", grade: "B+", pct: 68, next: "2024-08-20" },
    { title: "UI/UX Design Principles", instructor: "Mike Davis", grade: "A-", pct: 45, next: "2024-08-25" },
    { title: "Python Data Science", instructor: "Emily Chen", grade: "B", pct: 20, next: "—" },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight">My Courses</h2>
        <p className="text-sm text-zinc-500">Courses you're currently enrolled in</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {courses.map((c) => (
          <Card key={c.title} className="rounded-2xl border-zinc-200">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg">{c.title}</CardTitle>
                <span className="px-2 py-0.5 rounded-md text-[11px] bg-zinc-100 text-zinc-700 border border-zinc-200">{c.grade}</span>
              </div>
              <div className="text-sm text-zinc-500">Instructor: {c.instructor}</div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm text-zinc-600 mb-1">Progress <span className="ml-1 text-zinc-500">{c.pct}%</span></div>
                <div className="h-2 rounded-full bg-zinc-200 overflow-hidden">
                  <div className="h-full bg-blue-600" style={{ width: `${c.pct}%` }} />
                </div>
              </div>
              <div className="text-xs text-zinc-500">Next deadline: {c.next}</div>
              <Button variant="outline" className="gap-2">
                <Play className="h-4 w-4" /> Continue Learning
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
    