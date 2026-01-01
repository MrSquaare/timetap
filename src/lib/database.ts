import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite";

import migrations from "../../drizzle/migrations";

export const database = drizzle(openDatabaseSync("db.db"));
export { migrations };
