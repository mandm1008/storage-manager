import { NextResponse } from "next/server";
import { google } from "googleapis";
import prisma from "@/lib/db";
import { createOAuthClient } from "@/lib/google";

export async function GET(req: Request) {
  const code = new URL(req.url).searchParams.get("code");
  const client = createOAuthClient();

  const { tokens } = await client.getToken(code!);
  client.setCredentials(tokens);

  const oauth2 = google.oauth2({ version: "v2", auth: client });
  const userInfo = await oauth2.userinfo.get();

  await prisma.googleAccount.create({
    data: {
      email: userInfo.data.email!,
      accessToken: tokens.access_token!,
      refreshToken: tokens.refresh_token || "",
      expiryDate: tokens.expiry_date || null,
    },
  });

  return NextResponse.redirect("/dashboard");
}
