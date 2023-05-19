const ValidationError = require("../../error/validationError");

const emailVerification = ({ emailVerificationSer }) => {
  return async function get(httpRequest) {
    const resp = await emailVerificationSer({
      token: `${httpRequest.params.token}`,
    });
    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 200,
      body: resp,
    };
  };
};

module.exports = emailVerification;
