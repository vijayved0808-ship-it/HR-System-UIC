import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import Link from "next/link";
import { notFound } from "next/navigation";

const STAGES = ["Applied", "Screening", "Interview", "Offered", "Hired", "Rejected"];

export default async function JobDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await auth();
  const tenantId = (session?.user as any)?.tenantId;

  const job = await prisma.job.findFirst({
    where: { id: params.id, tenantId },
    include: {
      candidates: {
        include: { candidate: true },
      },
    },
  });

  if (!job) notFound();

  const byStage = STAGES.reduce(
    (acc, stage) => {
      acc[stage] = job.candidates.filter((c) => c.stage === stage);
      return acc;
    },
    {} as Record<string, typeof job.candidates>
  );

  return (
    <div className="max-w-7xl">
      <Link href="/jobs" className="text-sm text-gray-600 hover:text-gray-900">
        ← Back to Jobs
      </Link>

      <div className="flex justify-between items-start mt-2 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
          <p className="text-gray-600 mt-1">{job.location || "Location N/A"}</p>
          <div className="flex gap-2 mt-3 flex-wrap">
            {job.skills.map((skill) => (
              <span
                key={skill}
                className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
        <span
          className={`text-sm px-3 py-1 rounded ${
            job.status === "OPEN"
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {job.status}
        </span>
      </div>

      <div className="card mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Description</h2>
        <p className="text-gray-700 whitespace-pre-wrap">{job.description}</p>
      </div>

      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Pipeline ({job.candidates.length} candidates)
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {STAGES.map((stage) => (
          <div key={stage} className="bg-gray-100 rounded-lg p-3 min-h-[200px]">
            <h3 className="text-sm font-semibold text-gray-700 mb-3 flex justify-between">
              {stage}
              <span className="text-xs bg-white px-2 py-0.5 rounded">
                {byStage[stage].length}
              </span>
            </h3>
            <div className="space-y-2">
              {byStage[stage].map((c) => (
                <div
                  key={c.id}
                  className="bg-white rounded p-2 shadow-sm text-sm"
                >
                  <p className="font-medium text-gray-900">{c.candidate.name}</p>
                  <p className="text-xs text-gray-500">
                    {c.candidate.experience || 0}y exp
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
