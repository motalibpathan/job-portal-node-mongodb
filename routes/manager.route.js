const express = require("express");
const router = express.Router();
const managerController = require("../controllers/manager.controller");
const verifyToken = require("../middleware/verifyToken");

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
    managerController.getJobDetailsById
  );

// router
//   .route("/:id")
//   .patch(productController.updateProductById)
//   .delete(productController.deleteProductById);

module.exports = router;
