const Job = require("../model/Job");
exports.createJobService = async (data) => {
  const job = await Job.create(data);
  return job;
};
