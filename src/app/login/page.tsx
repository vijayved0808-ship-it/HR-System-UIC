import { signIn } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default function LoginPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  async function login(formData: FormData) {
    "use server";
    try {
      await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        redirectTo: "/dashboard",
      });
    } catch (error: any) {
      if (error.message?.includes("NEXT_REDIRECT")) throw error;
      redirect("/login?error=invalid");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <div className="card">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">UIC HR System</h1>
          <p className="text-gray-600 mb-6">Login karke aage badho</p>

          {searchParams.error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg mb-4 text-sm">
              Galat email ya password
            </div>
          )}

          <form action={login} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                className="input"
                placeholder="admin@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                className="input"
                placeholder="••••••••"
              />
            </div>
            <button type="submit" className="btn btn-primary w-full">
              Login
            </button>
          </form>

          <div className="mt-4 text-center text-sm text-gray-600">
            New user?{" "}
            <Link href="/signup" className="text-brand-600 hover:underline">
              Account banao
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
