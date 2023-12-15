import { z  } from "zod";

const PROJECT_TYPES = ["mod", "modpack"] as const;

export enum TAG_TYPE {
  Content = "content",
  Library = "library",
  QualityOfLife = "quality-of-life",
  GameplayTweaks = "gameplay-tweaks",
  VisualTweaks = "visual-tweaks",
  AudioTweaks = "audio-tweaks",
  WorldGen = "world-gen"
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
  modId: z.string(),
  summary: z.string()
});

export const updateModTagSchema = z.object({
  modId: z.string(),
  tagName: z.nativeEnum(TAG_TYPE),
  action: z.boolean()
});