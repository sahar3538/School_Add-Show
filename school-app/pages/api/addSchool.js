import formidable from "formidable";
import fs from "fs";
import path from "path";
import { connectDB } from "@/lib/db";

export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const uploadDir = path.join(process.cwd(), "public/schoolImages");
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

  const form = formidable({
    uploadDir,
    keepExtensions: true,
    multiples: false,
    filename: (name, ext, part) => Date.now() + "-" + part.originalFilename,
  });

  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: "File upload error" });
    if (!files.image) return res.status(400).json({ error: "No image uploaded" });

    // Extract single file
    const uploadedFile = Array.isArray(files.image) ? files.image[0] : files.image;

    // Extract single values from arrays
    const name = Array.isArray(fields.name) ? fields.name[0] : fields.name;
    const address = Array.isArray(fields.address) ? fields.address[0] : fields.address;
    const city = Array.isArray(fields.city) ? fields.city[0] : fields.city;
    const state = Array.isArray(fields.state) ? fields.state[0] : fields.state;
    const contact = Array.isArray(fields.contact) ? fields.contact[0] : fields.contact;
    const email_id = Array.isArray(fields.email_id) ? fields.email_id[0] : fields.email_id;

    if (!name || !address || !city || !state || !contact || !email_id) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const imagePath = "/schoolImages/" + path.basename(uploadedFile.filepath);

    try {
      const db = await connectDB();
      await db.execute(
        "INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [name, address, city, state, contact, imagePath, email_id]
      );
      await db.end();
      res.status(200).json({ message: "School added successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
}
