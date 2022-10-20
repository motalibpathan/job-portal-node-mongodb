const Job = require("../model/Job");

module.exports.getManagerPostedJobsService = async (managerId) => {
  const result = await Job.find({ hiringManager: managerId });
  console.log(result);
  return result;
};

module.exports.getManagerJobDetailsByIdService = async (jobId) => {
  const result = await Job.findById(jobId).populate({
    path: "applications",
    populate: {
      path: "candidate",
      model: "User",
      select: "-password",
    },
    select: "candidate resumeLink status applyDate -_id",
  });
  return result;
};
