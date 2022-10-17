const {
  createJobService,
  updateJobService,
} = require("../services/jobs.service");

exports.createJob = async (req, res, next) => {
  try {
    // save or create
    const result = await createJobService(req.body);
    res.status(200).json({
      status: "success",
      message: "Data inserted successfully!",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: " Data is not inserted ",
      error: error.message,
    });
  }
};

exports.updateJob = async (req, res, next) => {
  try {
    // save or create
    const result = await updateJobService(req.params.id, req.body);
    if (result.modifiedCount > 0) {
      res.status(200).json({
        status: "success",
        message: "Data updated successfully!",
        data: result,
      });
    } else {
      res.status(400).json({
        status: "fail",
        message: "Data is not updated ",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: " Data is not updated ",
      error: error.message,
    });
  }
};
