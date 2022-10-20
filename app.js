const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

//middlewares
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//routes
const jobRoute = require("./routes/jobs.route");
const managerRoute = require("./routes/manager.route");
const userRoute = require("./routes/user.route");

app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});

app.use("/api/v1/jobs", jobRoute);
app.use("/api/v1/manager", managerRoute);
app.use("/api/v1/user", userRoute);

module.exports = app;
