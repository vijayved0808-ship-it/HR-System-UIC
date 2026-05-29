"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: "🏠" },
  { href: "/jobs", label: "Jobs", icon: "💼" },
  { href: "/candidates", label: "Candidates", icon: "👥" },
];

export default function Sidebar({ userName }: { userName: string }) {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen p-4 flex flex-col">
      <div className="mb-8 px-2">
        <h1 className="text-xl font-bold text-gray-900">UIC HR</h1>
        <p className="text-xs text-gray-500">Recruitment System</p>
      </div>

      <nav className="space-y-1 flex-1">
        {navItems.map((item) => {
          const active = pathname === item.href || pathname?.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition ${
                active
                  ? "bg-brand-50 text-brand-700"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="pt-4 border-t border-gray-200">
        <div className="px-3 py-2">
          <p className="text-sm font-medium text-gray-900">{userName}</p>
          <form action="/api/auth/signout" method="post">
            <button
              type="submit"
              className="text-xs text-gray-500 hover:text-gray-700 mt-1"
            >
              Logout
            </button>
          </form>
        </div>
      </div>
    </aside>
  );
}
