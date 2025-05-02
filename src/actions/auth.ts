"use server";

import { createSession } from "@/lib/session";
import prisma from "@/provider/prisma";
import bcrypt from "bcrypt";

interface RegisterData {
  email: string;
  nickname: string;
  password: string;
}

type REGISTER_USER_CODE = "OK" | "UNKOWN_ERROR" | "EMAIL_DUPLICATE";

export async function registerUser({
  email,
  nickname,
  password,
}: RegisterData): Promise<{ code: REGISTER_USER_CODE }> {
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

interface EmailLoginData {
  email: string;
  password: string;
}

type EMAIL_LOGIN_CODE =
  | "OK"
  | "UNKOWN_ERROR"
  | "NO_USER"
  | "SOCIAL_USER"
  | "INCORRECT_PASSWORD";

export async function EmailLogin({
  email,
  password,
}: EmailLoginData): Promise<{ code: EMAIL_LOGIN_CODE }> {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return { code: "NO_USER" };
    }

    if (!user.password) {
      return { code: "SOCIAL_USER" };
    }

    const isPasswordSame = await bcrypt.compare(password, user.password);

    if (!isPasswordSame) {
      return { code: "INCORRECT_PASSWORD" };
    }

    await createSession({ userid: user.id, email: user.email });

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
