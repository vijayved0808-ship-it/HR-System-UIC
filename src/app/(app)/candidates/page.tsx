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
    <div className="max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Candidates</h1>
          <p className="text-gray-600">Saare applicants ki list</p>
        </div>
        <Link href="/candidates/new" className="btn btn-primary">
          + Add Candidate
        </Link>
      </div>

      {candidates.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-gray-500 mb-4">Abhi koi candidate nahi hai</p>
          <Link href="/candidates/new" className="btn btn-primary">
            Pehla Candidate Add Karo
          </Link>
        </div>
      ) : (
        <div className="card overflow-hidden p-0">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left text-xs font-medium text-gray-700 uppercase px-4 py-3">
                  Name
                </th>
                <th className="text-left text-xs font-medium text-gray-700 uppercase px-4 py-3">
                  Email
                </th>
                <th className="text-left text-xs font-medium text-gray-700 uppercase px-4 py-3">
                  Phone
                </th>
                <th className="text-left text-xs font-medium text-gray-700 uppercase px-4 py-3">
                  Experience
                </th>
                <th className="text-left text-xs font-medium text-gray-700 uppercase px-4 py-3">
                  Location
                </th>
              </tr>
            </thead>
            <tbody>
              {candidates.map((c) => (
                <tr
                  key={c.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {c.name}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{c.email}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {c.phone || "-"}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {c.experience || 0} years
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {c.location || "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
