const {
    responseJson
} = require("../utils/http.js");

exports.errorHandling = (err, req, res, next) => {
    if (err?.name === "bad_request") {
        responseJson(res, null, "bad_request", 400);
        return;
    }

    if (err?.name === "not_found") {
        responseJson(res, null, "not_found", 404);
        return;
    }

    console.log(err?.message);
    responseJson(res, null, "internal_server_error", 500);
    return;
};