import "dotenv/config";
import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = (process.env.MENTOR_EMAIL ?? "mentor@evalix.dev").toLowerCase();
  const password = process.env.MENTOR_PASSWORD ?? "ChangeMe123!";
  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.user.upsert({
    where: { email },
    update: { role: Role.MENTOR, name: process.env.MENTOR_NAME ?? "Evalix Mentor", passwordHash },
    create: { email, role: Role.MENTOR, name: process.env.MENTOR_NAME ?? "Evalix Mentor", passwordHash }
  });

  console.log(`Mentor account is ready: ${email}`);
}

main().finally(() => prisma.$disconnect());
