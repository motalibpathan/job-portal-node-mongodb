const fs = require("fs");
const {
  createJobService,
  updateJobService,
  getJobsService,
  getJobDetailsByIdService,
  findApplicationService,
  applyJobService,
} = require("../services/jobs.service");
const removeFile = require("../utils/removeFile");

exports.getJobs = async (req, res, next) => {
  try {
    let queryObject = { ...req.query };

    const excludeFields = ["sort", "location", "type"];
    excludeFields.forEach((field) => delete queryObject[field]);

    let queryString = JSON.stringify(queryObject);
    queryString = queryString.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (match) => `$${match}`
    );

    queryObject = JSON.parse(queryString);

    let filters = {};
    let queries = {};

    if (queryObject.salary) {
      filters.salary = queryObject.salary;
    }
    if (req.query.location) {
      filters.location = new RegExp(req.query.location, "i");
    }
    if (req.query.type) {
      filters.type = new RegExp(req.query.type, "i");
    }

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      queries.sortBy = sortBy;
    }

    const result = await getJobsService(filters, queries);

    res.status(200).json({
      status: "success",
      message: "Data get successfully!",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Failed to get data!",
      error: error.message,
    });
  }
};

exports.getJobDetailsById = async (req, res, next) => {
  try {
    const result = await getJobDetailsByIdService(req.params.id);
    res.status(200).json({
      status: "success",
      message: "Data get successfully!",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Failed to get data!",
      error: error.message,
    });
  }
};

exports.createJob = async (req, res, next) => {
  try {
    const jobDetails = { ...req.body, hiringManager: req.user.id };
    const result = await createJobService(jobDetails);
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

exports.applyJob = async (req, res, next) => {
  try {
    const job = await getJobDetailsByIdService(req.params.id);

    if (new Date() > new Date(job.deadline)) {
      if (req.files) {
        removeFile(req.files[0].path);
      }
      return res.status(400).json({
        status: "failed",
        error: "Application deadline over",
      });
    }
    const isAlreadyApplied = await findApplicationService(
      req.params.id,
      req.user.id
    );

    if (isAlreadyApplied) {
      if (req.files) {
        removeFile(req.files[0].path);
      }
      return res.status(400).json({
        status: "failed",
        message: "Already applied in this job!",
      });
    }

    const resumeLink = `${req.files[0].destination}/${req.files[0].filename}`;

    const result = await applyJobService(req.params.id, req.user, resumeLink);

    res.status(200).json({
      status: "success",
      message: "Successfully applied!",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Failed to apply job",
      error: error.message,
    });
  }
};
