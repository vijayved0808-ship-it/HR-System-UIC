import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import Link from "next/link";

export default async function CandidatesPage() {
  const session = await auth();
  const tenantId = (session?.user as any)?.tenantId;

  const candidates = await prisma.candidate.findMany({
    where: { tenantId },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div style={{ maxWidth: "1200px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2rem" }}>
        <div>
          <h1 style={{ fontSize: "1.875rem", fontWeight: "bold" }}>Candidates</h1>
          <p style={{ color: "#6b7280" }}>All applicants</p>
        </div>
        <Link href="/candidates/new" className="btn btn-primary">+ Add Candidate</Link>
      </div>

      {candidates.length === 0 ? (
        <div className="card" style={{ textAlign: "center", padding: "3rem" }}>
          <p style={{ color: "#6b7280", marginBottom: "1rem" }}>Abhi koi candidate nahi</p>
          <Link href="/candidates/new" className="btn btn-primary">Pehla Add Karo</Link>
        </div>
      ) : (
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead style={{ background: "#f9fafb", borderBottom: "1px solid #e5e7eb" }}>
              <tr>
                <th style={{ textAlign: "left", fontSize: "0.75rem", fontWeight: 500, textTransform: "uppercase", padding: "0.75rem 1rem" }}>Name</th>
                <th style={{ textAlign: "left", fontSize: "0.75rem", fontWeight: 500, textTransform: "uppercase", padding: "0.75rem 1rem" }}>Email</th>
                <th style={{ textAlign: "left", fontSize: "0.75rem", fontWeight: 500, textTransform: "uppercase", padding: "0.75rem 1rem" }}>Phone</th>
                <th style={{ textAlign: "left", fontSize: "0.75rem", fontWeight: 500, textTransform: "uppercase", padding: "0.75rem 1rem" }}>Experience</th>
                <th style={{ textAlign: "left", fontSize: "0.75rem", fontWeight: 500, textTransform: "uppercase", padding: "0.75rem 1rem" }}>Location</th>
              </tr>
            </thead>
            <tbody>
              {candidates.map((c) => (
                <tr key={c.id} style={{ borderBottom: "1px solid #f3f4f6" }}>
                  <td style={{ padding: "0.75rem 1rem", fontWeight: 500 }}>{c.name}</td>
                  <td style={{ padding: "0.75rem 1rem", fontSize: "0.875rem", color: "#6b7280" }}>{c.email}</td>
                  <td style={{ padding: "0.75rem 1rem", fontSize: "0.875rem", color: "#6b7280" }}>{c.phone || "-"}</td>
                  <td style={{ padding: "0.75rem 1rem", fontSize: "0.875rem", color: "#6b7280" }}>{c.experience || 0} years</td>
                  <td style={{ padding: "0.75rem 1rem", fontSize: "0.875rem", color: "#6b7280" }}>{c.location || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
