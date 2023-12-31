import { NextResponse } from "next/server";

import { getServerAuthSession } from "@/server/auth";
import { descriptionSchema } from "@/lib/validation/project";
import { db } from "@/server/db";

export async function POST(request: Request) {
  try {
    const session = await getServerAuthSession();

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const json = await request.json();
    const { id, description } = descriptionSchema.parse(json);

    const mod = await db.mod.findUnique({
      where: {
        id,
      },
      include: {
        author: true
      }
    });

    if (!mod) {
      return new NextResponse("Not found", { status: 404 });
    }

    if (mod.author.id !== session.user.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    
    await db.mod.update({
      where: {
        id,
      },
      data: {
        description
      }
    });

    return new NextResponse("Ok", { status: 200 });
  }
  catch (error) {
    console.log("[ERROR][UPDATE_MOD_DESCRIPTION]: ", error);

    return NextResponse.json({ status: 500 });
  }
}