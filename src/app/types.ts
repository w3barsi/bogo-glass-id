import { type EmployeeType } from "~/server/db/schema";

export type EmployeeOnlyType = Omit<EmployeeType, "createdAt" | "updatedAt">;
