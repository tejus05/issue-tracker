import { NextRequest, NextResponse } from "next/server";
import prisma from '@/prisma/client'
import { createIssueSchema } from "@/app/validationSchema";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const validation = createIssueSchema.safeParse(body);

  if (!validation.success) return NextResponse.json(validation.error.format(), { status: 400 });

  const newIssue = await prisma.issue.create({
    data: {
      title: validation.data.title,
      description: validation.data.description,
    }
  });

  return NextResponse.json(newIssue, { status: 201 });
}