import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from '@/prisma/client'

const createIssueSchema = z.object({
  title:z.string().min(1, "Title is required. ").max(255),
  description:z.string().min(1,"Description is required. ")
})

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