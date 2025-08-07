import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

const client = postgres(process.env.DATABASE_URL!, {
    max: 1, 
    idle_timeout: 10000, 
    ssl: {
        rejectUnauthorized: false, 
    },
});

export const db = drizzle({ client });
