import { Prisma } from "@prisma/client";
import { z  } from "zod";

const PROJECT_TYPES = ["mod", "modpack"] as const;

export const createProjectSchema = z.object({
  type: z.enum(PROJECT_TYPES, { errorMap: (issue, ctx) => ({ message: 'Please select a project type' })}),
  name: z.string({ errorMap: (issue, ctx) => ({ message: 'Please enter a name' })}).min(3, { message: "Name must be longer than 3 characters"}),
  summary: z.string().optional()
});

export const  descriptionSchema = z.object({
  id: z.string(),
  description: z.any()
});