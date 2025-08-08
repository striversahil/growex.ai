import { relations } from "drizzle-orm";
import {
  pgTable,
  serial,
  text,
  integer,
  boolean,
  uuid,
  timestamp,
} from "drizzle-orm/pg-core";

export const user = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  age: integer("age").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const chat_session = pgTable("chat_sessions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => user.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const chat_message = pgTable("chat_messages", {
  id: uuid("id").primaryKey().defaultRandom(),
  sessionId: uuid("session_id")
    .notNull()
    .references(() => chat_session.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  isUser: boolean("is_user").notNull().default(true),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const course = pgTable("courses", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  userId: uuid("user_id")
    .notNull()
    .references(() => user.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  description: text("description").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const module = pgTable("module", {
  id: uuid("id").primaryKey().defaultRandom(),
  courseId: uuid("course_id")
    .notNull()
    .references(() => course.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  title: text("title").notNull(),
  description: text("description").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const userChatRelation = relations(user, ({ many }) => ({
  chatSessions: many(chat_session),
}));

export const chatSessionUserRelation = relations(chat_session, ({ one }) => ({
  user: one(user, {
    fields: [chat_session.userId],
    references: [user.id],
  }),
}));
export const chatMessageSessionRelation = relations(
  chat_message,
  ({ one }) => ({
    session: one(chat_session, {
      fields: [chat_message.sessionId],
      references: [chat_session.id],
    }),
  })
);
