import { signupAction } from "@/lib/actions/auth";
import Link from "next/link";

export default function SignupPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
      <div style={{ width: "100%", maxWidth: "400px" }}>
        <div className="card">
          <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "0.5rem" }}>Account Banao</h1>
          <p style={{ color: "#6b7280", marginBottom: "1.5rem" }}>Apni company ka admin account</p>

          {searchParams.error && (
            <div style={{ background: "#fee2e2", color: "#991b1b", padding: "0.5rem 1rem", borderRadius: "0.5rem", marginBottom: "1rem", fontSize: "0.875rem" }}>
              {searchParams.error}
            </div>
          )}

          <form action={signupAction}>
            <div style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.25rem" }}>Company Name</label>
              <input type="text" name="companyName" required className="input" placeholder="UIC Recruitment" />
            </div>
            <div style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.25rem" }}>Tumhara Naam</label>
              <input type="text" name="name" required className="input" placeholder="Vijay Ved" />
            </div>
            <div style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.25rem" }}>Email</label>
              <input type="email" name="email" required className="input" placeholder="admin@example.com" />
            </div>
            <div style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.25rem" }}>Password</label>
              <input type="password" name="password" required minLength={6} className="input" placeholder="6+ characters" />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>Account Banao</button>
          </form>

          <div style={{ marginTop: "1rem", textAlign: "center", fontSize: "0.875rem", color: "#6b7280" }}>
            Already account hai?{" "}
            <Link href="/login" style={{ color: "#4f46e5" }}>Login karo</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
