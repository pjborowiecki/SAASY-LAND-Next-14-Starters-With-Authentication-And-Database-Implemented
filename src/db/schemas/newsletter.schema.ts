import { boolean, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core"

export const newsletterSubscribers = mysqlTable("newsletterSubscriber", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  email: varchar("email", { length: 255 }).notNull(),
  subscribed: boolean("subscribed").default(true),
  createdAt: timestamp("createdAt", { mode: "date", fsp: 3 }).defaultNow(),
})

export type NewsletterSubscriber = typeof newsletterSubscribers.$inferSelect
export type NewNewsletterSubscriber = typeof newsletterSubscribers.$inferInsert
