import { createIssueSchema } from "@/app/validationSchema";
import { NextRequest, NextResponse } from "next/server"
import prisma from "@/prisma/client";

interface Props {
  params: {
    id: string
  }
}

export async function PATCH(request:NextRequest, {params:{id}}:Props) {
  const body = await request.json();
  const validation = createIssueSchema.safeParse(body);

  if (!validation.success) return NextResponse.json(validation.error.format(), { status: 400 });

  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(id)
    }
  })

  if (!issue) return NextResponse.json({ error: "issue does not exist. " }, { status: 404 })
  
  const updatedIssue = await prisma.issue.update({
    where: {
      id: issue.id
    },
    data: {
      title: validation.data?.title,
      description: validation.data?.description
    }
  })

  return NextResponse.json(updatedIssue,{status: 200});
}