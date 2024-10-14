
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";
import { employeeTable } from "~/server/db/schema";

export const employeeRouter = createTRPCRouter({
  getEmployees: protectedProcedure
    .query(({ ctx }) => {
      return ctx.db.select().from(employeeTable);

    }),
  createEmployee: publicProcedure.mutation(({ ctx }) => {
    ctx.db.insert(employeeTable).values({ fullName: "TESTINGaaa", sig: "SIGNATUUUREEEaaa" })
  }),
  updateSignature: publicProcedure.input(z.object(
    {
      id: z.number(), url: z.string()
    })).mutation(async ({ ctx, input }) => {
      await ctx.db.update(employeeTable).set({ sig: input.url }).where(eq(employeeTable.id, input.id))
      revalidatePath("/")
    }),
  updatePicture: publicProcedure.input(z.object(
    {
      id: z.number(), url: z.string()
    })).mutation(async ({ ctx, input }) => {
      await ctx.db.update(employeeTable).set({ pic: input.url }).where(eq(employeeTable.id, input.id))
      revalidatePath("/")
    })
});

