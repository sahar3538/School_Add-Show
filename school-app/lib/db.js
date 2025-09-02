import mysql from "mysql2/promise";

export async function connectDB() {
  const connection = await mysql.createConnection({
    host: "localhost",    // change if needed
    user: "root",         // your MySQL username
    password: "sahar",         // your MySQL password
    database: "p1", // database you created
  });
  return connection;
}
