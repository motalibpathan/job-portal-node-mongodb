const mongoose = require("mongoose");
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
    category: {
      type: String,
      required: [true, "Job category is required"],
    },
    location: {
      type: String,
      required: [true, "Job location is required"],
    },
    type: {
      type: String,
      required: [true, "Job type is required"],
      enum: ["full-time", "part-time", "intern"],
      default: "full-time",
    },
    salary: {
      type: Number,
      required: [true, "Job Salary is required"],
    },
    postingDate: {
      type: Date,
      default: Date.now,
    },
    deadline: {
      type: Date,
      required: [true, "Job Deadline is required"],
    },
    numberOfVacancy: {
      type: Number,
      required: [true, "Number of Vacancy is required"],
    },
    status: {
      type: String,
      enum: ["open", "closed"],
      default: "open",
    },
    hiringManager: {
      type: ObjectId,
      ref: "User",
    },
    applications: [{ type: ObjectId, ref: "Application" }],
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
