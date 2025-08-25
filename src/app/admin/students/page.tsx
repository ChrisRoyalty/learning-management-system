// app/admin/students/page.tsx

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
import { Badge } from "@/components/ui/badge";
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

export type StudentStatus = "Active" | "Inactive";
export type Student = {
  id: string;
  name: string;
  email: string;
  courses: string[];
  joinDate: string; // YYYY-MM-DD
  status: StudentStatus;
};

const initialStudents: Student[] = [
  { id: "1", name: "Alice Cooper", email: "alice@example.com", courses: ["React Fundamentals", "UI/UX Design"], joinDate: "2024-01-15", status: "Active" },
  { id: "2", name: "Bob Wilson", email: "bob@example.com", courses: ["Node.js Backend"], joinDate: "2024-02-20", status: "Active" },
  { id: "3", name: "Charlie Brown", email: "charlie@example.com", courses: ["Python Data Science"], joinDate: "2024-03-10", status: "Inactive" },
  { id: "4", name: "Diana Prince", email: "diana@example.com", courses: ["React Fundamentals", "Node.js Backend"], joinDate: "2024-01-08", status: "Active" },
];

function StatusChip({ status }: { status: StudentStatus }) {
  const cls =
    status === "Active"
      ? "bg-blue-600/10 text-blue-700 border border-blue-200"
      : "bg-zinc-200 text-zinc-700 border border-zinc-300";
  return <span className={`px-2 py-0.5 text-[11px] rounded-md ${cls}`}>{status}</span>;
}

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [q, setQ] = useState("");
  const [editing, setEditing] = useState<Student | null>(null);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return students;
    return students.filter((s) =>
      [s.name, s.email, ...s.courses].some((v) => v.toLowerCase().includes(term))
    );
  }, [q, students]);

  function handleSave(student: Partial<Student> & { id?: string }) {
    if (student.id) {
      setStudents((prev) => prev.map((s) => (s.id === student.id ? { ...s, ...student } as Student : s)));
    } else {
      const id = Math.random().toString(36).slice(2, 9);
      setStudents((prev) => [
        ...prev,
        {
          id,
          name: student.name || "Unnamed",
          email: student.email || "",
          courses: student.courses || [],
          joinDate: student.joinDate || new Date().toISOString().slice(0, 10),
          status: (student.status as StudentStatus) || "Active",
        },
      ]);
    }
  }

  function handleDelete(id: string) {
    setStudents((prev) => prev.filter((s) => s.id !== id));
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl md:text-2xl font-semibold">Student Management</h2>
          <p className="text-sm text-zinc-500">Manage all students in the academy</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2"><Plus className="h-4 w-4" /> Add Student</Button>
          </DialogTrigger>
          <StudentForm onSave={(data) => handleSave(data)} />
        </Dialog>
      </div>

      <div className="rounded-2xl border border-zinc-200">
        <div className="p-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <Input placeholder="Search students..." className="pl-9" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
        </div>

        <div className="px-2 pb-3">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Enrolled Courses</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((s) => (
                <TableRow key={s.id}>
                  <TableCell className="font-medium">{s.name}</TableCell>
                  <TableCell className="text-zinc-600">{s.email}</TableCell>
                  <TableCell className="space-x-1">
                    {s.courses.map((c, idx) => (
                      <Badge key={idx} variant="secondary" className="rounded-md">{c}</Badge>
                    ))}
                  </TableCell>
                  <TableCell>{s.joinDate}</TableCell>
                  <TableCell><StatusChip status={s.status} /></TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="hover:bg-zinc-100" aria-label={`Edit ${s.name}`} onClick={() => setEditing(s)}>
                          <Edit2 className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <StudentForm
                        initial={editing ?? s}
                        onSave={(data) => {
                          handleSave({ ...data, id: s.id });
                          setEditing(null);
                        }}
                      />
                    </Dialog>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="hover:bg-zinc-100" aria-label={`Delete ${s.name}`}>
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete “{s.name}”?</AlertDialogTitle>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(s.id)} className="bg-red-600 hover:bg-red-700">Delete</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10 text-sm text-zinc-500">No students match your search.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

function StudentForm({ initial, onSave }: { initial?: Partial<Student>; onSave: (data: Partial<Student>) => void; }) {
  const [name, setName] = useState(initial?.name ?? "");
  const [email, setEmail] = useState(initial?.email ?? "");
  const [courses, setCourses] = useState<string>((initial?.courses ?? []).join(", "));
  const [joinDate, setJoinDate] = useState(initial?.joinDate ?? new Date().toISOString().slice(0, 10));
  const [status, setStatus] = useState<StudentStatus>((initial?.status as StudentStatus) ?? "Active");

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>{initial?.id ? "Edit Student" : "Add Student"}</DialogTitle>
      </DialogHeader>
      <div className="grid gap-3 py-2">
        <div className="grid gap-1.5">
          <Label htmlFor="name">Name</Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="courses">Courses (comma‑separated)</Label>
          <Input id="courses" value={courses} onChange={(e) => setCourses(e.target.value)} placeholder="React Fundamentals, UI/UX Design" />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="join">Join Date</Label>
          <Input id="join" type="date" value={joinDate} onChange={(e) => setJoinDate(e.target.value)} />
        </div>
        <div className="grid gap-1.5">
          <Label>Status</Label>
          <div className="flex gap-2">
            <Button type="button" variant={status === "Active" ? "default" : "outline"} onClick={() => setStatus("Active")}>Active</Button>
            <Button type="button" variant={status === "Inactive" ? "default" : "outline"} onClick={() => setStatus("Inactive")}>Inactive</Button>
          </div>
        </div>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
        <DialogClose asChild>
          <Button onClick={() => onSave({ name, email, courses: courses.split(",").map(s => s.trim()).filter(Boolean), joinDate, status })}>Save</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}
