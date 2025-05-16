"use server";

import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";

interface PostPostData {
  image: string;
  content: string;
  isAnonymous: boolean;
  deletecode?: string;
}

type POST_POST_CODE =
  | "OK"
  | "UNKOWN_ERROR"
  | "LOGIN_FOR_NAMED_POST"
  | "DELETECODE_FOR_ANONYMOUS_POST";
export async function PostPostData(data: PostPostData): Promise<{
  code: POST_POST_CODE;
}> {
  try {
    if (data.isAnonymous) {
      const result = await PostAnonymousPostData(data);

      return result;
    } else {
      const result = await PostNamedPostData(data);

      return result;
    }
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
    } else {
      console.error(e);
    }

    return { code: "UNKOWN_ERROR" };
  }
}

async function PostAnonymousPostData({
  deletecode,
  content,
  image,
}: PostPostData): Promise<{
  code: POST_POST_CODE;
}> {
  try {
    if (!deletecode) {
      return { code: "DELETECODE_FOR_ANONYMOUS_POST" };
    }

    prisma.post.create({
      data: {
        content,
        image,
        deletecode,
        likes: 0,
        isAnonymous: true,
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

async function PostNamedPostData({ content, image }: PostPostData): Promise<{
  code: POST_POST_CODE;
}> {
  try {
    const session = await getSession();

    if (!session) {
      return { code: "LOGIN_FOR_NAMED_POST" };
    }

    await prisma.post.create({
      data: {
        userId: session.userid,
        isAnonymous: false,
        content,
        image,
        likes: 0,
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
