const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const User = require("../models/user.model");
const {
    statusCodes
} = require("../config/constants");

//fetch user profile
const GetUserProfile = asyncHandler(async (req, res) => {

    const userId = req.user.userId;

    const user = await User.findById(userId).select("-password -refreshToken");

    if (!user) {

        throw new ApiError(
            statusCodes.not_found,
            "User not found"
        );

    };

    return res
        .status(statusCodes.success)
        .json(
            new ApiResponse(
                statusCodes.success,
                user,
                "User details fetched successfully",
            )
        );

});

const updateUserProfileEmail = asyncHandler(async (req, res) => {

    const { email } = req.body;

    if (!email) {
        throw new ApiError(
            statusCodes.not_found,
            "Email is required"
        );
    };
    const updateData = {
        email
    };

    const userId = req.user.userId;
    const userUpdate = await User.findByIdAndUpdate(userId, updateData, {

        new: true,
        runValidators: true

    }).select("-password -refreshToken");

    if (!userUpdate) {

        throw new ApiError(
            statusCodes.not_found,
            "User not found"
        );

    };

    return res
        .status(statusCodes.success)
        .json(
            new ApiResponse(
                statusCodes.success,
                userUpdate,
                "User Email updated successfully",
            )
        );

});

const updateUserProfileUserName = asyncHandler(async (req, res) => {
    const { username } = req.body;

    if (!username) {
        throw new ApiError(
            statusCodes.not_found,
            "Username is required"
        );
    }

    // Regex for at least one special character
    const specialCharRegex = /[!@#$%^&*_.\-]/;
    if (!specialCharRegex.test(username)) {
        throw new ApiError(
            statusCodes.bad_request,
            "Username must contain at least one special character (e.g. _ . - @)"
        );
    }

    const userId = req.user.userId;

    const updateData = { username };

    const userUpdate = await User.findByIdAndUpdate(userId, updateData, {
        new: true,
        runValidators: true
    }).select("-password -refreshToken");

    if (!userUpdate) {
        throw new ApiError(
            statusCodes.not_found,
            "User not found"
        );
    }

    return res
        .status(statusCodes.success)
        .json(
            new ApiResponse(
                statusCodes.success,
                userUpdate,
                "Username updated successfully"
            )
        );
});


const changePassword = asyncHandler(async (req, res) => {

    const { email, oldPassword, newPassword } = req.body;

    if (!email || !oldPassword || !newPassword) {

        throw new ApiError(
            statusCodes.not_found,
            "User not found"
        );

    };

    const userId = req.user.userId;

    const user = await User.findById(userId);

    if (!user) {

        throw new ApiError(
            statusCodes.not_found,
            "User not found"
        );

    };

    if (email !== user.email) {

        throw new ApiError(
            statusCodes.unauthorized,
            "Provided email does not match."
        );

    };

    if (oldPassword === newPassword) {
        throw new ApiError(
            400,
            "New password must be different from old password"
        );
    }


    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

    if (!isPasswordCorrect) {

        throw new ApiError(
            400,
            "Invalid old password"
        );

    };

    user.password = newPassword;
    await user.save();

    return res
        .status(statusCodes.success)
        .json(

            new ApiResponse(
                statusCodes.success,
                null,
                "Password reset successfully"
            )

        );

});

const deleteUserAccount = asyncHandler(async (req, res) => {

    const { enteremail, enterpassword } = req.body;

    if (!enteremail || !enterpassword) {

        throw new ApiError(
            statusCodes.not_found,
            "All fieldss are required"
        );

    };

    const userId = req.user.userId;

    const user = await User.findById(userId);

    if (!user) {

        throw new ApiError(
            statusCodes.not_found,
            "User not found"
        );

    };

    if (enteremail !== user.email) {

        throw new ApiError(
            statusCodes.unauthorized,
            "Provided email does not match."
        );

    };

    const isPasswordCorrect = await user.isPasswordCorrect(enterpassword);

    if (!isPasswordCorrect) {

        throw new ApiError(
            statusCodes.unauthorized,
            "Passwords do not match."
        );

    };

    await User.findByIdAndDelete(userId);

    return res
        .status(statusCodes.success)
        .json(

            new ApiResponse(

                statusCodes.success,
                null,
                "User details deleted successfully",

            )

        );

});

module.exports = {
    GetUserProfile,
    updateUserProfileEmail,
    updateUserProfileUserName,
    changePassword,
    deleteUserAccount
};