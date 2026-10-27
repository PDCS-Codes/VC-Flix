
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "VC Flix API is running! 🍿",
    database:
      mongoose.connection.readyState === 1 ? "connected" : "disconnected",
  });
});

async function startServer() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is missing from the .env file");
    }

    await mongoose.connect(process.env.MONGODB_URI);

    console.log("🍿 MongoDB connected successfully!");

    app.listen(PORT, () => {
      console.log(`VC Flix API running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start VC Flix:", error.message);
    process.exit(1);
  }
}

startServer();
