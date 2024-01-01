import { NextResponse } from "next/server";

import { getServerAuthSession } from "@/server/auth";
import { updateModIconSchema } from "@/lib/validation/project";
import { db } from "@/server/db";
import { utapi } from "@/server/uploadthing";

export async function POST(request: Request) {
  try {
    const session = await getServerAuthSession();

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const json = await request.json();
    const { modId, imageUrl } = updateModIconSchema.parse(json);
    
    const mod = await db.mod.findUnique({
      where: {
        id: modId
      },
      include: {
        author: true
      }
    });

    if (!mod) {
      return NextResponse.json({ message: "Mod not found" }, { status: 404 });
    }

    if (mod.author.id !== session.user.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    if (mod.icon) {
      const pathSegments = new URL(mod.icon).pathname.split('/');
  
      const key = pathSegments[pathSegments.length - 1];
      
      await utapi.deleteFiles(key!);
    }

    await db.mod.update({
      where: {
        id: modId,
      },
      data: {
        icon: imageUrl
      }
    });

    return NextResponse.json({ message: "Mod icon updated" }, { status: 200 });
  }
  catch (error) {
    console.log("[ERROR][UPDATE_MOD_ICON]: ", error);

    return NextResponse.json({ message: "An unexpected error occurred"},{ status: 500 });
  }
}