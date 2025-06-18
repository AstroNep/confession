import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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

    const newConfession = await prisma.confession.create({
        data: { content },
    });

    return NextResponse.json(newConfession, { status: 201 });
}
