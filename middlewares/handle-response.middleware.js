const ApiError = require("../libs/Errors");

// const env = require('../../setup/load-env.setup');
module.exports = function (data, req, res, next) {
  // If data instanceof ApiError => response it
  // If data instanceof Normal Error => pass it to InternalServerError - is a ApiError,
  // if data is result, send client
  if (data instanceof ApiError) {
    res.status(data.code || 400).json({
      msg: data.message,
    });
  } else if (data instanceof Error) {
    res.status(data.statusCode || 500).json({
      errors: {
        msg: "Internal Server Error",
        httpCode: 500,
      },
    });
  } else {
    const code = data.code;
    if (data.code) delete data.code;
    res.status(code || 200).json({ ...data });
  }
};
