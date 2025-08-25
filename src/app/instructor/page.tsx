"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const stats = { activeCourses: 2, totalStudents: 4, pendingReviews: 12, averageScore: "B+" };

export default function InstructorHome() {
  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="rounded-2xl border-zinc-200"><CardHeader className="pb-2"><CardTitle className="text-sm text-zinc-500">Active Courses</CardTitle></CardHeader><CardContent className="flex items-end justify-between"><div className="text-3xl font-bold">{stats.activeCourses}</div><div className="text-xs text-zinc-500">Teaching actively</div></CardContent></Card>
        <Card className="rounded-2xl border-zinc-200"><CardHeader className="pb-2"><CardTitle className="text-sm text-zinc-500">Total Students</CardTitle></CardHeader><CardContent className="flex items-end justify-between"><div className="text-3xl font-bold text-emerald-600">{stats.totalStudents}</div><div className="text-xs text-zinc-500">Across all courses</div></CardContent></Card>
        <Card className="rounded-2xl border-zinc-200"><CardHeader className="pb-2"><CardTitle className="text-sm text-zinc-500">Pending Reviews</CardTitle></CardHeader><CardContent className="flex items-end justify-between"><div className="text-3xl font-bold text-amber-500">{stats.pendingReviews}</div><div className="text-xs text-zinc-500">Assignments to grade</div></CardContent></Card>
        <Card className="rounded-2xl border-zinc-200"><CardHeader className="pb-2"><CardTitle className="text-sm text-zinc-500">Average Score</CardTitle></CardHeader><CardContent className="flex items-end justify-between"><div className="text-3xl font-bold text-sky-600">{stats.averageScore}</div><div className="text-xs text-zinc-500">Class average</div></CardContent></Card>
      </div>

      {/* My Courses + Recent Activity */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="rounded-2xl border-zinc-200">
          <CardHeader><CardTitle className="text-base">My Courses</CardTitle><p className="text-sm text-zinc-500">Your assigned courses and progress</p></CardHeader>
          <CardContent className="space-y-4">
            <CourseProgress title="React Fundamentals" pct={68} students={25} nextDate="2024-08-20" />
            <CourseProgress title="Advanced JavaScript" pct={45} students={18} nextDate="2024-08-25" />
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-zinc-200">
          <CardHeader><CardTitle className="text-base">Recent Activity</CardTitle><p className="text-sm text-zinc-500">Latest student submissions and activities</p></CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2"><span className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-500" /><div><div className="font-medium">Alice Cooper submitted assignment</div><div className="text-xs text-zinc-500">React Component Design · 2 hours ago</div></div></li>
              <li className="flex items-start gap-2"><span className="mt-1 h-2.5 w-2.5 rounded-full bg-amber-500" /><div><div className="font-medium">Charlie Brown missed deadline</div><div className="text-xs text-zinc-500">JavaScript ES6 Quiz · 1 day ago</div></div></li>
              <li className="flex items-start gap-2"><span className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-500" /><div><div className="font-medium">Bob Wilson submitted project</div><div className="text-xs text-zinc-500">State Management Project · 3 hours ago</div></div></li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function CourseProgress({ title, pct, students, nextDate }: { title: string; pct: number; students: number; nextDate: string; }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <div className="font-medium">{title}</div>
        <Badge variant="secondary" className="rounded-md">{students} students</Badge>
      </div>
      <div className="h-2 rounded-full bg-zinc-200 overflow-hidden">
        <div className="h-full bg-blue-600" style={{ width: `${pct}%` }} />
      </div>
      <div className="mt-1 flex items-center justify-between text-xs text-zinc-500">
        <span>{pct}% complete</span>
        <span>Next deadline: {nextDate}</span>
      </div>
    </div>
  );
}
