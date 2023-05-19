const ValidationError = require("../../error/validationError");

const sendInvitationLink = ({ sendInvitationLinkSer }) => {
  return async function get(httpRequest) {
    const resp = await sendInvitationLinkSer({
      user: httpRequest.user,
      email: httpRequest.body.email,
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

module.exports = sendInvitationLink;
