"use server";

import { createSession, deleteSession, getSession } from "@/lib/session";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { SessionPayload } from "@/lib/definitions";

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

    const newUser = await prisma.user.create({
      data: {
        email,
        nickname,
        password: hashedPassword,
      },
    });

    await createSession({
      userid: newUser.id,
      email: newUser.email,
      nickname: newUser.nickname,
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

export async function emailLogin({
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

    await createSession({
      userid: user.id,
      email: user.email,
      nickname: user.nickname,
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

type LOGOUT_CODE = "OK" | "UNKOWN_ERROR";
export async function logout(): Promise<{ code: LOGOUT_CODE }> {
  try {
    await deleteSession();

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

type GET_SESSION_CLIENT_CODE = "OK" | "UNKOWN_ERROR";
export async function getSessionClient(): Promise<{
  code: GET_SESSION_CLIENT_CODE;
  session?: SessionPayload | null;
}> {
  try {
    const session = await getSession();

    return { code: "OK", session };
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
    } else {
      console.error(e);
    }

    return { code: "UNKOWN_ERROR" };
  }
}
