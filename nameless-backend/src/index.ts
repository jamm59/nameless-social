import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

// import multer from "multer";
// import path from "path";
// import { pool } from "./db";
import authRoutes from "./auth";

const app = express();
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser()); // ✅ Add t
app.use("/api", authRoutes);

const PORT: number = Number(process.env.PORT) || 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

// Serve static files for local image/video storage
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// Multer for file uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, "uploads/"),
//   filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
// });
// const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } }); // 5MB limit
