"use server";

import prisma from "@/provider/prisma";
import bcrypt from "bcrypt";

interface RegisterData {
  email: string;
  nickname: string;
  password: string;
}

type registerUserCode = "OK" | "UNKOWN_ERROR" | "EMAIL_DUPLICATE";

export async function registerUser({
  email,
  nickname,
  password,
}: RegisterData): Promise<{ code: registerUserCode }> {
  try {
    const isExist = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });

    if (isExist) return { code: "EMAIL_DUPLICATE" };

    const hashedPassword = await bcrypt.hash(password, 5);

    await prisma.user.create({
      data: {
        email,
        nickname,
        password: hashedPassword,
      },
    });

    return { code: "OK" };
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
    } else {
      console.error(e);
    }

    return { code: "UNKOWN_ERROR" };
  }
}
