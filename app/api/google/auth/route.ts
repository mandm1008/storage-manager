import { NextResponse } from "next/server";
import { createOAuthClient } from "@/lib/google";

export async function GET() {
  const client = createOAuthClient();

  const url = client.generateAuthUrl({
    access_type: "offline",
    scope: [
      "https://www.googleapis.com/auth/drive",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
    prompt: "consent",
  });

  return NextResponse.redirect(url);
}
