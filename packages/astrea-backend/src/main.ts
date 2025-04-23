import express from "express";
import mongoose from "mongoose";
import authRoutes from './routes/auth.routes';
import cookieParser from 'cookie-parser';
import {PORT, MONGO_URI} from "./utils/env.ts";


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
app.use((req, res, next) => {
    // Log the request method and URL before processing
    console.log(`${req.method} ${req.originalUrl} - Request received`);

    // Set up logging after the response is finished
    res.on("finish", () => {
        console.log(`${req.method} ${req.originalUrl} - Status: ${res.statusCode}`);
    });

    next();
});

// Global API prefix
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
