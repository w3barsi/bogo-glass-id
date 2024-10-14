import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";
import { employeeTable } from "~/server/db/schema";

export const employeeRouter = createTRPCRouter({
  getEmployees: protectedProcedure
    .query(({ ctx }) => {
      return ctx.db.select().from(employeeTable).orderBy(employeeTable.fullName);

    }),
  createEmployee: publicProcedure.mutation(({ ctx }) => {
    ctx.db.insert(employeeTable).values({ fullName: "TESTINGaaa", sig: "SIGNATUUUREEEaaa" })
  }),
  updateSignature: publicProcedure.input(z.object(
    {
      id: z.number(), url: z.string()
    })).mutation(async ({ ctx, input }) => {
      await ctx.db.update(employeeTable).set({ sig: input.url }).where(eq(employeeTable.id, input.id))
    }),
  updatePicture: publicProcedure.input(z.object(
    {
      id: z.number(), url: z.string()
    })).mutation(async ({ ctx, input }) => {
      await ctx.db.update(employeeTable).set({ pic: input.url }).where(eq(employeeTable.id, input.id))
    }),
  deletePicture: protectedProcedure.input(z.object({ id: z.number() })).mutation(async ({ ctx, input }) => {

    try {
      await ctx.db.update(employeeTable).set({ pic: null }).where(eq(employeeTable.id, input.id))
    } catch (e) {
      throw new TRPCError({ message: "Failed to deleete photo.", code: "BAD_REQUEST" })
    }

  }),
  deleteSignature: protectedProcedure.input(z.object({ id: z.number() })).mutation(async ({ ctx, input }) => {

    try {
      await ctx.db.update(employeeTable).set({ sig: null }).where(eq(employeeTable.id, input.id))
    } catch (e) {
      throw new TRPCError({ message: "Failed to deleete photo.", code: "BAD_REQUEST" })
    }

  })
});

