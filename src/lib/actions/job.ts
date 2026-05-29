"use server";

import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createJob(formData: FormData) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  const tenantId = (session.user as any).tenantId;

  const job = await prisma.job.create({
    data: {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      location: (formData.get("location") as string) || null,
      minSalary: parseInt(formData.get("minSalary") as string) || null,
      maxSalary: parseInt(formData.get("maxSalary") as string) || null,
      skills: ((formData.get("skills") as string) || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      tenantId,
    },
  });

  revalidatePath("/jobs");
  redirect(`/jobs/${job.id}`);
}
