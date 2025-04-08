import express from "express";
import mongoose from "mongoose";
import todoRoutes from "./routes/todo.routes";

const app = express();
const PORT = process.env.PORT;
const MONGO_URI = "mongodb://localhost:27017/todo-app";

// Connect to MongoDB
mongoose
  .connect(MONGO_URI, {
    dbName: "todo-app",
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error", err));

app.use(express.json());

// Global API prefix
app.use("/api/todos", todoRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}/api/todos`);
});
