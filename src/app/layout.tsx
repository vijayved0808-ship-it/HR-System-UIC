import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "UIC HR System",
  description: "Recruitment Management System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
