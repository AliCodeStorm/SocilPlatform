const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
    Messages,
    statusCodes,
    cookieOptions
} = require("../config/constants");
const {
    secretKey,
    nodeEnv,
    tokenExpiration,
    refreshsecretKey,
    refreshExpiration
} = require("../config/config");

const registerUser = asyncHandler(async (req, res) => {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {

        throw new ApiError(
            statusCodes.bad_request,
            Messages.require_user_details
        );

    };

    const existingUser = await User.findOne({ email });

    if (existingUser) {

        throw new ApiError(
            statusCodes.conflict,
            Messages.exist_email
        );

    };

    userData = new User({
        name,
        email,
        password
    });

    await userData.save();

    const cleanUser = await User.findById(userData._id).select("-password");

    return res
        .status(201)
        .json(

            new ApiResponse(
                statusCodes.created,
                cleanUser,
                Messages.user_registered_success
            )

        );

});

const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {

        throw new ApiError(
            statusCodes.bad_request,
            Messages.require_user_details
        );

    };

    const user = await User.findOne({ email })

    if (!user) {

        throw new ApiError(
            statusCodes.not_found,
            Messages.email_not_found
        );

    };

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {

        throw new ApiError(
            statusCodes.unauthorized,
            Messages.invalid_credentials
        );

    };

    const token = jwt.sign(
        { userId: user._id },
        secretKey,
        { expiresIn: tokenExpiration }
    );

    const refreshToken = jwt.sign(
        { userId: user._id },
        refreshsecretKey,
        { expiresIn: refreshExpiration }
    );

    user.refreshToken = refreshToken;
    await user.save();

    const userData = {
        id: user._id,
        name: user.name,
        email: user.email
    };

    res.cookie(
        'token',
        token,
        cookieOptions
    );
    res.cookie(
        'refreshToken',
        refreshToken,
        cookieOptions
    );

    return res
        .status(statusCodes.success)
        .json(
            new ApiResponse(
                statusCodes.success,
                { user: userData, token, refreshToken },
                Messages.user_logged_in_success
            )
        );

});

const logoutUser = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user.userId).select("-password");

    if (!req.user || !req.user.userId) {
        throw new ApiError(
            statusCodes.unauthorized,
            'User not authenticated'
        );
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
        .json({
            status: statusCodes.success,
            message: Messages.user_loggedout_in_success
        });
});

const refreshAccessToken = asyncHandler(async (req, res) => {

    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        throw new ApiError(

            statusCodes.unauthorized,
            Messages.no_token_provided
        );

    };

    const user = await User.findOne({ refreshToken });

    if (!user) {

        throw new ApiError(
            statusCodes.unauthorized,
            "Invalid refresh token."
        );

    };

    const decoded = jwt.verify(refreshToken, refreshsecretKey);

    const newAccessToken = jwt.sign(

        { userId: decoded.userId },
        secretKey,
        { expiresIn: tokenExpiration }

    );

    const newRefreshToken = jwt.sign(

        { userId: decoded.userId },
        refreshsecretKey,
        { expiresIn: refreshExpiration }

    );

    user.refreshToken = newRefreshToken;
    await user.save();

    res.cookie(

        'token',
        newAccessToken,
        cookieOptions

    );
    res.cookie(

        'refreshToken',
        newRefreshToken,
        cookieOptions

    );

    return res
        .status(statusCodes.success).
        json(
            new ApiResponse(

                statusCodes.success,
                {
                    newToken: newAccessToken,
                    newrefreshtoken: newRefreshToken,
                },
                Messages.refresh_token_success

            )

        );
});

module.exports = {
    logoutUser,
    registerUser,
    loginUser,
    refreshAccessToken
};