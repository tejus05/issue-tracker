import { patchIssueSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import authOptions from "../../auth/authOptions";

interface Props {
  params: {
    id: string;
  };
}

export async function PATCH(request: NextRequest, { params: { id } }: Props) {
  const session = await getServerSession(authOptions);

  if (!session)
    return NextResponse.json({ error: "unauthorised" }, { status: 401 });

  const body = await request.json();
  const validation = patchIssueSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const { title, description, assignedToUserId } = validation.data;

  if (assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: {
        id: assignedToUserId,
      },
    });

    if (!user)
      return NextResponse.json({ error: "invalid user" }, { status: 404 });
  }

  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!issue)
    return NextResponse.json(
      { error: "issue does not exist. " },
      { status: 404 }
    );

  const updatedIssue = await prisma.issue.update({
    where: {
      id: issue.id,
    },
    data: {
      title,
      description,
      assignedToUserId
    },
  });

  return NextResponse.json(updatedIssue, { status: 200 });
}

export async function DELETE(request: NextRequest, { params: { id } }: Props) {
  const session = await getServerSession(authOptions);

  if (!session)
    return NextResponse.json({ error: "unauthorised" }, { status: 401 });

  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!issue)
    return NextResponse.json(
      { error: "issue does not exist" },
      { status: 404 }
    );

  await prisma.issue.delete({
    where: {
      id: issue.id,
    },
  });

  return NextResponse.json(
    { message: "issue deleted successfully" },
    { status: 200 }
  );
}
