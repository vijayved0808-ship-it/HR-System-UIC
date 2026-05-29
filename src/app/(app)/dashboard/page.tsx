import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export default async function DashboardPage() {
  const session = await auth();
  const tenantId = (session?.user as any)?.tenantId;

  const [openJobs, totalCandidates, recentCandidates, activeJobs] =
    await Promise.all([
      prisma.job.count({ where: { tenantId, status: "OPEN" } }),
      prisma.candidate.count({ where: { tenantId } }),
      prisma.candidate.findMany({
        where: { tenantId },
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
      prisma.job.findMany({
        where: { tenantId, status: "OPEN" },
        orderBy: { createdAt: "desc" },
        take: 5,
        include: { _count: { select: { candidates: true } } },
      }),
    ]);

  const stats = [
    { label: "Open Jobs", value: openJobs, color: "bg-blue-50 text-blue-700" },
    {
      label: "Total Candidates",
      value: totalCandidates,
      color: "bg-green-50 text-green-700",
    },
    {
      label: "Active Pipelines",
      value: activeJobs.length,
      color: "bg-purple-50 text-purple-700",
    },
    {
      label: "This Week",
      value: recentCandidates.length,
      color: "bg-amber-50 text-amber-700",
    },
  ];

  return (
    <div className="max-w-6xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
      <p className="text-gray-600 mb-8">
        Namaste {session?.user?.name}! Aaj ka summary
      </p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="card">
            <p className="text-sm text-gray-600 mb-2">{stat.label}</p>
            <p className={`text-3xl font-bold ${stat.color} inline-block px-3 py-1 rounded-lg`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Jobs
          </h2>
          {activeJobs.length === 0 ? (
            <p className="text-gray-500 text-sm">Koi jobs nahi hain abhi</p>
          ) : (
            <ul className="space-y-2">
              {activeJobs.map((job) => (
                <li
                  key={job.id}
                  className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0"
                >
                  <div>
                    <p className="font-medium text-gray-900">{job.title}</p>
                    <p className="text-xs text-gray-500">
                      {job.location || "Location N/A"}
                    </p>
                  </div>
                  <span className="text-sm text-gray-600">
                    {job._count.candidates} candidates
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Candidates
          </h2>
          {recentCandidates.length === 0 ? (
            <p className="text-gray-500 text-sm">Koi candidates nahi hain</p>
          ) : (
            <ul className="space-y-2">
              {recentCandidates.map((c) => (
                <li
                  key={c.id}
                  className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0"
                >
                  <div>
                    <p className="font-medium text-gray-900">{c.name}</p>
                    <p className="text-xs text-gray-500">{c.email}</p>
                  </div>
                  <span className="text-sm text-gray-600">
                    {c.experience || 0}y exp
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
