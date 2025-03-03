import { generateScript } from "@/configs/AIModel";
import { NextRequest, NextResponse } from "next/server";

const SCRIPT_PROMPT = `write two different scripts for a 30-second video on topic: {topic},\ngive me the response in JSON format following this schema:\n{\n  "scripts": [\n    {\n      "content": "script text here"\n    }\n  ]\n}`;

export async function POST(req: NextRequest) {
  try {
    const { topic } = await req.json();
    const PROMPT = SCRIPT_PROMPT.replace("{topic}", topic);
    console.log("Generating script...");

    const result = await generateScript.sendMessage(PROMPT);
    let res = result?.response?.text();

    console.log("Raw Response:", res);

    // ✅ Remove unwanted markdown (`**bold text**`, `(time markers)`, `[SCENE START]`, `[SCENE END]`, and `\n`)
    res = res.replace(/```json|```/g, "").trim(); // Remove triple backticks
    const parsedResponse = JSON.parse(res);

    // ✅ Clean up content in each script
    parsedResponse.scripts = parsedResponse.scripts.map(script => ({
      content: script.content
        .replace(/\*\*(.*?)\*\*/g, "") // Remove bold text `**like this**`
        .replace(/\(.*?\)/g, "") // Remove text inside `()`
        .replace(/\[SCENE START\]/g, "") // Remove [SCENE START]
        .replace(/\[SCENE END\]/g, "") // Remove [SCENE END]
        .replace(/\n/g, " ") // Replace new lines with spaces
        .replace(/\s+/g, " ") // Remove extra spaces
        .trim()
    }));

    return NextResponse.json(parsedResponse);
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ error: "Failed to generate script" }, { status: 500 });
  }
}
