import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export default async function DashboardPage() {
  const session = await auth();
  const tenantId = (session?.user as any)?.tenantId;

  const [openJobs, totalCandidates, activeJobs, recentCandidates] = await Promise.all([
    prisma.job.count({ where: { tenantId, status: "OPEN" } }),
    prisma.candidate.count({ where: { tenantId } }),
    prisma.job.findMany({
      where: { tenantId, status: "OPEN" },
      orderBy: { createdAt: "desc" },
      take: 5,
      include: { _count: { select: { candidates: true } } },
    }),
    prisma.candidate.findMany({
      where: { tenantId },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
  ]);

  return (
    <div style={{ maxWidth: "1200px" }}>
      <h1 style={{ fontSize: "1.875rem", fontWeight: "bold", marginBottom: "0.5rem" }}>Dashboard</h1>
      <p style={{ color: "#6b7280", marginBottom: "2rem" }}>
        Welcome back, {session?.user?.name}!
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem", marginBottom: "2rem" }}>
        <div className="card">
          <p style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "0.5rem" }}>Open Jobs</p>
          <p style={{ fontSize: "1.875rem", fontWeight: "bold", color: "#1e40af" }}>{openJobs}</p>
        </div>
        <div className="card">
          <p style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "0.5rem" }}>Total Candidates</p>
          <p style={{ fontSize: "1.875rem", fontWeight: "bold", color: "#15803d" }}>{totalCandidates}</p>
        </div>
        <div className="card">
          <p style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "0.5rem" }}>Active Pipelines</p>
          <p style={{ fontSize: "1.875rem", fontWeight: "bold", color: "#7e22ce" }}>{activeJobs.length}</p>
        </div>
        <div className="card">
          <p style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "0.5rem" }}>Recent</p>
          <p style={{ fontSize: "1.875rem", fontWeight: "bold", color: "#b45309" }}>{recentCandidates.length}</p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
        <div className="card">
          <h2 style={{ fontSize: "1.125rem", fontWeight: 600, marginBottom: "1rem" }}>Recent Jobs</h2>
          {activeJobs.length === 0 ? (
            <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>No jobs yet</p>
          ) : (
            <ul style={{ listStyle: "none", padding: 0 }}>
              {activeJobs.map((job) => (
                <li key={job.id} style={{ padding: "0.5rem 0", borderBottom: "1px solid #f3f4f6", display: "flex", justifyContent: "space-between" }}>
                  <div>
                    <p style={{ fontWeight: 500 }}>{job.title}</p>
                    <p style={{ fontSize: "0.75rem", color: "#6b7280" }}>{job.location || "N/A"}</p>
                  </div>
                  <span style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                    {job._count.candidates} applicants
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="card">
          <h2 style={{ fontSize: "1.125rem", fontWeight: 600, marginBottom: "1rem" }}>Recent Candidates</h2>
          {recentCandidates.length === 0 ? (
            <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>No candidates yet</p>
          ) : (
            <ul style={{ listStyle: "none", padding: 0 }}>
              {recentCandidates.map((c) => (
                <li key={c.id} style={{ padding: "0.5rem 0", borderBottom: "1px solid #f3f4f6", display: "flex", justifyContent: "space-between" }}>
                  <div>
                    <p style={{ fontWeight: 500 }}>{c.name}</p>
                    <p style={{ fontSize: "0.75rem", color: "#6b7280" }}>{c.email}</p>
                  </div>
                  <span style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                    {c.experience || 0}y
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
