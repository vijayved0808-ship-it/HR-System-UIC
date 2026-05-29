import { createCandidate } from "@/lib/actions/candidate";
import Link from "next/link";

export default function NewCandidatePage() {
  return (
    <div style={{ maxWidth: "600px" }}>
      <Link href="/candidates" style={{ fontSize: "0.875rem", color: "#6b7280" }}>← Back to Candidates</Link>
      <h1 style={{ fontSize: "1.875rem", fontWeight: "bold", marginTop: "0.5rem", marginBottom: "2rem" }}>New Candidate</h1>

      <form action={createCandidate} className="card">
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.25rem" }}>Name *</label>
          <input type="text" name="name" required className="input" placeholder="Ravi Kumar" />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
          <div>
            <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.25rem" }}>Email *</label>
            <input type="email" name="email" required className="input" placeholder="ravi@example.com" />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.25rem" }}>Phone</label>
            <input type="tel" name="phone" className="input" placeholder="+91 98765..." />
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
          <div>
            <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.25rem" }}>Location</label>
            <input type="text" name="location" className="input" placeholder="Ahmedabad" />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.25rem" }}>Experience (years)</label>
            <input type="number" name="experience" className="input" placeholder="3" />
          </div>
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.25rem" }}>Skills (comma separated)</label>
          <input type="text" name="skills" className="input" placeholder="React, TypeScript" />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.25rem" }}>Resume / Bio</label>
          <textarea name="resumeText" rows={5} className="input" placeholder="Brief description..." />
        </div>
        <div style={{ display: "flex", gap: "0.75rem", paddingTop: "1rem" }}>
          <button type="submit" className="btn btn-primary">Add Candidate</button>
          <Link href="/candidates" className="btn btn-secondary">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
