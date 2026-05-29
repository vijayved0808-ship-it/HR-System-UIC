import { signIn } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default function LoginPage({
  searchParams,
}: {
  searchParams: { error?: string; signup?: string };
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
      if (error?.message?.includes("NEXT_REDIRECT")) throw error;
      redirect("/login?error=invalid");
    }
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
      <div style={{ width: "100%", maxWidth: "400px" }}>
        <div className="card">
          <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "0.5rem" }}>UIC HR System</h1>
          <p style={{ color: "#6b7280", marginBottom: "1.5rem" }}>Sign in to continue</p>

          {searchParams.signup === "success" && (
            <div style={{ background: "#dcfce7", color: "#166534", padding: "0.5rem 1rem", borderRadius: "0.5rem", marginBottom: "1rem", fontSize: "0.875rem" }}>
              Account created successfully! Please sign in.
            </div>
          )}

          {searchParams.error && (
            <div style={{ background: "#fee2e2", color: "#991b1b", padding: "0.5rem 1rem", borderRadius: "0.5rem", marginBottom: "1rem", fontSize: "0.875rem" }}>
              Invalid email or password
            </div>
          )}

          <form action={login}>
            <div style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.25rem" }}>Email</label>
              <input type="email" name="email" required className="input" placeholder="admin@example.com" />
            </div>
            <div style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.25rem" }}>Password</label>
              <input type="password" name="password" required className="input" />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>Sign In</button>
          </form>

          <div style={{ marginTop: "1rem", textAlign: "center", fontSize: "0.875rem", color: "#6b7280" }}>
            New user?{" "}
            <Link href="/signup" style={{ color: "#4f46e5" }}>Create account</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
