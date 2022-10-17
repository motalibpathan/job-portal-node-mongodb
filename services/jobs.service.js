const Job = require("../model/Job");
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
