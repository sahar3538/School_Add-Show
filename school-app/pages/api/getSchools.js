import { connectDB } from "@/lib/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const db = await connectDB();
      const [rows] = await db.execute("SELECT id, name, address, city, image FROM schools");
      db.end();
      res.status(200).json(rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
