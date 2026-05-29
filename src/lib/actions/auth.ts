"use server";

import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function seedInitialUser(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;
  const companyName = formData.get("companyName") as string;

  if (!email || !password || !name || !companyName) {
    return { error: "Saari fields fill karo" };
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { error: "Ye email already registered hai" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const tenant = await prisma.tenant.create({
    data: { name: companyName },
  });

  await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
      role: "ADMIN",
      tenantId: tenant.id,
    },
  });

  return { success: true };
}
