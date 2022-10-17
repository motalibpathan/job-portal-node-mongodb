const { createJobService } = require("../services/jobs.service");

exports.createJob = async (req, res, next) => {
  try {
    // save or create
    const result = await createJobService(req.body);
    res.status(200).json({
      status: "success",
      messgae: "Data inserted successfully!",
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
