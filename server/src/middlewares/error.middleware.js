const ApiError = require('../utils/ApiError');

const errorMiddleware = (err, req, res, next) => {
    
    console.log("🔥 Error Middleware Triggered!", err); 

    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            errors: err.errors || [],
            data: null
        });
    }

    return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        errors: [],
        data: null
    });
};

module.exports = errorMiddleware;