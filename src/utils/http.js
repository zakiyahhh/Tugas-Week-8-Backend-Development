const responseJson = (res, data, msg, code) => {
    res.status(code).json({
        message: msg,
        data: data,
    });
};

const responseError = (res, error, statusCode = 500) => {
    res.status(statusCode).json({
        message: error.message || "Internal Server Error",
        ...(error.details && { details: error.details }), 
    });
};

module.exports = {
    responseJson, responseError
};