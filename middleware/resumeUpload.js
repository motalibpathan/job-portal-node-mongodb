const multer = require("multer");
const uploader = require("../utils/singleUploader");

function resumeUpload(req, res, next) {
  const upload = uploader(
    "resumes",
    ["application/pdf"],
    1000000,
    "Only .pdf format allowed!"
  );

  upload.any()(req, res, (err) => {
    if (err) {
      res.status(500).json({
        status: "failed",
        error: "Something went wrong, while uploading",
      });
    } else {
      next();
    }
  });
}

module.exports = resumeUpload;
