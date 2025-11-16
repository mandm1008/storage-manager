import prisma from "@/lib/db";
import { driveClient } from "@/lib/google";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const file = form.get("file") as File;
  if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

  const accounts = await prisma.googleAccount.findMany();

  // 1) Lấy dung lượng còn lại của từng drive
  const driveStats = [];

  for (const acc of accounts) {
    const drive = driveClient({
      access_token: acc.accessToken,
      refresh_token: acc.refreshToken,
    });

    const about = await drive.about.get({
      fields: "storageQuota/limit,storageQuota/usage",
    });

    const limit = Number(about.data.storageQuota?.limit || 0);
    const usage = Number(about.data.storageQuota?.usage || 0);
    const remaining = limit - usage;

    driveStats.push({
      acc,
      remaining,
      drive,
    });
  }

  // 2) Chọn drive còn nhiều dung lượng nhất
  const best = driveStats.sort((a, b) => b.remaining - a.remaining)[0];

  // 3) Upload file
  const buffer = Buffer.from(await file.arrayBuffer());

  await best.drive.files.create({
    requestBody: {
      name: file.name,
    },
    media: {
      body: buffer,
    },
  });

  return NextResponse.json({ ok: true, uploadedTo: best.acc.email });
}
