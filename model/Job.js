const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Types;

const jobSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Job title is required"],
    },
    description: {
      type: String,
      required: [true, "Job description is required"],
    },
    jobCategory: {
      type: String,
      required: [true, "Job category is required"],
    },
    jobLocation: {
      type: String,
      required: [true, "Job location is required"],
    },
    jobType: {
      type: String,
      required: [true, "Job type is required"],
      enum: ["full-time", "part-time", "remote"],
      default: "full-time",
    },
    jobSalary: {
      type: String,
      required: [true, "Job Salary is required"],
    },
    jobPostingDate: {
      type: Date,
      default: Date.now,
    },
    jobDeadline: {
      type: Date,
      required: [true, "Job Deadline is required"],
    },
    numberOfVacancy: {
      type: Number,
      required: [true, "Number of Vacancy is required"],
    },
    jobStatus: {
      type: String,
      enum: ["open", "closed"],
      default: "open",
    },
    postedBy: {
      type: ObjectId,
      ref: "User",
    },
    applications: [{ type: ObjectId, ref: "User" }],
    resumes: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
