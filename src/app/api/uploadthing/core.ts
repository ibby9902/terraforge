import { createUploadthing, type FileRouter } from "uploadthing/next";
import { getServerAuthSession } from "@/server/auth";

const f = createUploadthing();
 
export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .middleware(async ({ req }) => {
      const session = await getServerAuthSession();
 
      if (!session) 
        throw new Error("Unauthorized");
 
      return {};
    })
    .onUploadComplete(({ metadata, file }) => {
      return { uploadedBy: metadata };
    }),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;