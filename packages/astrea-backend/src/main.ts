import express from "express";
import mongoose from "mongoose";
import authRoutes from './routes/auth.routes';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose
  .connect(MONGO_URI!, {
    dbName: "astrea",
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error", err));

app.use(cookieParser());
app.use(express.json());
app.use((req, _, next) => {
  console.log(req.method, req.url);
  next();
});
// Global API prefix
app.use('/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
