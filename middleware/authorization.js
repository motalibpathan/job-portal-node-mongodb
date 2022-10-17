module.exports = function authorization(...role) {
  return function (req, res, next) {
    const userRole = req.user.role;
    if (!role.includes(userRole)) {
      return res.status(403).json({
        status: "failed",
        error: "Your are not authorized to access this",
      });
    }
    next();
  };
};
