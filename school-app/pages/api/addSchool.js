import formidable from "formidable";
import { v2 as cloudinary } from "cloudinary";
import { connectDB } from "@/lib/db";
import fs from "fs";

// Disable default body parsing for file upload
export const config = { api: { bodyParser: false } };

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  // Create formidable instance
  const form = formidable({
    multiples: false,
    keepExtensions: true,
  });

  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: "Form parsing error" });

    // Handle arrays from FormData
    const name = Array.isArray(fields.name) ? fields.name[0] : fields.name;
    const address = Array.isArray(fields.address) ? fields.address[0] : fields.address;
    const city = Array.isArray(fields.city) ? fields.city[0] : fields.city;
    const state = Array.isArray(fields.state) ? fields.state[0] : fields.state;
    const contact = Array.isArray(fields.contact) ? fields.contact[0] : fields.contact;
    const email_id = Array.isArray(fields.email_id) ? fields.email_id[0] : fields.email_id;

    if (!name || !address || !city || !state || !contact || !email_id)
      return res.status(400).json({ error: "All fields are required" });

    const contactNumber = parseInt(contact, 10);
    if (isNaN(contactNumber)) return res.status(400).json({ error: "Invalid contact number" });

    if (!files.image) return res.status(400).json({ error: "Image is required" });

    try {
      const uploadedFile = Array.isArray(files.image) ? files.image[0] : files.image;

      // Upload image to Cloudinary
      const result = await cloudinary.uploader.upload(uploadedFile.filepath, { folder: "schools" });
      const imageUrl = result.secure_url;

      // Store in Railway MySQL
      const db = await connectDB();
      await db.execute(
        "INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [name, address, city, state, contactNumber, imageUrl, email_id]
      );
      await db.end();

      // Delete temporary file
      if (fs.existsSync(uploadedFile.filepath)) fs.unlinkSync(uploadedFile.filepath);

      res.status(200).json({ message: "School added successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  });
}
