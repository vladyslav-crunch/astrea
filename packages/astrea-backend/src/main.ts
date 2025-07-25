import express from "express";
import mongoose from "mongoose";
import authRoutes from './routes/auth.routes';
import cookieParser from 'cookie-parser';
import {PORT, MONGO_URI} from "./utils/env.ts";
import logger from "./middleware/logger.ts";
import topicRoutes from "./routes/topic.routes.ts";
import goalRoutes from "./routes/goal.routes.ts";
import taskRoutes from "./routes/task.routes.ts";

const app = express();

// Connect to MongoDB
mongoose
    .connect(MONGO_URI, {
        dbName: "astrea",
    })
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => console.error("❌ MongoDB connection error", err));

app.use(cookieParser());
app.use(express.json());
app.use(logger);

// Global API prefix
app.use('/api/auth', authRoutes);
app.use('/api/topics-preview', topicRoutes);
app.use('/api/goals', goalRoutes);
app.use('/api/tasks', taskRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
