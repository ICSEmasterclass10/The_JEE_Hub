import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { videoUrl, timestamp, noteText, topic } = await req.json();

    const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY!);

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Sheet1!A:E",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
            topic || "General Physics",
            videoUrl,
            timestamp,
            noteText,
          ],
        ],
      },
    });

    return NextResponse.json({ success: true, message: "Saved to Google Sheet!" });
  } catch (error: any) {
    console.error("Sheet Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
