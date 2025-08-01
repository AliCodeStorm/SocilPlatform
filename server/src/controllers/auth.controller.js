const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  statusCodes,
  cookieOptions,
  secretKey,
  nodeEnv,
  tokenExpiration,
  refreshsecretKey,
  refreshExpiration,
} = require("../config/constants");

//create a new user
const registerUser = asyncHandler(async (req, res) => {
  const { name, username, email, password } = req.body;

  if (!name || !username || !email || !password) {
    throw new ApiError(statusCodes.bad_request, "All fieldss are required");
  }

  const specialCharRegex = /[!@#$%^&*_.\-]/;
  if (!specialCharRegex.test(username)) {
    throw new ApiError(
      statusCodes.bad_request,
      "Username must be unique and contain at least one special character (e.g. _ . - @)"
    );
  }

  const existingUser = await User.findOne({ email });
  const existingUsername = await User.findOne({ username });

  if (existingUsername) {
    throw new ApiError(
      statusCodes.conflict,
      "Username already exists. Please choose a different one"
    );
  }
  if (existingUser) {
    throw new ApiError(
      statusCodes.conflict,
      "User with this email already exists"
    );
  }

  userData = new User({
    name,
    username,
    email,
    password,
  });

  await userData.save();

  const cleanUser = await User.findById(userData._id).select("-password");

  return res
    .status(201)
    .json(
      new ApiResponse(
        statusCodes.created,
        cleanUser,
        "User registered successfully"
      )
    );
});

//login existing user
const loginUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;

  if ((!email && !username) || !password) {
    throw new ApiError(
      statusCodes.bad_request,
      "Please provide either email or username and password"
    );
  }

  // Find user by email or username
  const user = await User.findOne({
    $or: [{ email }, { username: email }],
  });

  if (!user) {
    throw new ApiError(
      statusCodes.not_found,
      "User not found with provided email or username"
    );
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw new ApiError(statusCodes.unauthorized, "Invalid email or password");
  }

  const token = jwt.sign({ userId: user._id }, secretKey, {
    expiresIn: tokenExpiration,
  });

  const refreshToken = jwt.sign({ userId: user._id }, refreshsecretKey, {
    expiresIn: refreshExpiration,
  });

  user.refreshToken = refreshToken;
  await user.save();
  res.cookie("token", token, cookieOptions);
  res.cookie("refreshToken", refreshToken, cookieOptions);

  return res
    .status(statusCodes.success)
    .json(
      new ApiResponse(
        statusCodes.success,
        { token, refreshToken },
        "User logged in successfully"
      )
    );
});

//logout login user
const logoutUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.userId).select("-password");

  if (!req.user || !req.user.userId) {
    throw new ApiError(statusCodes.unauthorized, "User not authenticated");
  }

  if (user) {
    user.refreshToken = null;
    await user.save();
  }

  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "Strict",
    secure: nodeEnv === "production",
  });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    sameSite: "Strict",
    secure: nodeEnv === "production",
  });

  return res
    .status(statusCodes.success)
    .json(
      new ApiResponse(statusCodes.success, null, "User logout successfully")
    );
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    throw new ApiError(
      statusCodes.unauthorized,
      "Access Denied. No token provided."
    );
  }

  const user = await User.findOne({ refreshToken });

  if (!user) {
    throw new ApiError(statusCodes.unauthorized, "Invalid refresh token.");
  }

  const decoded = jwt.verify(refreshToken, refreshsecretKey);

  const newAccessToken = jwt.sign({ userId: decoded.userId }, secretKey, {
    expiresIn: tokenExpiration,
  });

  const newRefreshToken = jwt.sign(
    { userId: decoded.userId },
    refreshsecretKey,
    { expiresIn: refreshExpiration }
  );

  user.refreshToken = newRefreshToken;
  await user.save();

  res.cookie("token", newAccessToken, cookieOptions);
  res.cookie("refreshToken", newRefreshToken, cookieOptions);

  return res.status(statusCodes.success).json(
    new ApiResponse(
      statusCodes.success,
      {
        newToken: newAccessToken,
        newrefreshtoken: newRefreshToken,
      },
      "Access token refreshed successfully"
    )
  );
});

const CheckAuth=(req, res) => {
  res.json({ user: { id: req.user.userId } });
}

module.exports = {
  logoutUser,
  registerUser,
  loginUser,
  refreshAccessToken,
  CheckAuth
};
