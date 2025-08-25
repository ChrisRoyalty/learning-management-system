"use client";

export default function StudentAnnouncements() {
  const items = [
    {
      title: "Welcome to React Fundamentals",
      from: "From John Smith - 3 days ago",
      course: "React Fundamentals",
      body:
        "Welcome to the React Fundamentals course! I'm excited to work with you this semester. Please make sure to review the course syllabus and set up your development environment using the provided guide.",
    },
    {
      title: "Assignment 2 Due Date Extended",
      from: "From John Smith - 1 day ago",
      course: "React Fundamentals",
      body:
        "Due to the complexity of the React Component Design assignment, I'm extending the due date to August 25th. This should give everyone enough time to complete the project thoroughly.",
    },
    {
      title: "Design Thinking Workshop",
      from: "From Mike Davis - just now",
      course: "UI/UX Design",
      body:
        "Join our optional design thinking workshop this Friday to strengthen your prototyping skills. RSVP in the course forum.",
    },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight">Announcements</h2>
        <p className="text-sm text-zinc-500">Latest updates from your instructors</p>
      </div>

      <div className="space-y-4">
        {items.map((a, i) => (
          <article key={i} className="rounded-2xl border border-zinc-200 p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-semibold text-lg">{a.title}</h3>
                <div className="text-xs text-zinc-500">{a.from}</div>
              </div>
              <span className="px-2 py-0.5 rounded-md text-[11px] bg-zinc-100 text-zinc-700 border border-zinc-200">
                {a.course}
              </span>
            </div>
            <p className="mt-3 text-sm text-zinc-700 leading-6">{a.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
