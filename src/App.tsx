
import { useEffect, useState } from "react";

import {
  initializeDatabase,
  createConversation,
  getConversations,
  type Conversation,
} from "./lib/database";

export default function App() {
  const [conversations, setConversations] =
    useState<Conversation[]>([]);

  const [error, setError] = useState("");

  async function refresh() {
    const rows = await getConversations();
    setConversations(rows);
  }

  useEffect(() => {
    async function start() {
      try {
        await initializeDatabase();
        await refresh();
      } catch (err) {
        setError(String(err));
      }
    }

    start();
  }, []);

  async function addConversation() {
    try {
      await createConversation("Nouvelle conversation");
      await refresh();
    } catch (err) {
      setError(String(err));
    }
  }

  return (
    <main>
      <h1>Local Agent</h1>

      <button onClick={addConversation}>
        Créer une conversation
      </button>

      {error && <p role="alert">{error}</p>}

      {conversations.map((conversation) => (
        <p key={conversation.id}>
          {conversation.id} — {conversation.title}
        </p>
      ))}
    </main>
  );
}
