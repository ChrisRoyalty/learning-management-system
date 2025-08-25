"use client";

import { Card as CardA, CardHeader as CardHeaderA, CardContent as CardContentA, CardTitle as CardTitleA } from "@/components/ui/card";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Course Analytics</h2>
        <p className="text-sm text-zinc-500">Student performance analysis and insights</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <CardA className="rounded-2xl border-zinc-200">
          <CardHeaderA><CardTitleA className="text-base">Student Performance Distribution</CardTitleA><p className="text-sm text-zinc-500">Grade distribution across all students</p></CardHeaderA>
          <CardContentA className="space-y-3 text-sm">
            {[
              { label: "A+ (90-100%)", pct: 15 },
              { label: "A (85-89%)", pct: 25 },
              { label: "B+ (80-84%)", pct: 30 },
              { label: "B (75-79%)", pct: 20 },
              { label: "C (70-74%)", pct: 10 },
            ].map((row) => (
              <div key={row.label} className="flex items-center gap-4">
                <div className="w-40 text-zinc-600">{row.label}</div>
                <div className="flex-1 h-2 rounded-full bg-zinc-200 overflow-hidden">
                  <div className="h-full bg-blue-600" style={{ width: `${row.pct}%` }} />
                </div>
                <div className="w-10 text-right text-zinc-600">{row.pct}%</div>
              </div>
            ))}
          </CardContentA>
        </CardA>

        <CardA className="rounded-2xl border-zinc-200">
          <CardHeaderA><CardTitleA className="text-base">Assignment Completion Rates</CardTitleA><p className="text-sm text-zinc-500">Completion rates by assignment type</p></CardHeaderA>
          <CardContentA className="space-y-3 text-sm">
            {[
              { label: "Quizzes", pct: 95 },
              { label: "Assignments", pct: 88 },
              { label: "Projects", pct: 75 },
              { label: "Capstone", pct: 60 },
            ].map((row) => (
              <div key={row.label} className="flex items-center gap-4">
                <div className="w-40 text-zinc-600">{row.label}</div>
                <div className="flex-1 h-2 rounded-full bg-zinc-200 overflow-hidden">
                  <div className="h-full bg-blue-600" style={{ width: `${row.pct}%` }} />
                </div>
                <div className="w-10 text-right text-zinc-600">{row.pct}%</div>
              </div>
            ))}
          </CardContentA>
        </CardA>
      </div>

      <CardA className="rounded-2xl border-zinc-200">
        <CardHeaderA><CardTitleA className="text-base">Student Progress Tracking</CardTitleA><p className="text-sm text-zinc-500">Individual student progress in your courses</p></CardHeaderA>
        <CardContentA>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-zinc-500">
                <th className="py-2">Student</th>
                <th>Course</th>
                <th className="min-w-[160px]">Assignments Completed</th>
                <th>Average Score</th>
                <th>Trend</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "Alice Cooper", course: "React Fundamentals", pct: 70, score: "A", trend: "↑", status: "Active" },
                { name: "Bob Wilson", course: "React Fundamentals", pct: 60, score: "B+", trend: "↗", status: "Active" },
                { name: "Charlie Brown", course: "Advanced JavaScript", pct: 40, score: "C", trend: "→", status: "Behind" },
                { name: "Diana Prince", course: "React Fundamentals", pct: 90, score: "A+", trend: "↗", status: "Active" },
              ].map((r, i) => (
                <tr key={i} className="border-t border-zinc-200">
                  <td className="py-3 font-medium">{r.name}</td>
                  <td>{r.course}</td>
                  <td>
                    <div className="h-2 rounded-full bg-zinc-200 overflow-hidden">
                      <div className="h-full bg-blue-600" style={{ width: `${r.pct}%` }} />
                    </div>
                  </td>
                  <td><span className="px-2 py-0.5 rounded-md text-[11px] bg-zinc-100 text-zinc-700 border border-zinc-200">{r.score}</span></td>
                  <td>{r.trend}</td>
                  <td>{r.status === "Active" ? <span className="px-2 py-0.5 rounded-md text-[11px] bg-blue-600/10 text-blue-700 border border-blue-200">Active</span> : <span className="px-2 py-0.5 rounded-md text-[11px] bg-zinc-200 text-zinc-700 border border-zinc-300">Behind</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContentA>
      </CardA>
    </div>
  );
}
