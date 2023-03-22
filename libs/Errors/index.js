module.exports = class ApiError extends Error {
  constructor(msg, code) {
    super(msg);
    this.code = code;
  }
};
