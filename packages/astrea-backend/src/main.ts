import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.routes";
import cookieParser from "cookie-parser";
import { PORT, MONGO_URI } from "./utils/env.ts";
import logger from "./middleware/logger.ts";
import topicRoutes from "./routes/topic.routes.ts";
import goalRoutes from "./routes/goal.routes.ts";
import taskRoutes from "./routes/task.routes.ts";
import shopRoutes from "./routes/shop.routes.ts";
import customRewardRoutes from "./routes/custom-reward.routes.ts";
import cors from "cors";

const frontendOrigins = [
  process.env.FRONTEND_ORIGIN,
  process.env.FRONTEND_ORIGINS?.split(",").map((origin) => origin.trim()),
  ["http://localhost:3000"],
]
  .flat()
  .filter(Boolean);

const allowedOrigins = new Set(frontendOrigins);

const getMongoTarget = (uri: string) => {
  try {
    const parsed = new URL(uri);
    return `${parsed.protocol}//${parsed.host}${parsed.pathname}`;
  } catch {
    return uri;
  }
};

const app = express();

// Connect to MongoDB
mongoose
  .connect(MONGO_URI, {
    dbName: "astrea",
  })
  .then(() => console.log("✅  MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error", err));

app.use(cookieParser());
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.has(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error(`Origin not allowed: ${origin}`));
    },
    credentials: true,
  }),
);
app.use(express.json());
app.use(logger);

console.log(
  `✅ Backend starting on port ${PORT} with MongoDB ${getMongoTarget(MONGO_URI)}`,
);

// Global API prefix
app.use("/api/auth", authRoutes);
app.use("/api/topics", topicRoutes);
app.use("/api/goals", goalRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/shop", shopRoutes);
app.use("/api/custom-rewards", customRewardRoutes);

app.listen(PORT, () => {
  console.log(`✅  Server running on http://localhost:${PORT}`);
});
