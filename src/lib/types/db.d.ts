import type { TagsOnMods, Tag, Mod, User } from "@prisma/client";

export type ExtendedTag = TagsOnMods & {
  tag: Tag
}

export type ModWithUser = Mod & {
  author: User
}