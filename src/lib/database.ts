
import Database from "@tauri-apps/plugin-sql";

export interface Conversation {
  id: number;
  title: string;
  created_at: string;
}

let database: Database | null = null;

export async function getDatabase(): Promise<Database> {
  if (!database) {
    database = await Database.load("sqlite:local-agent.db");
  }

  return database;
}

// Création de la table (exemple simple)
export async function initializeDatabase(): Promise<void> {
  const db = await getDatabase();

  await db.execute(`
    CREATE TABLE IF NOT EXISTS conversations (
      id INTEGER PRIMARY KEY,
      title TEXT NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

// INSERT
export async function createConversation(
  title: string
): Promise<number> {
  const db = await getDatabase();

  const result = await db.execute(
    "INSERT INTO conversations (title) VALUES ($1)",
    [title]
  );
    if (result.lastInsertId === undefined) {
        throw new Error("Impossible de récupérer l'ID de la conversation créée.");
    }
    return result.lastInsertId;
}

// SELECT
export async function getConversations(): Promise<Conversation[]> {
  const db = await getDatabase();

  return db.select<Conversation[]>(
    "SELECT * FROM conversations ORDER BY id DESC"
  );
}

// DELETE
export async function deleteConversation(
  id: number
): Promise<void> {
  const db = await getDatabase();

  await db.execute(
    "DELETE FROM conversations WHERE id = $1",
    [id]
  );
}
