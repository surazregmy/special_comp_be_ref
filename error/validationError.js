class ValidationError extends Error {
  constructor(message, code) {
    super(message);
    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;
    this.status = code || 400;
  }

  statusCode() {
    return this.status;
  }
}

module.exports = ValidationError;
