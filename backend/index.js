import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to mongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

// to make input as json
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  "https://goodnotesbysachin.vercel.app",
  "https://www.goodnotesbysachin.vercel.app",
  "https://good-notes-git-main-sachinalam.vercel.app",
  "https://www.good-notes-git-main-sachinalam.vercel.app",
  "https://good-notes-bqidar9tt-sachinalam.vercel.app",
  "https://www.good-notes-bqidar9tt-sachinalam.vercel.app"
].split(",");

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allows cookies and authorization headers
  })
);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

// import routes
import authRouter from "./routes/auth.route.js";
import noteRouter from "./routes/note.route.js";

app.use("/api/auth", authRouter);
app.use("/api/note", noteRouter);

// error handling
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Serer Error";

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
