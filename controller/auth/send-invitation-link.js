const ValidationError = require("../../error/validationError");

const sendInvitationLink = ({ sendInvitationLinkSer }) => {
  return async function get(httpRequest) {
    const resp = await sendInvitationLinkSer({
      email: httpRequest.body.email,
      user: httpRequest.user,
      role: httpRequest.body.role,
      institutionId: httpRequest.body.institutionId,
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
