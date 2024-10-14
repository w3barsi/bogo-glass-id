// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { type InferSelectModel, sql } from "drizzle-orm";
import { index, int, sqliteTableCreator, text } from "drizzle-orm/sqlite-core";
import { createSelectSchema } from 'drizzle-zod';

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = sqliteTableCreator((name) => `bogo-glass_${name}`);

const timestamp = {
  createdAt: int("created_at", { mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .notNull(),
  updatedAt: int("updated_at", { mode: "timestamp" }).$onUpdate(
    () => new Date()
  ),
}

export const employeeTable = createTable("employee", {
  id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),


  fullName: text("full_name").notNull(),
  pic: text("pic"),
  sig: text("sig"),

  ...timestamp
})

export const selectEmployeeSchema = createSelectSchema(employeeTable)
export type EmployeeType = InferSelectModel<typeof employeeTable>

