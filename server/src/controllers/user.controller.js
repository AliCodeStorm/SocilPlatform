const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const User = require("../models/user.model");
const {
    Messages,
    statusCodes
} = require("../config/constants");

const GetUserProfile = asyncHandler(async (req, res) => {

    const userId = req.user.userId;

    const user = await User.findById(userId).select("-password -refreshToken");

    if (!user) {

        throw new ApiError(
            statusCodes.not_found,
            Messages.user_not_found
        );

    };

    return res
        .status(statusCodes.success)
        .json(
            new ApiResponse(
                statusCodes.success,
                user,
                Messages.user_fetched_success
            )
        );

});

const updateUserProfile = asyncHandler(async (req, res) => {

    const { email, name } = req.body;

    if (!email || !name) {
        throw new ApiError(
            statusCodes.not_found,
            Messages.require_user_details
        );
    };
    const updateData = {
        email,
        name
    };

    const userId = req.user.userId;
    const userUpdate = await User.findByIdAndUpdate(userId, updateData, {

        new: true,
        runValidators: true

    }).select("-password -refreshToken");

    if (!userUpdate) {

        throw new ApiError(
            statusCodes.not_found,
            Messages.user_not_found
        );

    };

    return res
        .status(statusCodes.success)
        .json(
            new ApiResponse(
                statusCodes.success,
                userUpdate,
                Messages.user_updated_success
            )
        );

});

const changePassword = asyncHandler(async (req, res) => {

    const { email, oldPassword, newPassword } = req.body;

    if (!email || !oldPassword || !newPassword) {

        throw new ApiError(
            statusCodes.not_found,
            Messages.user_not_found
        );

    };

    const userId = req.user.userId;

    const user = await User.findById(userId);

    if (!user) {

        throw new ApiError(
            statusCodes.not_found,
            Messages.user_not_found
        );

    };

    if (email !== user.email) {

        throw new ApiError(
            statusCodes.unauthorized,
            Messages.email_not_match
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
                Messages.password_reset_success
            )

        );

});

const deleteUserAccount = asyncHandler(async (req, res) => {

    const { enteremail, enterpassword } = req.body;

    if (!enteremail || !enterpassword) {

        throw new ApiError(
            statusCodes.not_found,
            Messages.require_user_details
        );

    };

    const userId = req.user.userId;

    const user = await User.findById(userId);

    if (!user) {

        throw new ApiError(
            statusCodes.not_found,
            Messages.user_not_found
        );

    };

    if (enteremail !== user.email) {

        throw new ApiError(
            statusCodes.unauthorized,
            Messages.email_not_match
        );

    };

    const isPasswordCorrect = await user.isPasswordCorrect(enterpassword);

    if (!isPasswordCorrect) {

        throw new ApiError(
            statusCodes.unauthorized,
            Messages.password_mismatch
        );

    };

    await User.findByIdAndDelete(userId);

    return res
        .status(statusCodes.success)
        .json(

            new ApiResponse(

                statusCodes.success,
                null,
                Messages.user_deleted_success

            )

        );

});

module.exports = {
    GetUserProfile,
    updateUserProfile,
    changePassword,
    deleteUserAccount
};