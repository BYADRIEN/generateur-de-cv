import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./auth-schema.ts",
  out: "./drizzle-local",
  dialect: "sqlite",
  dbCredentials: {
    url: "./sqlite.db",
  },
});