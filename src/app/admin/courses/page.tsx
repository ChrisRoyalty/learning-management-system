"use client";

import { useMemo, useState } from "react";
import { Plus, Edit2, Trash2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";

// Types
export type CourseStatus = "Active" | "Draft";
export type Course = {
  id: string;
  title: string;
  category: string;
  durationWeeks: number;
  students: number;
  instructor: string;
  status: CourseStatus;
};

const initialCourses: Course[] = [
  { id: "1", title: "React Fundamentals", category: "Frontend", durationWeeks: 8, students: 25, instructor: "John Smith", status: "Active" },
  { id: "2", title: "Node.js Backend Development", category: "Backend", durationWeeks: 10, students: 18, instructor: "Sarah Johnson", status: "Active" },
  { id: "3", title: "UI/UX Design Principles", category: "Design", durationWeeks: 6, students: 32, instructor: "Mike Davis", status: "Draft" },
  { id: "4", title: "Python Data Science", category: "Data Science", durationWeeks: 12, students: 15, instructor: "Emily Chen", status: "Active" },
];

function StatusChip({ status }: { status: CourseStatus }) {
  const cls =
    status === "Active"
      ? "bg-blue-600/10 text-blue-700 border border-blue-200"
      : "bg-amber-500/10 text-amber-700 border border-amber-200";
  return <span className={`px-2 py-0.5 text-[11px] rounded-md ${cls}`}>{status}</span>;
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [q, setQ] = useState("");

  // Editing state
  const [editing, setEditing] = useState<Course | null>(null);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return courses;
    return courses.filter((c) =>
      [c.title, c.category, c.instructor].some((v) => v.toLowerCase().includes(term))
    );
  }, [q, courses]);

  function handleSave(course: Partial<Course> & { id?: string }) {
    if (course.id) {
      setCourses((prev) => prev.map((c) => (c.id === course.id ? { ...c, ...course } as Course : c)));
    } else {
      const id = Math.random().toString(36).slice(2, 9);
      setCourses((prev) => [
        ...prev,
        {
          id,
          title: course.title || "Untitled",
          category: course.category || "General",
          durationWeeks: course.durationWeeks || 8,
          students: course.students ?? 0,
          instructor: course.instructor || "TBD",
          status: (course.status as CourseStatus) || "Draft",
        },
      ]);
    }
  }

  function handleDelete(id: string) {
    setCourses((prev) => prev.filter((c) => c.id !== id));
  }

  return (
    <div className="space-y-4">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl md:text-2xl font-semibold">Course Management</h2>
          <p className="text-sm text-zinc-500">Manage all courses in the academy</p>
        </div>

        {/* Add Course */}
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2"><Plus className="h-4 w-4" /> Add Course</Button>
          </DialogTrigger>
          <CourseForm onSave={(data) => handleSave(data)} />
        </Dialog>
      </div>

      {/* Search + Table card */}
      <div className="rounded-2xl border border-zinc-200">
        <div className="p-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <Input
              placeholder="Search courses..."
              className="pl-9"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
        </div>
        <div className="px-2 pb-3">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Instructor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="font-medium">{c.title}</TableCell>
                  <TableCell>{c.category}</TableCell>
                  <TableCell>{c.durationWeeks} weeks</TableCell>
                  <TableCell>{c.students}</TableCell>
                  <TableCell>{c.instructor}</TableCell>
                  <TableCell><StatusChip status={c.status} /></TableCell>
                  <TableCell className="text-right">
                    {/* Edit */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="hover:bg-zinc-100" aria-label={`Edit ${c.title}`} onClick={() => setEditing(c)}>
                          <Edit2 className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <CourseForm
                        initial={editing ?? c}
                        onSave={(data) => {
                          handleSave({ ...data, id: c.id });
                          setEditing(null);
                        }}
                      />
                    </Dialog>

                    {/* Delete */}
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="hover:bg-zinc-100" aria-label={`Delete ${c.title}`}>
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete “{c.title}”?</AlertDialogTitle>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(c.id)} className="bg-red-600 hover:bg-red-700">
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-10 text-sm text-zinc-500">
                    No courses match your search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

// --- Course Form (DialogContent) ---
function CourseForm({
  initial,
  onSave,
}: {
  initial?: Partial<Course>;
  onSave: (data: Partial<Course>) => void;
}) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [category, setCategory] = useState(initial?.category ?? "");
  const [durationWeeks, setDurationWeeks] = useState<number>(initial?.durationWeeks ?? 8);
  const [students, setStudents] = useState<number>(initial?.students ?? 0);
  const [instructor, setInstructor] = useState(initial?.instructor ?? "");
  const [status, setStatus] = useState<CourseStatus>((initial?.status as CourseStatus) ?? "Active");

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>{initial?.id ? "Edit Course" : "Add Course"}</DialogTitle>
      </DialogHeader>
      <div className="grid gap-3 py-2">
        <div className="grid gap-1.5">
          <Label htmlFor="title">Course Title</Label>
          <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. React Fundamentals" />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="category">Category</Label>
          <Input id="category" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Frontend" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="grid gap-1.5">
            <Label htmlFor="duration">Duration (weeks)</Label>
            <Input id="duration" type="number" value={durationWeeks} onChange={(e) => setDurationWeeks(Number(e.target.value) || 0)} />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="students">Students</Label>
            <Input id="students" type="number" value={students} onChange={(e) => setStudents(Number(e.target.value) || 0)} />
          </div>
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="instructor">Instructor</Label>
          <Input id="instructor" value={instructor} onChange={(e) => setInstructor(e.target.value)} placeholder="John Smith" />
        </div>
        <div className="grid gap-1.5">
          <Label>Status</Label>
          <div className="flex gap-2">
            <Button type="button" variant={status === "Active" ? "default" : "outline"} onClick={() => setStatus("Active")}>Active</Button>
            <Button type="button" variant={status === "Draft" ? "default" : "outline"} onClick={() => setStatus("Draft")}>Draft</Button>
          </div>
        </div>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
        <DialogClose asChild>
          <Button onClick={() => onSave({ title, category, durationWeeks, students, instructor, status })}>
            Save
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}
