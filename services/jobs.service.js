const Job = require("../model/Job");
const Application = require("../model/Application");

exports.getJobsService = async (filters, queries) => {
  const jobs = await Job.find(filters).sort(queries.sortBy);
  return jobs;
};
exports.getJobDetailsByIdService = async (id) => {
  const job = await Job.findById(id).populate("hiringManager", "-password");
  return job;
};
exports.createJobService = async (data) => {
  const job = await Job.create(data);
  return job;
};

exports.updateJobService = async (id, data) => {
  const result = await Job.updateOne({ _id: id }, data, {
    runValidators: true,
  });
  return result;
};

exports.getApplicationByIdService = async (jobId) => {
  const application = await Application.findById(jobId);
  return application;
};

exports.findApplicationService = async (jobId, userId) => {
  const result = await Application.findOne({
    candidate: userId,
    jobId,
  });
  return result;
};

exports.applyJobService = async (jobId, user, resumeLink) => {
  const result = await Application.create({
    candidate: user.id,
    jobId,
    resumeLink,
  });
  const job = await Job.findOneAndUpdate(
    { _id: jobId },
    { $push: { applications: result._id } },
    { new: true }
  );
  console.log("Printing updated job");
  console.log(job);
  return result;
};
