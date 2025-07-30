const Messages = {
    user_registered_success: "User registered successfully",
    user_logged_in_success: "User logged in successfully",
    user_loggedout_in_success: "User logout in successfully",
    data_fetched_success: "Data fetched successfully",
    data_updated_success: "Data updated successfully",
    data_deleted_success: "Data deleted successfully",
    user_fetched_success: "User details fetched successfully",
    user_updated_success: "User details updated successfully",
    user_deleted_success: "User details deleted successfully",
    refresh_token_success: "Access token refreshed successfully",

    invalid_credentials: "Invalid email or password",
    email_not_match: "rovided email does not match.",
    bad_request: "Bad request. Please check your input",
    unauthorized_access: "Unauthorized access",
    forbidden: "Forbidden",
    not_found: "Resource not found",
    method_not_allowed: "Method not allowed",
    conflict: "Conflict: Resource already exists",
    unprocessable_entity: "Unprocessable entity. Invalid data",
    too_many_requests: "Too many requests. Please try again later",
    require_user_details: "All fieldss are required",
    exist_email: "User with this email already exists",
    invalid_token: "Invalid or expired token",
    token_generation_error: "Error occurs in generating the token",
    no_token_provided: "Access Denied. No token provided.",
    user_not_found: "User not found",

    internal_server_error: "Internal Server Error",
    not_implemented: "Feature not implemented yet",
    bad_gateway: "Bad gateway. Please try again later",
    service_unavailable: "Service unavailable. Please try again later",
    gateway_timeout: "Gateway timeout. Please try again later",

    password_strength: "Password must contain at least 8 characters, including a number and a special character",
    email_sent_success: "Email sent successfully",
    password_reset_success: "Password reset successfully",
    email_not_found: "Email address not found",

    account_locked: "Your account has been locked due to multiple failed login attempts",
    account_verified: "Account verified successfully",
    password_mismatch: "Passwords do not match"
};



const statusCodes = {
    success: 200,
    created: 201,
    accepted: 202,
    no_content: 204,

    bad_request: 400,
    unauthorized: 401,
    forbidden: 403,
    not_found: 404,
    method_not_allowed: 405,
    conflict: 409,
    unprocessable_entity: 422,
    too_many_requests: 429,

    internal_server_error: 500,
    not_implemented: 501,
    bad_gateway: 502,
    service_unavailable: 503,
    gateway_timeout: 504
};

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
    maxAge: 24 * 60 * 60 * 1000,
}


module.exports = {
    Messages,
    statusCodes,
    cookieOptions
};