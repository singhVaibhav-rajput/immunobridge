const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const childRoutes = require("./routes/childRoutes");

const app = express();


require("dotenv").config();



// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/child", childRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("ImmunoBridge API Running 🚀");
});

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.log(err));

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});