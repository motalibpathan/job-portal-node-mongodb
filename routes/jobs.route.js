const express = require("express");
const router = express.Router();
const jobsController = require("../controllers/jobs.controller");
const verifyToken = require("../middleware/verifyToken");

router.route("/").post(
  // verifyToken,
  // authorization("admin", "hiring-manager"),
  jobsController.createJob
);

router.route("/:id").patch(jobsController.updateJob);

// router
//   .route("/:id")
//   .patch(productController.updateProductById)
//   .delete(productController.deleteProductById);

module.exports = router;
