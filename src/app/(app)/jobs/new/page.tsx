import { createJob } from "@/lib/actions/job";
import Link from "next/link";

export default function NewJobPage() {
  return (
    <div style={{ maxWidth: "600px" }}>
      <Link href="/jobs" style={{ fontSize: "0.875rem", color: "#6b7280" }}>← Back to Jobs</Link>
      <h1 style={{ fontSize: "1.875rem", fontWeight: "bold", marginTop: "0.5rem", marginBottom: "2rem" }}>New Job</h1>

      <form action={createJob} className="card">
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.25rem" }}>Job Title *</label>
          <input type="text" name="title" required className="input" placeholder="Senior Engineer" />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.25rem" }}>Description *</label>
          <textarea name="description" required rows={5} className="input" placeholder="Describe the role..." />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.25rem" }}>Location</label>
          <input type="text" name="location" className="input" placeholder="Ahmedabad" />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.25rem" }}>Skills (comma separated)</label>
          <input type="text" name="skills" className="input" placeholder="React, Node.js" />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
          <div>
            <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.25rem" }}>Min Salary</label>
            <input type="number" name="minSalary" className="input" placeholder="500000" />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.25rem" }}>Max Salary</label>
            <input type="number" name="maxSalary" className="input" placeholder="1000000" />
          </div>
        </div>
        <div style={{ display: "flex", gap: "0.75rem", paddingTop: "1rem" }}>
          <button type="submit" className="btn btn-primary">Create Job</button>
          <Link href="/jobs" className="btn btn-secondary">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
