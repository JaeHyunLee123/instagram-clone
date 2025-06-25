"use server";

import { redirect } from "next/navigation";

export default async function githubLogin() {
  const redirectUri = process.env.GITHUB_CALLBACK_URL;
  const clientId = process.env.GITHUB_CLIENT_ID;

  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=read:user%20user:email`;

  redirect(githubAuthUrl);
}
