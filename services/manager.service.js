const Job = require("../model/Job");

module.exports.getManagerPostedJobsService = async (managerId) => {
  const result = await Job.find({ postedBy: managerId });
  console.log(result);
  return result;
};

module.exports.getJobDetailsByIdService = async (managerId) => {
  const result = await Job.find({ postedBy: managerId });
  console.log(result);
  return result;
};
