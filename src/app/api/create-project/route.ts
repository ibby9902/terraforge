import { NextResponse } from "next/server";

import { getServerAuthSession } from "@/server/auth";
import { createProjectSchema } from "@/lib/validation/project";
import { db } from "@/server/db";

export async function POST(request: Request) {
  try {
    const session = await getServerAuthSession();

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const json = await request.json();
    const { type, name, description } = createProjectSchema.parse(json);

    const modId = name.replace(/\s+/g, '-').toLowerCase(); // TODO: move to util function

    const project = await db.project.findUnique({
      where: {
        name,
        id: modId
      }
    });
  
    if (project) {
      return NextResponse.json({ message: "This project already exists" }, { status: 400 });
    }
  
    const newProject = await db.project.create({
      data: {
        name,
        id: modId,
        author: {
          connect: { id: session.user.id }
        },
        type,
        description,
        downloads: 0
      }
    });
  
    return NextResponse.json({ projectId: newProject.id }, { status: 200 });
  }
  catch(error) {
    console.log("[ERROR][CREATE_PROJECT_POST]: ", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}