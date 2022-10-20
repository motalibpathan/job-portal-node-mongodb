const express = require("express");
const router = express.Router();
const managerController = require("../controllers/manager.controller");
const verifyToken = require("../middleware/verifyToken");
const authorization = require("../middleware/authorization");

router
  .route("/jobs")
  .get(
    verifyToken,
    authorization("admin", "hiring-manager"),
    managerController.getManagerPostedJobs
  );

router
  .route("/jobs/:id")
  .get(
    verifyToken,
    authorization("admin", "hiring-manager"),
    managerController.getManagerJobDetailsById
  );

module.exports = router;
