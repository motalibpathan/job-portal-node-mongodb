const fs = require("fs");

const removeFile = (filePath) => {
  fs.unlinkSync(filePath);
};
module.exports = removeFile;
