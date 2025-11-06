require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

//API routes
const authRoutes = require("./routes/auth");
const eventRoutes = require("./routes/events");
const swapRequestRoutes = require("./routes/swapRequests");

const app = express();

//middleware - CORS allow frontend to access backend
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? process.env.FRONTEND_URL
        : "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/swaprequests", swapRequestRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  });
});

// ========== DATABASE CONNECTION ==========
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");
    console.log(`📊 Database: ${mongoose.connection.name}`);
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1);
  });

// ========== SERVE FRONTEND IN PRODUCTION ==========
if (process.env.NODE_ENV === "production") {
  // Serve static files from React build folder
  const buildPath = path.join(__dirname, "../frontend/build");
  app.use(express.static(buildPath));

  // Serve index.html for any non-API routes
  app.get("*", (req, res) => {
    res.sendFile(path.join(buildPath, "index.html"));
  });
}

// ========== ERROR HANDLING ==========
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.stack);
  res.status(500).json({
    error: "Something went wrong!",
    message: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// 404 handler for API routes
app.use("/api", (req, res) => {
  res.status(404).json({ error: "API route not found" });
});

// ========== START SERVER ==========
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`📡 API available at http://localhost:${PORT}/api`);
});

module.exports = app;
