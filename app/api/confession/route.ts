import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Add more words to this list as needed
const bannedWords = ["muji", "gand", "chod", "boka", "bitch", "fuck", "asshole", "lado", "puty",];

function containsBadWords(text: string): boolean {
    return bannedWords.some((word) => new RegExp(`\\b${word}\\b`, "i").test(text));
}

export async function GET() {
    const confessions = await prisma.confession.findMany({
        orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(confessions);
}

export async function POST(req: NextRequest) {
    const { content } = await req.json();

    if (!content || content.trim() === "") {
        return NextResponse.json({ message: "Content is required" }, { status: 400 });
    }

    if (containsBadWords(content)) {
        return NextResponse.json({ message: "Inappropriate content detected." }, { status: 400 });
    }

    const newConfession = await prisma.confession.create({
        data: { content },
    });

    return NextResponse.json(newConfession, { status: 201 });
}
