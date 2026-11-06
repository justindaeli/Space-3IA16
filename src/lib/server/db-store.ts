import fs from "node:fs";
import path from "node:path";
import { generateSeedData, type DatabaseSchema } from "./db-seed";

const DATA_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "db.json");

let memoryCache: DatabaseSchema | null = null;

function ensureDataFile(): DatabaseSchema {
  if (memoryCache) return memoryCache;

  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    if (fs.existsSync(DB_FILE)) {
      const content = fs.readFileSync(DB_FILE, "utf8");
      memoryCache = JSON.parse(content) as DatabaseSchema;
      return memoryCache;
    }
  } catch {
    // fallback to seed
  }

  const seed = generateSeedData();
  saveDatabase(seed);
  memoryCache = seed;
  return seed;
}

export function getDatabase(): DatabaseSchema {
  return ensureDataFile();
}

export function saveDatabase(data: DatabaseSchema): void {
  memoryCache = data;
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    const tempFile = `${DB_FILE}.tmp`;
    fs.writeFileSync(tempFile, JSON.stringify(data, null, 2), "utf8");
    fs.renameSync(tempFile, DB_FILE);
  } catch (err) {
    console.error("Failed to persist database to file:", err);
  }
}

