const {
  getManagerPostedJobsService,
  getManagerJobDetailsByIdService,
} = require("../services/manager.service");

module.exports.getManagerPostedJobs = async (req, res) => {
  try {
    const result = await getManagerPostedJobsService(req.user.id);
    console.log(result);
    res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "failed",
      error: "Couldn't get the jobs",
    });
  }
};
module.exports.getManagerJobDetailsById = async (req, res) => {
  try {
    const result = await getManagerJobDetailsByIdService(req.params.id);
    console.log(result);
    res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "failed",
      error: "Couldn't get the job details",
    });
  }
};
