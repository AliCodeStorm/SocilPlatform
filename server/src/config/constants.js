require('dotenv').config();

const secretKey = process.env.JWT_SECRET;
const refreshsecretKey = process.env.JWT_REFRESH_SECRET;
const tokenExpiration = process.env.JWT_EXPIRATION || '1h';
const refreshExpiration = process.env.REFRESH_TOKEN_EXPIRATION || '7d';
const mongooseUrl = process.env.MONGOOSE_URI;
const port = process.env.PORT;
const nodeEnv = process.env.NODE_ENV;


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
    refreshsecretKey,
    secretKey,
    tokenExpiration,
    refreshExpiration,
    mongooseUrl,
    port,
    nodeEnv,
    statusCodes,
    cookieOptions
};
