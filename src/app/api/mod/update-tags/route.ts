import { NextResponse } from "next/server";

import { getServerAuthSession } from "@/server/auth";
import { TAG_TYPE, updateModTagsSchema } from "@/lib/validation/project";
import { db } from "@/server/db";

export async function POST(request: Request) {
  try {
    const session = await getServerAuthSession();

    if (!session) {
      console.log(`[INFO][UPDATE_MOD_TAGS] Update Mod tags failed. No session found.`);

      return new NextResponse("Unauthorized", { status: 401 });
    }

    const json = await request.json();
    const { modId, tags } = updateModTagsSchema.parse(json);
    
    const mod = await db.project.findUnique({
      where: {
        id: modId
      },
      include: {
        author: true
      }
    });

    if (!mod) {
      console.log(`[INFO][UPDATE_MOD_TAGS] Update Mod tags failed. Mod not found. Request-ModId: '${modId}', UserId: '${session.user.id}'`);

      return NextResponse.json({ message: "Mod not found" }, { status: 404 });
    }

    if (mod.author.id !== session.user.id) {
      console.log(`[INFO][UPDATE_MOD_TAGS] Update Mod tags failed. User is not the mod author. ModId: '${mod.id}', UserId: '${session.user.id}'`);

      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (tags.length === 0) {
      await db.tagsOnMods.deleteMany({
        where: {
          modId
        }
      });
    }

    const tagValue = Object.values(TAG_TYPE) as string[];
    const tagsToDelete = tagValue.filter(x => !tags.includes(x));

    for (const tagName of tagsToDelete) {
      const tag = await db.tag.findUniqueOrThrow({
        where: {
          name: tagName
        }
      });

      const tagOnMod = await db.tagsOnMods.findUnique({
        where: {
          modId_tagId: {
            modId,
            tagId: tag.id,
          },
        }
      });

      if (tagOnMod) {
        await db.tagsOnMods.delete({
          where: {
            modId_tagId: {
              modId,
              tagId: tag.id,
            },
          }
        });
      }
    }

    for (const tagName of tags) {
      const tag = await db.tag.findUnique({
        where: {
          name: tagName
        }
      });

      if (!tag) {
        console.log(`[INFO][UPDATE_MOD_TAGS]: Mod tag name not found, skipping. Tag name: '${tagName}' ModId: '${mod.id}' UserId: '${session.user.id}'`);

        continue; // better to just return error?
      }

      const project = await db.project.findUniqueOrThrow({
        where: { id: modId },
        include: { tags: { include: { tag: true } } },
      });

      const tags = project.tags.map((tagOnMod) => tagOnMod.tag.name);
      
      if (tags.includes(tagName)) {
        continue;
      }

      await db.tagsOnMods.create({
        data: {
          mod: {
            connect: { id: modId }
          },
          tag: {
            connect: { id: tag.id}
          }
        }
      })
    }

    console.log(`[INFO][UPDATE_MOD_TAGS]: Update Mod tags succeeded. ModId: '${mod.id}' UserId: '${session.user.id}'`);

    return NextResponse.json({ message: "Tags updated" }, { status: 200 });
  }
  catch (error) {
    console.log("[ERROR][UPDATE_MOD_TAGS]: ", error);

    return NextResponse.json({ message: "An unexpected error occurred"}, { status: 500 });
  }
}