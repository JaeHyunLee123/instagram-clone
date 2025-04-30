"use server";

import prisma from "@/provider/prisma";
import bcrypt from "bcrypt";

interface RegisterData {
  email: string;
  nickname: string;
  password: string;
}

type message = "OK" | "UNKOWN_ERROR" | "EMAIL_DUPLICATE";

export async function register({
  email,
  nickname,
  password,
}: RegisterData): Promise<{ message: message }> {
  try {
    const isExist = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });

    if (isExist) return { message: "EMAIL_DUPLICATE" };

    const hashedPassword = await bcrypt.hash(password, 5);

    await prisma.user.create({
      data: {
        email,
        nickname,
        password: hashedPassword,
      },
    });

    return { message: "OK" };
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
    } else {
      console.error(e);
    }

    return { message: "UNKOWN_ERROR" };
  }
}
