import { google } from "googleapis";

export function createOAuthClient() {
  return new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID!,
    process.env.GOOGLE_CLIENT_SECRET!,
    process.env.GOOGLE_REDIRECT!
  );
}

export function driveClient(tokens: any) {
  const client = createOAuthClient();
  client.setCredentials(tokens);

  return google.drive({ version: "v3", auth: client });
}
