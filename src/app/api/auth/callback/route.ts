import { User } from "@/generated/prisma/client";
import prisma from "@/lib/prisma";
import { createSession } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  //e.g. http://localhost:3000/api/auth/callback?code=abc123
  const url = new URL(req.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(new URL("/login?error=missing_code", req.url));
  }

  // 1. Exchange GitHub code for access token
  const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: { Accept: "application/json" },
    body: new URLSearchParams({
      client_id: process.env.GITHUB_CLIENT_ID!,
      client_secret: process.env.GITHUB_CLIENT_SECRET!,
      code,
    }),
  });

  const { access_token } = await tokenRes.json();
  if (!access_token) {
    return NextResponse.redirect(new URL("/login?error=token", req.url));
  }

  // 2. Fetch user info from GitHub
  const userRes = await fetch("https://api.github.com/user", {
    headers: { Authorization: `Bearer ${access_token}` },
  });
  const ghUser = await userRes.json();

  const { id: githubId, email, login, name, avatar_url } = ghUser;

  if (!githubId) {
    return NextResponse.redirect(new URL("/login?error=github_user", req.url));
  }

  // 3. Look for existing account or create user/account
  const existingAccount = await prisma.account.findUnique({
    where: {
      provider_providerAccountId: {
        provider: "github",
        providerAccountId: String(githubId),
      },
    },
    include: { user: true },
  });

  let user: User;

  if (existingAccount) {
    user = existingAccount.user;
  } else {
    user = await prisma.user.create({
      data: {
        email: email ?? `${login}@users.noreply.github.com`,
        password: null,
        nickname: name ?? login,
        profileImage: avatar_url,
        accounts: {
          create: {
            provider: "github",
            providerAccountId: String(githubId),
            accessToken: access_token,
          },
        },
      },
    });
  }

  // 4. Issue JWT session and set cookie
  await createSession({
    userid: user.id,
    nickname: user.nickname,
    email: user.email,
  });

  return NextResponse.redirect(new URL("/", req.url));
}
