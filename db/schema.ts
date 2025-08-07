import { relations } from "drizzle-orm";
import { pgTable , serial , text , integer , boolean } from "drizzle-orm/pg-core"


export const user = pgTable("users", {
    id: serial("id").primaryKey(),
    email: text("email").notNull().unique(),
    name: text("name").notNull(),
    age: integer("age").notNull().default(0),
    createdAt: text("created_at").notNull().default("now()"),
});


export const chat_session = pgTable("chat_sessions", {
    id: serial("id").primaryKey(),
    userId: integer("user_id").notNull().references(() => user.id , {
        onDelete: "cascade",
        onUpdate: "cascade"
    }),
    createdAt: text("created_at").notNull().default("now()"),
});

export const chat_message = pgTable("chat_messages", {
    id: serial("id").primaryKey(),
    sessionId: integer("session_id").notNull().references(() => chat_session.id , {
        onDelete: "cascade",
        onUpdate: "cascade"
    }),
    isUser : boolean("is_user").notNull().default(true),
    content: text("content").notNull(),
    createdAt: text("created_at").notNull().default("now()"),
});


export const course = pgTable("courses", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    userId: integer("user_id").notNull().references(() => user.id, {
        onDelete: "cascade",
        onUpdate: "cascade"
    }),
    description: text("description").notNull(),
    createdAt: text("created_at").notNull().default("now()"),
});


export const module = pgTable("module", {
    id: serial("id").primaryKey(),
    courseId: integer("course_id").notNull().references(() => course.id , {
        onDelete: "cascade",
        onUpdate: "cascade"
    }),
    title: text("title").notNull(),
    description: text("description").notNull(),
    createdAt: text("created_at").notNull().default("now()"),
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
export const chatMessageSessionRelation = relations(chat_message, ({ one }) => ({
    session: one(chat_session, {
        fields: [chat_message.sessionId],
        references: [chat_session.id],
    }),
}));


