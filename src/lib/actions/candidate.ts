"use server";

import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createCandidate(formData: FormData) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  const tenantId = (session.user as any).tenantId;

  await prisma.candidate.create({
    data: {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: (formData.get("phone") as string) || null,
      location: (formData.get("location") as string) || null,
      experience: parseInt(formData.get("experience") as string) || 0,
      skills: ((formData.get("skills") as string) || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      resumeText: (formData.get("resumeText") as string) || null,
      tenantId,
    },
  });

  revalidatePath("/candidates");
  redirect("/candidates");
}
