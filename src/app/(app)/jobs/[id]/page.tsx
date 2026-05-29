import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import Link from "next/link";
import { notFound } from "next/navigation";

const STAGES = ["Applied", "Screening", "Interview", "Offered", "Hired", "Rejected"];

export default async function JobDetailPage({ params }: { params: { id: string } }) {
  const session = await auth();
  const tenantId = (session?.user as any)?.tenantId;

  const job = await prisma.job.findFirst({
    where: { id: params.id, tenantId },
    include: {
      candidates: { include: { candidate: true } },
    },
  });

  if (!job) notFound();

  const byStage: Record<string, typeof job.candidates> = {};
  STAGES.forEach((s) => (byStage[s] = []));
  job.candidates.forEach((c) => {
    if (byStage[c.stage]) byStage[c.stage].push(c);
  });

  return (
    <div style={{ maxWidth: "1400px" }}>
      <Link href="/jobs" style={{ fontSize: "0.875rem", color: "#6b7280" }}>← Back to Jobs</Link>

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.5rem", marginBottom: "2rem" }}>
        <div>
          <h1 style={{ fontSize: "1.875rem", fontWeight: "bold" }}>{job.title}</h1>
          <p style={{ color: "#6b7280", marginTop: "0.25rem" }}>{job.location || "N/A"}</p>
          <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.75rem", flexWrap: "wrap" }}>
            {job.skills.map((skill) => (
              <span key={skill} style={{ fontSize: "0.75rem", background: "#f3f4f6", padding: "0.25rem 0.5rem", borderRadius: "0.25rem" }}>
                {skill}
              </span>
            ))}
          </div>
        </div>
        <span style={{
          fontSize: "0.875rem",
          padding: "0.25rem 0.75rem",
          borderRadius: "0.25rem",
          height: "fit-content",
          background: job.status === "OPEN" ? "#dcfce7" : "#f3f4f6",
          color: job.status === "OPEN" ? "#166534" : "#374151",
        }}>
          {job.status}
        </span>
      </div>

      <div className="card" style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1.125rem", fontWeight: 600, marginBottom: "0.5rem" }}>Description</h2>
        <p style={{ color: "#374151", whiteSpace: "pre-wrap" }}>{job.description}</p>
      </div>

      <h2 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "1rem" }}>
        Pipeline ({job.candidates.length} candidates)
      </h2>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "0.75rem" }}>
        {STAGES.map((stage) => (
          <div key={stage} style={{ background: "#f3f4f6", borderRadius: "0.5rem", padding: "0.75rem", minHeight: "200px" }}>
            <h3 style={{ fontSize: "0.875rem", fontWeight: 600, marginBottom: "0.75rem", display: "flex", justifyContent: "space-between" }}>
              {stage}
              <span style={{ fontSize: "0.75rem", background: "white", padding: "0.125rem 0.5rem", borderRadius: "0.25rem" }}>
                {byStage[stage].length}
              </span>
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {byStage[stage].map((c) => (
                <div key={c.id} style={{ background: "white", borderRadius: "0.25rem", padding: "0.5rem", fontSize: "0.875rem" }}>
                  <p style={{ fontWeight: 500 }}>{c.candidate.name}</p>
                  <p style={{ fontSize: "0.75rem", color: "#6b7280" }}>{c.candidate.experience || 0}y exp</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
