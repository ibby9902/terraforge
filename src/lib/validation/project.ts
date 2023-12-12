import { Prisma } from "@prisma/client";
import { z  } from "zod";

const PROJECT_TYPES = ["mod", "modpack"] as const;
export const enum TAG_TYPE {
  Content = "Content",
  Library = "Library",
  QualityOfLife = "QualityOfLife",
  GameplayTweaks = "GameplayTweaks",
  VisualTweaks = "VisualTweaks",
  AudioTweaks = "AudioTweaks",
  WorldGen = "WorldGen"
}

export const createProjectSchema = z.object({
  type: z.enum(PROJECT_TYPES, { errorMap: (issue, ctx) => ({ message: 'Please select a project type' })}),
  name: z.string({ errorMap: (issue, ctx) => ({ message: 'Please enter a name' })}).min(3, { message: "Name must be longer than 3 characters"}),
  summary: z.string()
});

export const  descriptionSchema = z.object({
  id: z.string(),
  description: z.any()
});

export const updateModIconSchema = z.object({
  modId: z.string(),
  imageUrl: z.string().url()
});

export const updateModSummarySchema = z.object({
  summary: z.string()
});

export const updateModTagsSchema = z.object({
  content: z.boolean(),
  library: z.boolean(),
  qualityOfLife: z.boolean(),
  gameplayTweaks: z.boolean(),
  visualTweaks: z.boolean(),
  audioTweaks: z.boolean(),
  worldGen: z.boolean(),
});