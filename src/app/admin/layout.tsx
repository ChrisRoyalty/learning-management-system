// app/admin/layout.tsx
"use client";

import { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Bell, LayoutDashboard, BookOpen, Users, GraduationCap, Settings } from "lucide-react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const nav = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/courses", label: "Courses", icon: BookOpen, count: 4 },
    { href: "/admin/students", label: "Students", icon: Users, count: 4 },
    { href: "/admin/instructors", label: "Instructors", icon: GraduationCap, count: 4 },
    { href: "/admin/settings", label: "Settings", icon: Settings },
  ];

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", { method: "POST" });
    } finally {
      router.push("/login");
    }
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 grid grid-cols-1 md:grid-cols-[260px_1fr]">
      {/* Sidebar */}
      <aside className="md:h-screen md:sticky md:top-0 border-r border-zinc-200 flex flex-col">
        <div className="p-4 flex items-center gap-3">
          <div className="relative h-10 w-10 overflow-hidden rounded-xl ring-1 ring-zinc-200">
            <Image src="/rad5-logo.png" alt="RAD5 Academy" fill className="object-contain p-1.5" />
          </div>
          <div className="leading-tight">
            <div className="font-semibold">RAD5 Academy</div>
            <div className="text-xs text-zinc-500 -mt-0.5">Learning Management System</div>
          </div>
        </div>

        <nav className="p-3 space-y-1">
          {nav.map((item) => {
            const active = pathname === item.href || (item.href === "/admin" && pathname === "/admin");
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-colors border border-transparent ${
                  active ? "bg-blue-600 text-white shadow-sm" : "text-zinc-700 hover:bg-zinc-100"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="flex-1">{item.label}</span>
                {typeof item.count === "number" && (
                  <span className={`min-w-[24px] h-6 px-2 inline-flex items-center justify-center rounded-lg text-[11px] ${
                    active ? "bg-white/20" : "bg-zinc-200 text-zinc-700"
                  }`}>
                    {item.count}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Account block pinned to bottom */}
        <div className="mt-auto p-4">
          <div className="rounded-xl border border-zinc-200 p-3">
            <div className="text-xs text-zinc-500">Logged in as</div>
            <div className="text-sm font-medium">Admin User</div>
            <button
              onClick={handleLogout}
              className="mt-3 w-full inline-flex items-center justify-center rounded-lg border border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100"
            >
              Log out
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="min-h-screen">
        {/* Top bar */}
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-zinc-200">
          <div className="h-14 flex items-center justify-between px-4">
            <div>
              <h1 className="text-lg md:text-xl font-semibold">Admin Dashboard</h1>
              <p className="text-xs text-zinc-500">Welcome back, Admin User!</p>
            </div>
            <button
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 hover:bg-zinc-50"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 h-5 min-w-[20px] px-1 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center">3</span>
            </button>
          </div>
        </div>

        {/* Page content */}
        <div className="px-4 py-6">{children}</div>
      </main>
    </div>
  );
}
