import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const {
      chapterName,
      topicName,
      subject,
      ytLink,
      driveLink,
      telegramLink,
    } = await req.json();

    const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY!);

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    // Appends a row matching Columns A to F
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Sheet1!A:F",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            chapterName || "",
            topicName || "",
            subject || "Physics",
            ytLink || "",
            driveLink || "",
            telegramLink || "",
          ],
        ],
      },
    });

    return NextResponse.json({ success: true, message: "Row added to Google Sheet!" });
  } catch (error: any) {
    console.error("Sheet Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
