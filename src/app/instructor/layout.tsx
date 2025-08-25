"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  BarChart3,
  Megaphone,
  Bell,
  ChevronDown,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  count?: number; // optional count pill
};

const NAV: NavItem[] = [
  { href: "/instructor", label: "Dashboard", icon: LayoutDashboard },
  { href: "/instructor/students", label: "Students", icon: Users, count: 4 },
  { href: "/instructor/assignments", label: "Assignments", icon: ClipboardList, count: 3 },
  { href: "/instructor/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/instructor/announcements", label: "Announcements", icon: Megaphone },
];

function isActive(pathname: string, href: string) {
  return href === "/instructor" ? pathname === href : pathname.startsWith(href);
}

export default function InstructorLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", { method: "POST" }).catch(() => {});
    } finally {
      router.push("/login");
    }
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 grid grid-cols-1 md:grid-cols-[272px_1fr]">
      {/* Sidebar */}
      <aside className="md:h-screen md:sticky md:top-0 border-r border-zinc-200 flex flex-col">
        {/* Brand */}
        <div className="p-4 flex items-center gap-3">
          <div className="relative h-10 w-10 overflow-hidden rounded-xl ring-1 ring-zinc-200">
            <Image
              src="/rad5-logo.png"
              alt="RAD5 Academy"
              fill
              className="object-contain p-1.5"
              priority
            />
          </div>
          <div className="leading-tight">
            <div className="font-semibold">RAD5 Academy</div>
            <div className="text-xs text-zinc-500 -mt-0.5">Learning Management System</div>
          </div>
        </div>

        {/* Nav */}
        <nav className="px-4 py-2 space-y-1">
          {NAV.map((item) => {
            const active = isActive(pathname, item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`group flex items-center gap-3 px-3 py-2.5 rounded-2xl text-[15px] transition-colors ${
                  active ? "bg-blue-600 text-white shadow-sm" : "text-zinc-800 hover:bg-zinc-100"
                }`}
              >
                <Icon className={`h-[20px] w-[20px] ${active ? "text-white" : "text-zinc-700"}`} />
                <span className="flex-1">{item.label}</span>
                {typeof item.count === "number" && (
                  <span
                    className={`min-w-[28px] h-6 px-2 inline-flex items-center justify-center rounded-full text-xs font-medium ${
                      active ? "bg-white/90 text-blue-700" : "bg-zinc-100 text-zinc-700"
                    }`}
                  >
                    {item.count}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer user card + logout */}
        <div className="mt-auto p-4">
          <div className="rounded-2xl border border-zinc-200 p-3 flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-zinc-100 text-zinc-700 flex items-center justify-center text-sm font-semibold">
              JS
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-medium leading-tight truncate">John Smith</div>
              <div className="mt-1 inline-flex items-center gap-1">
                <span className="px-2 py-0.5 rounded-md text-[11px] bg-blue-50 text-blue-700 border border-blue-200">
                  Instructor
                </span>
              </div>
            </div>
            <button
              className="h-8 w-8 inline-flex items-center justify-center rounded-md hover:bg-zinc-100"
              aria-label="Account menu"
              type="button"
            >
              <ChevronDown className="h-4 w-4 text-zinc-600" />
            </button>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="mt-3 w-full inline-flex items-center justify-center rounded-xl border border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100"
          >
            Log out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="min-h-screen">
        {/* Top bar */}
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-zinc-200">
          <div className="h-14 flex items-center justify-between px-4">
            <div>
              <h1 className="text-lg md:text-xl font-semibold">Instructor Dashboard</h1>
              <p className="text-xs text-zinc-500">Welcome back, John Smith!</p>
            </div>
            <button
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 hover:bg-zinc-50"
              aria-label="Notifications"
              type="button"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 h-5 min-w-[20px] px-1 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center">
                3
              </span>
            </button>
          </div>
        </div>

        <div className="px-4 py-6">{children}</div>
      </main>
    </div>
  );
}
