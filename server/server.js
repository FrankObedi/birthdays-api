const express = require("express");
const port = 5000;
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "DELETE"],
  })
);

// MongoDB connection
mongoose.connect(process.env.DB_URL);
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connected to database"));

app.use(express.json());

// setup api routes
const apiRoutes = require("./routes/users");
app.use("/api/users", apiRoutes);
app.listen(port, () => console.log(`app listening on port ${port}`));
