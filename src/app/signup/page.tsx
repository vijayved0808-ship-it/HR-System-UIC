import { seedInitialUser } from "@/lib/actions/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default function SignupPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  async function signup(formData: FormData) {
    "use server";
    const result = await seedInitialUser(formData);
    if (result.error) {
      redirect(`/signup?error=${encodeURIComponent(result.error)}`);
    }
    redirect("/login");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <div className="card">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Account Banao
          </h1>
          <p className="text-gray-600 mb-6">
            Apni company ka admin account create karo
          </p>

          {searchParams.error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg mb-4 text-sm">
              {searchParams.error}
            </div>
          )}

          <form action={signup} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company Name
              </label>
              <input
                type="text"
                name="companyName"
                required
                className="input"
                placeholder="UIC Recruitment"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tumhara Naam
              </label>
              <input
                type="text"
                name="name"
                required
                className="input"
                placeholder="Vijay Ved"
              />
            </div>
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
                minLength={6}
                className="input"
                placeholder="6+ characters"
              />
            </div>
            <button type="submit" className="btn btn-primary w-full">
              Account Banao
            </button>
          </form>

          <div className="mt-4 text-center text-sm text-gray-600">
            Already account hai?{" "}
            <Link href="/login" className="text-brand-600 hover:underline">
              Login karo
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
