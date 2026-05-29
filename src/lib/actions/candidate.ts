"use server";

import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createCandidate(formData: FormData) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  const tenantId = (session.user as any).tenantId;

  const candidate = await prisma.candidate.create({
    data: {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      location: formData.get("location") as string,
      experience: parseInt(formData.get("experience") as string) || 0,
      skills: ((formData.get("skills") as string) || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      resumeText: (formData.get("resumeText") as string) || "",
      tenantId,
    },
  });

  revalidatePath("/candidates");
  return candidate;
}

export async function moveCandidateStage(
  candidateId: string,
  jobId: string,
  stage: string
) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  await prisma.candidateOnJob.upsert({
    where: { candidateId_jobId: { candidateId, jobId } },
    update: { stage },
    create: { candidateId, jobId, stage },
  });

  revalidatePath(`/jobs/${jobId}`);
}

export async function assignCandidateToJob(candidateId: string, jobId: string) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  await prisma.candidateOnJob.create({
    data: { candidateId, jobId, stage: "Applied" },
  });

  revalidatePath(`/jobs/${jobId}`);
}
