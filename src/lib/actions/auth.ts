"use server";

import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export async function signupAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;
  const companyName = formData.get("companyName") as string;

  if (!email || !password || !name || !companyName) {
    redirect("/signup?error=Please+fill+all+fields");
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    redirect("/signup?error=Email+already+registered");
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

  redirect("/login?signup=success");
}
