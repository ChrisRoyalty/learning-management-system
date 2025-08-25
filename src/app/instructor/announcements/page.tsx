"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const seed = [
  { title: "Welcome to React Fundamentals", course: "React Fundamentals", when: "3 days ago", body: "Welcome to the React Fundamentals course! I'm excited to work with you this semester. Please make sure to review the course syllabus and set up your development environment using the provided guide." },
  { title: "Assignment 2 Due Date Extended", course: "React Fundamentals", when: "1 day ago", body: "Due to the complexity of the React Component Design assignment, I'm extending the due date to August 25th. This should give everyone enough time to complete the project thoroughly." },
  { title: "Office Hours This Week", course: "All Courses", when: "2 hours ago", body: "I'll be holding extra office hours this week on Thursday from 2-4 PM to help with any questions about the upcoming projects. Feel free to drop by or schedule a one-on-one meeting." },
];

export default function AnnouncementsPage() {
  const [items, setItems] = useState(seed);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [course, setCourse] = useState("All Courses");
  const [body, setBody] = useState("");

  const add = () => {
    setItems([{ title, course, when: "just now", body }, ...items]);
    setOpen(false);
    setTitle("");
    setCourse("All Courses");
    setBody("");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Announcements</h2>
          <p className="text-sm text-zinc-500">Post announcements and feedback for your students</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button className="gap-2"><Plus className="h-4 w-4" /> New Announcement</Button></DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader><DialogTitle>New Announcement</DialogTitle></DialogHeader>
            <div className="grid gap-3 py-2">
              <div className="grid gap-1.5"><Label htmlFor="t">Title</Label><Input id="t" value={title} onChange={(e)=>setTitle(e.target.value)} /></div>
              <div className="grid gap-1.5"><Label htmlFor="c">Course</Label><Input id="c" value={course} onChange={(e)=>setCourse(e.target.value)} placeholder="e.g. React Fundamentals or All Courses" /></div>
              <div className="grid gap-1.5"><Label htmlFor="b">Body</Label><textarea id="b" value={body} onChange={(e)=>setBody(e.target.value)} className="min-h-[120px] rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" /></div>
            </div>
            <DialogFooter>
              <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
              <DialogClose asChild><Button onClick={add}>Publish</Button></DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {items.map((a, i) => (
          <article key={i} className="rounded-2xl border border-zinc-200 p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-semibold">{a.title}</h3>
                <div className="text-xs text-zinc-500">Posted {a.when}</div>
              </div>
              <Badge variant="secondary" className="rounded-md whitespace-nowrap">{a.course}</Badge>
            </div>
            <p className="mt-3 text-sm text-zinc-700 leading-6">{a.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
