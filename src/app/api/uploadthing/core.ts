import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { z } from "zod";
import { selectEmployeeSchema } from "~/server/db/schema";
import { api } from "~/trpc/server";

const f = createUploadthing();


// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "32MB" } }).input(selectEmployeeSchema.omit({ createdAt: true, updatedAt: true }).extend({ uploadFor: z.enum(["picture", "signature"]) }))
    // Set permissions and file types for this FileRoute
    .middleware(async ({ input }) => {
      // This code runs on your server before upload
      const user = auth();

      // If you throw, the user will not be able to upload
      // eslint-disable-next-line @typescript-eslint/only-throw-error
      if (!user) throw new UploadThingError("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.userId, input };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete @ ", file.url);
      console.log(metadata.input.uploadFor)
      if (metadata.input.uploadFor === "picture") {
        await api.employee.updatePicture({ id: metadata.input.id, url: file.url })
      } else {
        await api.employee.updateSignature({ id: metadata.input.id, url: file.url })
      }

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
