const multer = require("multer");

function uploader(subfolderPath, allowFileTypes, maxFileSize, errorMsg) {
  const storage = multer.diskStorage({
    destination: `uploads/${subfolderPath}`,
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + "-" + file.originalname);
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
