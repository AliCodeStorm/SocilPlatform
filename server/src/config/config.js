require('dotenv').config();

const secretKey = process.env.JWT_SECRET;
const refreshsecretKey=process.env.JWT_REFRESH_SECRET;
const tokenExpiration = process.env.JWT_EXPIRATION || '1h';
const refreshExpiration = process.env.REFRESH_TOKEN_EXPIRATION || '7d';
const mongooseUrl=process.env.MONGOOSE_URI;
const port=process.env.PORT;
const nodeEnv=process.env.NODE_ENV;

module.exports = {
    refreshsecretKey,
    secretKey,
    tokenExpiration,
    refreshExpiration,
    mongooseUrl,
    port,
    nodeEnv
};
