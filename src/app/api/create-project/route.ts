import { NextResponse } from "next/server";

import { getServerAuthSession } from "@/server/auth";
import { createProjectSchema } from "@/lib/validation/project";
import { db } from "@/server/db";

export async function POST(request: Request) {
  try {
    const session = await getServerAuthSession();

    if (!session) {
      return NextResponse.json({ message: "You need to be logged in to perform this action" }, { status: 401 });
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const json = await request.json();
    const { type, name, summary } = createProjectSchema.parse(json);

    const slug = name.replace(/\s+/g, '-').toLowerCase(); // TODO: move to util function

    const mod = await db.mod.findUnique({
      where: {
        name,
        slug: slug
      }
    });
  
    if (mod) {
      return NextResponse.json({ message: "This project already exists" }, { status: 400 });
    }
  
    const newMod = await db.mod.create({
      data: {
        name,
        slug: slug,
        author: {
          connect: { id: session.user.id }
        },
        icon: "https://utfs.io/f/412b68bd-5b72-4592-9055-932925c84f0b_8.jpg",
        summary,
        downloads: 0
      }
    });
  
    return NextResponse.json({ slug: newMod.slug }, { status: 200 });
  }
  catch(error) {
    console.log("[ERROR][CREATE_PROJECT_POST]: ", error);
    return NextResponse.json({ message: "An unexpected error occurred" }, { status: 500 });
  }
}