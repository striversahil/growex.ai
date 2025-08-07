import { pgTable , serial , text , integer } from "drizzle-orm/pg-core"


export const user = pgTable("users", {
    id: serial("id").primaryKey(),
    email: text("email").notNull().unique(),
    name: text("name").notNull(),
    age: integer("age").notNull().default(0),
});



