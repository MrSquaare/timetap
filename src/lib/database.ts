import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite";

import migrations from "../../drizzle/migrations";

export const sqliteDatabase = openDatabaseSync("db.db");

sqliteDatabase.execSync("PRAGMA foreign_keys = ON");

export const database = drizzle(sqliteDatabase);
export { migrations };
