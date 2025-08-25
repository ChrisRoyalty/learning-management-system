"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function StudentGrades() {
  const courses = [
    { title: "React Fundamentals", grade: "B+", pct: 68 },
    { title: "UI/UX Design Principles", grade: "A-", pct: 45 },
    { title: "Python Data Science", grade: "B", pct: 20 },
  ];

  const recent = [
    { assignment: "JavaScript ES6 Quiz", course: "React Fundamentals", grade: "A", score: "92/100", date: "2024-08-10" },
    { assignment: "Wireframe Exercise", course: "UI/UX Design Principles", grade: "A-", score: "88/100", date: "2024-08-08" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight">Grades & Progress</h2>
        <p className="text-sm text-zinc-500">Track your academic performance and progress</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {courses.map((c) => (
          <Card key={c.title} className="rounded-2xl border-zinc-200">
            <CardHeader>
              <CardTitle className="text-lg">{c.title}</CardTitle>
              <div className="text-sm text-zinc-500">Current Grade</div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-3xl font-bold text-emerald-600">{c.grade}</div>
              <div className="h-2 rounded-full bg-zinc-200 overflow-hidden">
                <div className="h-full bg-blue-600" style={{ width: `${c.pct}%` }} />
              </div>
              <div className="text-xs text-zinc-500">{c.pct}% complete</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="rounded-2xl border-zinc-200">
        <CardHeader>
          <CardTitle className="text-base">Recent Grades</CardTitle>
          <p className="text-sm text-zinc-500">Your latest assignment and project grades</p>
        </CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-zinc-500">
                <th className="py-2">Assignment</th>
                <th>Course</th>
                <th>Grade</th>
                <th>Score</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((r) => (
                <tr key={r.assignment} className="border-t border-zinc-200">
                  <td className="py-3 font-medium">{r.assignment}</td>
                  <td>{r.course}</td>
                  <td>
                    <span className="px-2 py-0.5 rounded-md text-[11px] bg-zinc-100 text-zinc-700 border border-zinc-200">{r.grade}</span>
                  </td>
                  <td>{r.score}</td>
                  <td>{r.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
