import { NextResponse } from "next/server";

import { db } from "@/server/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  let query = searchParams.get("q") as string | undefined;
  if (!query) {
    query = undefined;
  }

  const mods = await db.mod.findMany({
    where: {
      name: {
        contains: query ?? undefined
      }
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          image: true,
        }
      }
    }
  });

  return NextResponse.json({ mods: mods }, { status: 200 });
}