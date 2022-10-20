const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

const applicationSchema = mongoose.Schema(
  {
    candidate: {
      type: ObjectId,
      ref: "User",
    },
    jobId: {
      type: ObjectId,
      ref: "User",
    },
    resumeLink: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "selected", "not-selected"],
      default: "pending",
    },
    applyDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Application = mongoose.model("Application", applicationSchema);

module.exports = Application;
