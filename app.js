const express = require("express");
const app = express();
const cors = require("cors");

//middlewares
app.use(express.json());
app.use(cors());

//routes
const jobRoute = require("./routes/jobs.route");
const managerRoute = require("./routes/manager.route");

app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});

app.use("/api/v1/job", jobRoute);
app.use("/api/v1/manager", managerRoute);

module.exports = app;
