import { mysqlTable, mysqlSchema, AnyMySqlColumn, primaryKey, varchar, int, timestamp } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"


export const account = mysqlTable("account", {
	userId: varchar("userId", { length: 255 }).notNull(),
	type: varchar("type", { length: 255 }).notNull(),
	provider: varchar("provider", { length: 255 }).notNull(),
	providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
	refreshToken: varchar("refresh_token", { length: 255 }),
	accessToken: varchar("access_token", { length: 255 }),
	expiresAt: int("expires_at"),
	tokenType: varchar("token_type", { length: 255 }),
	scope: varchar("scope", { length: 255 }),
	idToken: varchar("id_token", { length: 255 }),
	sessionState: varchar("session_state", { length: 255 }),
},
(table) => {
	return {
		accountProviderProviderAccountId: primaryKey(table.provider, table.providerAccountId),
	}
});

export const session = mysqlTable("session", {
	sessionToken: varchar("sessionToken", { length: 255 }).notNull(),
	userId: varchar("userId", { length: 255 }).notNull(),
	expires: timestamp("expires", { mode: 'string' }).notNull(),
},
(table) => {
	return {
		sessionProviderProviderAccountId: primaryKey(table.provider, table.providerAccountId),
	}
});

export const user = mysqlTable("user", {
	id: varchar("id", { length: 255 }).notNull(),
	name: varchar("name", { length: 255 }),
	email: varchar("email", { length: 255 }).notNull(),
	emailVerified: timestamp("emailVerified", { fsp: 3, mode: 'string' }).defaultNow(),
	image: varchar("image", { length: 255 }),
},
(table) => {
	return {
		userProviderProviderAccountId: primaryKey(table.provider, table.providerAccountId),
	}
});

export const verificationToken = mysqlTable("verificationToken", {
	identifier: varchar("identifier", { length: 255 }).notNull(),
	token: varchar("token", { length: 255 }).notNull(),
	expires: timestamp("expires", { mode: 'string' }).notNull(),
},
(table) => {
	return {
		verificationTokenProviderProviderAccountId: primaryKey(table.provider, table.providerAccountId),
	}
});