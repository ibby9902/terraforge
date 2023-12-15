import { NextResponse } from "next/server";

import { getServerAuthSession } from "@/server/auth";
import { updateModSummarySchema } from "@/lib/validation/project";
import { db } from "@/server/db";

export async function POST(request: Request) {
  try {
    const session = await getServerAuthSession();

    if (!session) {
      console.log("[INFO][UPDATE_MOD_SUMMARY]: Update Mod summary failed. No session found.");

      return new NextResponse("Unauthorized", { status: 401 });
    }

    const json = await request.json();
    const { modId, summary } = updateModSummarySchema.parse(json);

    const mod = await db.mod.findUnique({
      where: {
        id: modId
      },
      include: {
        author: true
      }
    });

    if (!mod) {
      console.log(`[INFO][UPDATE_MOD_SUMMARY]: Update Mod summary failed. Mod not found. Request-ModId: '${modId}', UserId: '${session.user.id}'`);

      return NextResponse.json({ message: "Mod not found" }, { status: 404 });
    }

    if (mod.author.id !== session.user.id) {
      console.log(`[INFO][UPDATE_MOD_SUMMARY]: Update Mod summary failed. User is not the mod author. ModId: '${mod.id}', UserId: '${session.user.id}'`);

      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await db.mod.update({
      where: {
        id: modId
      },
      data: {
        summary
      }
    });

    console.log(`[INFO][UPDATE_MOD_SUMMARY]: Update Mod summary succeeded. ModId: '${mod.id}' UserId: '${session.user.id}'`);

    return NextResponse.json({ message: "Summary updated" }, { status: 200 });
  }
  catch (error) {
    console.log("[ERROR][UPDATE_MOD_SUMMARY]: ", error);

    return NextResponse.json({ message: "An unexpected error occurred"}, { status: 500 });
  }
}