const jwt = require('jsonwebtoken');
const ApiError = require('../utils/ApiError');
const { statusCodes,secretKey } = require('../config/constants');

const authMiddleware = async (req, res, next) => {

    try {
        const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '').trim();

        if (!token) {
            throw new ApiError(
                statusCodes.unauthorized,
                "Unauthorized access"
            );
        }

        try {
            const decoded = jwt.verify(token, secretKey);

            req.user = { userId: decoded.userId };
            next();
        } catch (err) {
            if (err.name === 'TokenExpiredError') {
                throw new ApiError(
                    statusCodes.unauthorized,
                    'Token has expired. Please log in again.'
                );
            }
            throw new ApiError(
                statusCodes.unauthorized,
                'Invalid or malformed token.'
            );
        }

    } catch (error) {
        next(error);
    }
};

module.exports = authMiddleware;
