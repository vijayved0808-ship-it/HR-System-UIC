import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import Link from "next/link";

export default async function JobsPage() {
  const session = await auth();
  const tenantId = (session?.user as any)?.tenantId;

  const jobs = await prisma.job.findMany({
    where: { tenantId },
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { candidates: true } } },
  });

  return (
    <div style={{ maxWidth: "1200px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <div>
          <h1 style={{ fontSize: "1.875rem", fontWeight: "bold" }}>Jobs</h1>
          <p style={{ color: "#6b7280" }}>Open positions</p>
        </div>
        <Link href="/jobs/new" className="btn btn-primary">+ New Job</Link>
      </div>

      {jobs.length === 0 ? (
        <div className="card" style={{ textAlign: "center", padding: "3rem" }}>
          <p style={{ color: "#6b7280", marginBottom: "1rem" }}>Abhi koi job nahi</p>
          <Link href="/jobs/new" className="btn btn-primary">Pehli Job Banao</Link>
        </div>
      ) : (
        <div style={{ display: "grid", gap: "1rem" }}>
          {jobs.map((job) => (
            <Link key={job.id} href={`/jobs/${job.id}`} className="card" style={{ textDecoration: "none", color: "inherit", display: "block" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <h3 style={{ fontSize: "1.125rem", fontWeight: 600 }}>{job.title}</h3>
                  <p style={{ fontSize: "0.875rem", color: "#6b7280", marginTop: "0.25rem" }}>{job.location || "N/A"}</p>
                  <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.75rem", flexWrap: "wrap" }}>
                    {job.skills.slice(0, 5).map((skill) => (
                      <span key={skill} style={{ fontSize: "0.75rem", background: "#f3f4f6", padding: "0.25rem 0.5rem", borderRadius: "0.25rem" }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span style={{
                    fontSize: "0.75rem",
                    padding: "0.25rem 0.5rem",
                    borderRadius: "0.25rem",
                    background: job.status === "OPEN" ? "#dcfce7" : "#f3f4f6",
                    color: job.status === "OPEN" ? "#166534" : "#374151",
                  }}>
                    {job.status}
                  </span>
                  <p style={{ fontSize: "0.875rem", color: "#6b7280", marginTop: "0.5rem" }}>
                    {job._count.candidates} applicants
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
