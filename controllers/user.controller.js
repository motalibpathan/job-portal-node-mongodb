const {
  signupService,
  findUserByEmailService,
} = require("../services/user.service");

const { generateToken } = require("../utils/token");

exports.signup = async (req, res) => {
  try {
    const exists = await findUserByEmailService(req.body.email);
    if (exists) {
      return res
        .status(500)
        .json({ status: "failed", error: "User already exists" });
    }
    const user = await signupService(req.body);
    const { password: pwd, ...others } = user.toObject();
    res.status(200).json({
      status: "success",
      message: "Successfully sign up",
      user: others,
    });
  } catch (error) {
    res.status(500).json({ status: "failed", error });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(401)
        .json({ status: "failed", error: "Please provide your credentials." });
    }
    const user = await findUserByEmailService(email);

    if (!user) {
      return res.status(401).json({
        status: "failed",
        error: "No user found please create an account",
      });
    }

    const isPasswordValid = user.comparePassword(password, user.password);

    if (!isPasswordValid) {
      return res.status(403).json({
        status: "failed",
        error: "Password is not correct",
      });
    }

    if (user.status !== "active") {
      return res.status(403).json({
        status: "failed",
        error: "Your account is not active yet.",
      });
    }

    const token = generateToken(user);

    const { password: pwd, ...others } = user.toObject();
    res.status(200).json({
      status: "success",
      message: "Successfully logged in.",
      data: {
        user: others,
        token,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "failed", error });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await findUserByEmailService(req.user?.email);
    const { password: pwd, ...others } = user.toObject();
    res.status(200).json({ status: "success", data: others });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "failed", error });
  }
};
