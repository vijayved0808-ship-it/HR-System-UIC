import { auth, signOut } from "@/lib/auth";
import { redirect } from "next/navigation";
import Sidebar from "@/components/sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) redirect("/login");

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar userName={session.user?.name || "User"} />
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  );
}

export async function handleSignOut() {
  "use server";
  await signOut({ redirectTo: "/login" });
}
