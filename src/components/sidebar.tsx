"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/jobs", label: "Jobs" },
  { href: "/candidates", label: "Candidates" },
];

export default function Sidebar({ userName }: { userName: string }) {
  const pathname = usePathname();

  return (
    <aside style={{
      width: "240px",
      background: "white",
      borderRight: "1px solid #e5e7eb",
      minHeight: "100vh",
      padding: "1rem",
      display: "flex",
      flexDirection: "column",
    }}>
      <div style={{ marginBottom: "2rem", padding: "0 0.5rem" }}>
        <h1 style={{ fontSize: "1.25rem", fontWeight: "bold" }}>UIC HR</h1>
        <p style={{ fontSize: "0.75rem", color: "#6b7280" }}>Recruitment System</p>
      </div>

      <nav style={{ flex: 1 }}>
        {navItems.map((item) => {
          const active = pathname === item.href || pathname?.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: "block",
                padding: "0.5rem 0.75rem",
                borderRadius: "0.5rem",
                fontSize: "0.875rem",
                fontWeight: 500,
                marginBottom: "0.25rem",
                background: active ? "#eef2ff" : "transparent",
                color: active ? "#4338ca" : "#374151",
                textDecoration: "none",
              }}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div style={{ paddingTop: "1rem", borderTop: "1px solid #e5e7eb" }}>
        <div style={{ padding: "0 0.75rem" }}>
          <p style={{ fontSize: "0.875rem", fontWeight: 500 }}>{userName}</p>
          <form action="/api/auth/signout" method="POST">
            <button
              type="submit"
              style={{
                fontSize: "0.75rem",
                color: "#6b7280",
                marginTop: "0.25rem",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
            >
              Logout
            </button>
          </form>
        </div>
      </div>
    </aside>
  );
}
