// app/admin/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TrendingUp, ClipboardList } from "lucide-react";

// Mock data (swap for API calls)
const stats = {
  courses: 4,
  students: 4,
  instructors: 4,
  completionRate: 87,
};

const recentEnrollments = [
  { name: "Alice Cooper", course: "React Fundamentals", isNew: true },
  { name: "Bob Wilson", course: "Node.js Backend", isNew: true },
  { name: "Charlie Brown", course: "Python Data Science", isNew: true },
  { name: "Diana Prince", course: "React Fundamentals", isNew: true },
];

const coursePerformance = [
  { title: "React Fundamentals", students: 25, status: "Active" as const },
  { title: "Node.js Backend Development", students: 18, status: "Active" as const },
  { title: "UI/UX Design Principles", students: 32, status: "Draft" as const },
  { title: "Python Data Science", students: 15, status: "Active" as const },
];

function StatusBadge({ status }: { status: "Active" | "Draft" | "Paused" }) {
  const styles =
    status === "Active"
      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
      : status === "Draft"
      ? "bg-amber-50 text-amber-700 border border-amber-200"
      : "bg-zinc-50 text-zinc-700 border border-zinc-200";
  return <span className={`px-2 py-0.5 text-[11px] rounded-md ${styles}`}>{status}</span>;
}

export default function AdminHomePage() {
  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="rounded-2xl border-zinc-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-zinc-500">Total Courses</CardTitle>
          </CardHeader>
          <CardContent className="flex items-end justify-between">
            <div className="text-3xl font-bold">{stats.courses}</div>
            <div className="flex items-center gap-2 text-xs text-zinc-500">
              <ClipboardList className="h-4 w-4" /> <span>+2 from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-zinc-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-zinc-500">Total Students</CardTitle>
          </CardHeader>
          <CardContent className="flex items-end justify-between">
            <div className="text-3xl font-bold text-emerald-600">{stats.students}</div>
            <div className="flex items-center gap-2 text-xs text-zinc-500">
              <TrendingUp className="h-4 w-4" /> <span>+12 from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-zinc-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-zinc-500">Active Instructors</CardTitle>
          </CardHeader>
          <CardContent className="flex items-end justify-between">
            <div className="text-3xl font-bold">{stats.instructors}</div>
            <div className="text-xs text-zinc-500">All instructors active</div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-zinc-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-zinc-500">Completion Rate</CardTitle>
          </CardHeader>
          <CardContent className="flex items-end justify-between">
            <div className="text-3xl font-bold text-amber-500">{stats.completionRate}%</div>
            <div className="text-xs text-zinc-500">+5% from last month</div>
          </CardContent>
        </Card>
      </div>

      {/* Two Panels */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="rounded-2xl border-zinc-200">
          <CardHeader>
            <CardTitle className="text-base">Recent Enrollments</CardTitle>
            <p className="text-sm text-zinc-500">Latest student course enrollments</p>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[280px] pr-4">
              <ul className="space-y-3">
                {recentEnrollments.map((e, idx) => (
                  <li key={idx} className="flex items-center justify-between">
                    <div className="flex items-start gap-3">
                      <span className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-500" />
                      <div>
                        <div className="font-medium leading-tight">{e.name}</div>
                        <div className="text-xs text-zinc-500">Enrolled in {e.course}</div>
                      </div>
                    </div>
                    {e.isNew && <Badge variant="secondary" className="rounded-md">New</Badge>}
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-zinc-200">
          <CardHeader>
            <CardTitle className="text-base">Course Performance</CardTitle>
            <p className="text-sm text-zinc-500">Top performing courses this month</p>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {coursePerformance.map((c, idx) => (
                <li key={idx} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium leading-tight">{c.title}</div>
                    <div className="text-xs text-zinc-500">{c.students} students</div>
                  </div>
                  <StatusBadge status={c.status} />
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
