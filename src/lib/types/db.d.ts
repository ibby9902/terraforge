import { Project, TagsOnMods, Tag } from "@prisma/client";

export type ExtendedTag = TagsOnMods & {
  tag: Tag
}