const multer = require("multer");
const path = require("path");

function uploader(subfolderPath, allowFileTypes, maxFileSize, errorMsg) {
  const storage = multer.diskStorage({
    destination: `uploads/${subfolderPath}`,
    filename: (req, file, cb) => {
      const fileExt = path.extname(file.originalname);
      const fileName =
        file.originalname
          .replace(fileExt, "")
          .toLowerCase()
          .split(" ")
          .join("-") +
        "-" +
        Date.now();
      cb(null, fileName + fileExt);
    },
  });

  const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
      if (allowFileTypes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error(errorMsg));
      }
    },
    limits: {
      fileSize: maxFileSize,
    },
  });

  return upload;
}

module.exports = uploader;
