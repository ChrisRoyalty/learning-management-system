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

export type InstructorStatus = "Active" | "Inactive";
export type Instructor = {
  id: string;
  name: string;
  email: string;
  expertise: string;
  courses: string[];
  joinDate: string; // YYYY-MM-DD
  status: InstructorStatus;
};

const initialInstructors: Instructor[] = [
  { id: "1", name: "John Smith", email: "john@example.com", expertise: "Frontend Development", courses: ["React Fundamentals"], joinDate: "2023-09-01", status: "Active" },
  { id: "2", name: "Sarah Johnson", email: "sarah@example.com", expertise: "Backend Development", courses: ["Node.js Backend"], joinDate: "2023-08-15", status: "Active" },
  { id: "3", name: "Mike Davis", email: "mike@example.com", expertise: "Design", courses: ["UI/UX Design"], joinDate: "2023-10-20", status: "Active" },
  { id: "4", name: "Emily Chen", email: "emily@example.com", expertise: "Data Science", courses: ["Python Data Science"], joinDate: "2024-01-10", status: "Active" },
];

function StatusChip({ status }: { status: InstructorStatus }) {
  const cls = status === "Active" ? "bg-blue-600/10 text-blue-700 border border-blue-200" : "bg-zinc-200 text-zinc-700 border border-zinc-300";
  return <span className={`px-2 py-0.5 text-[11px] rounded-md ${cls}`}>{status}</span>;
}

export default function InstructorsPage() {
  const [rows, setRows] = useState<Instructor[]>(initialInstructors);
  const [q, setQ] = useState("");
  const [editing, setEditing] = useState<Instructor | null>(null);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return rows;
    return rows.filter((r) => [r.name, r.email, r.expertise, ...r.courses].some((v) => v.toLowerCase().includes(term)));
  }, [q, rows]);

  function handleSave(row: Partial<Instructor> & { id?: string }) {
    if (row.id) {
      setRows((prev) => prev.map((r) => (r.id === row.id ? { ...r, ...row } as Instructor : r)));
    } else {
      const id = Math.random().toString(36).slice(2, 9);
      setRows((prev) => [
        ...prev,
        {
          id,
          name: row.name || "Unnamed",
          email: row.email || "",
          expertise: row.expertise || "",
          courses: row.courses || [],
          joinDate: row.joinDate || new Date().toISOString().slice(0, 10),
          status: (row.status as InstructorStatus) || "Active",
        },
      ]);
    }
  }

  function handleDelete(id: string) {
    setRows((prev) => prev.filter((r) => r.id !== id));
  }

  return (
    <div className="space-y-4">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl md:text-2xl font-semibold">Instructor Management</h2>
          <p className="text-sm text-zinc-500">Manage all instructors in the academy</p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2"><Plus className="h-4 w-4" /> Add Instructor</Button>
          </DialogTrigger>
          <InstructorForm onSave={(data) => handleSave(data)} />
        </Dialog>
      </div>

      {/* Search + Table card */}
      <div className="rounded-2xl border border-zinc-200">
        <div className="p-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <Input placeholder="Search instructors..." className="pl-9" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
        </div>
        <div className="px-2 pb-3">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Instructor</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Expertise</TableHead>
                <TableHead>Assigned Courses</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="font-medium">{r.name}</TableCell>
                  <TableCell className="text-zinc-600">{r.email}</TableCell>
                  <TableCell>{r.expertise}</TableCell>
                  <TableCell className="space-x-1">
                    {r.courses.map((c, i) => (
                      <Badge key={i} variant="secondary" className="rounded-md">{c}</Badge>
                    ))}
                  </TableCell>
                  <TableCell>{r.joinDate}</TableCell>
                  <TableCell><StatusChip status={r.status} /></TableCell>
                  <TableCell className="text-right">
                    {/* Edit */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="hover:bg-zinc-100" aria-label={`Edit ${r.name}`} onClick={() => setEditing(r)}>
                          <Edit2 className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <InstructorForm
                        initial={editing ?? r}
                        onSave={(data) => {
                          handleSave({ ...data, id: r.id });
                          setEditing(null);
                        }}
                      />
                    </Dialog>

                    {/* Delete */}
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="hover:bg-zinc-100" aria-label={`Delete ${r.name}`}>
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete “{r.name}”?</AlertDialogTitle>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(r.id)} className="bg-red-600 hover:bg-red-700">
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
                    No instructors match your search.
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

function InstructorForm({
  initial,
  onSave,
}: {
  initial?: Partial<Instructor>;
  onSave: (data: Partial<Instructor>) => void;
}) {
  const [name, setName] = useState(initial?.name ?? "");
  const [email, setEmail] = useState(initial?.email ?? "");
  const [expertise, setExpertise] = useState(initial?.expertise ?? "");
  const [courses, setCourses] = useState<string>((initial?.courses ?? []).join(", "));
  const [joinDate, setJoinDate] = useState(initial?.joinDate ?? new Date().toISOString().slice(0, 10));
  const [status, setStatus] = useState<InstructorStatus>((initial?.status as InstructorStatus) ?? "Active");

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>{initial?.id ? "Edit Instructor" : "Add Instructor"}</DialogTitle>
      </DialogHeader>
      <div className="grid gap-3 py-2">
        <div className="grid gap-1.5">
          <Label htmlFor="name2">Name</Label>
          <Input id="name2" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="email2">Email</Label>
          <Input id="email2" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="expertise">Expertise</Label>
          <Input id="expertise" value={expertise} onChange={(e) => setExpertise(e.target.value)} placeholder="Frontend Development" />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="courses2">Courses (comma‑separated)</Label>
          <Input id="courses2" value={courses} onChange={(e) => setCourses(e.target.value)} />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="join2">Join Date</Label>
          <Input id="join2" type="date" value={joinDate} onChange={(e) => setJoinDate(e.target.value)} />
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
          <Button onClick={() => onSave({ name, email, expertise, courses: courses.split(",").map(s => s.trim()).filter(Boolean), joinDate, status })}>
            Save
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}
