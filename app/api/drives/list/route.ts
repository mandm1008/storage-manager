import prisma from "@/lib/db";
import { driveClient } from "@/lib/google";

export async function GET() {
  const accounts = await prisma.googleAccount.findMany();
  let allFiles: any[] = [];

  for (const acc of accounts) {
    const drive = driveClient({
      access_token: acc.accessToken,
      refresh_token: acc.refreshToken,
    });

    const res = await drive.files.list({
      pageSize: 100,
      fields: "files(id, name, size)",
    });

    const files = res.data.files || [];

    allFiles.push(
      ...files.map((f: any) => ({
        ...f,
        owner: acc.email,
      }))
    );
  }

  return Response.json(allFiles);
}
