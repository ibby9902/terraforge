import { NextResponse } from "next/server";

import { getServerAuthSession } from "@/server/auth";
import { deleteModSchema } from "@/lib/validation/project";
import { db } from "@/server/db";
import { utapi } from "@/server/uploadthing";

export async function DELETE(request: Request) {
  try {
    const session = await getServerAuthSession();

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const json = await request.json() as { modId: string };
    const { modId } = deleteModSchema.parse(json);

    const mod = await db.mod.findUnique({
      where: {
        id: modId,
      },
      include: {
        author: true
      }
    });

    if (!mod) {
      console.log(`[INFO][DELETE_MOD]: Delete mod failed. This mod does not exist. Request-Mod Id: ${modId}`);

      return new NextResponse("Not found", { status: 404 });
    }

    if (mod.author.id !== session.user.id) {
      console.log(`[INFO][DELETE_MOD]: Delete mod failed. This user is unauthorized to delete this mod. User Id: ${session.user.id}, Mod Id: ${mod.id}`);

      return new NextResponse("Unauthorized", { status: 401 });
    }

    await db.mod.delete({
      where: {
        id: modId
      }
    });

    if (mod.icon) {
      const pathSegments = new URL(mod.icon).pathname.split('/');
  
      const key = pathSegments[pathSegments.length - 1];
      
      await utapi.deleteFiles(key!);
    }

    console.log("[INFO][DELETE_MOD]: Successfully deleted mod");

    return NextResponse.json({ status: 200 });
  }
  catch (error) {
    console.log("[ERROR][DELETE_MOD]: ", error);

    return NextResponse.json({ status: 500 });
  }
}