const ClientError = require("../../exceptions/ClientError.js");

const exceptionsHandler = (err, req, res, next) => {    
    if(err instanceof ClientError) {
        return res.status(err.statusCode).json({
            status: "fail",
            message: err.message,
        });
    }

    return res.status(500).json({
        status: "fail",
        message: "Internal Server Error",
    });
}

module.exports = exceptionsHandler;