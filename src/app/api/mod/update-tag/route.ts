import { NextResponse } from "next/server";

import { getServerAuthSession } from "@/server/auth";
import { updateModTagSchema } from "@/lib/validation/project";
import { db } from "@/server/db";

export async function POST(request: Request) {
  try {
    const session = await getServerAuthSession();

    if (!session) {
      console.log("[INFO][UPDATE_MOD_TAGS] Update Mod tag failed. No session found.");

      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const json = await request.json();
    const { modId, tagName, action } = updateModTagSchema.parse(json);
    
    const mod = await db.mod.findUnique({
      where: {
        id: modId
      },
      include: {
        author: true,
        tags: { include: { tag: true } }
      }
    });

    if (!mod) {
      console.log(`[INFO][UPDATE_MOD_TAGS] ${action} Mod tag failed. Mod not found. Request-ModId: '${modId}', UserId: '${session.user.id}'`);

      return NextResponse.json({ message: "Mod not found" }, { status: 404 });
    }

    if (mod.author.id !== session.user.id) {
      console.log(`[INFO][UPDATE_MOD_TAGS] ${action} Mod tag failed. User is not the mod author. ModId: '${mod.id}', UserId: '${session.user.id}'`);

      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const tag = await db.tag.findFirst({
      where: {
        name: tagName
      }
    });

    if (!tag) {
      console.log(`[ERROR][UPDATE_MOD_TAGS]: ${action} Mod tag failed. Tag not found. Tag name: '${tagName}', ModId: '${mod.id}', UserId: '${session.user.id}'`);

      return NextResponse.json({ message: "Tag Not found" }, { status: 404 });
    }

    const tagOnMod = await db.tagsOnMods.findUnique({
      where: {
        modId_tagId: {
          modId,
          tagId: tag.id,
        },
      }
    });

    if (action === "add") {
      if (tagOnMod) {
        console.log(`[INFO][UPDATE_MOD_TAGS]: ${action} Mod tag failed. This mod already has this tag. ModId: '${mod.id}', Tag name: '${tagName}' UserId: '${session.user.id}'`);

        return NextResponse.json({ message: "Mod already has this tag" }, { status: 400 });
      }

      await db.tagsOnMods.create({
        data: {
          mod: {
            connect: { id: modId }
          },
          tag: {
            connect: { id: tag.id }
          }
        }
      });
    }
    else {
      if (!tagOnMod)  {
        console.log(`[INFO][UPDATE_MOD_TAGS]: ${action} Mod tag failed. This mod does not have this tag. ModId: '${mod.id}', Tag name: '${tagName}' UserId: '${session.user.id}'`);

        return NextResponse.json({ message: "This Mod does not have this tag" }, { status: 400 });
      }

      await db.tagsOnMods.delete({
        where: {
          modId_tagId: {
            modId,
            tagId: tag.id,
          },
        }
      });
    }
    
    console.log(`[INFO][UPDATE_MOD_TAGS]: Update Mod tag succeeded. Action: '${action}', Tag name: '${tagName}', ModId: '${mod.id}' UserId: '${session.user.id}'`);
    
    const message = action === "add" ? "added" : "deleted";

    return NextResponse.json({ message: `Tag ${message}` }, { status: 200 });
  }
  catch (error) {
    console.log("[ERROR][UPDATE_MOD_TAGS]: ", error);

    return NextResponse.json({ message: "An unexpected error occurred"}, { status: 500 });
  }
}