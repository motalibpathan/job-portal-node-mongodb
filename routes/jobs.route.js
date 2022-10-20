const express = require("express");
const router = express.Router();
const jobsController = require("../controllers/jobs.controller");
const authorization = require("../middleware/authorization");
const verifyToken = require("../middleware/verifyToken");
const resumeUpload = require("../middleware/resumeUpload");

router
  .route("/")
  .get(jobsController.getJobs)
  .post(
    verifyToken,
    authorization("admin", "hiring-manager"),
    jobsController.createJob
  );

router
  .route("/:id")
  .get(jobsController.getJobDetailsById)
  .patch(jobsController.updateJob);

router
  .route("/:id/apply")
  .post(verifyToken, resumeUpload, jobsController.applyJob);

module.exports = router;
