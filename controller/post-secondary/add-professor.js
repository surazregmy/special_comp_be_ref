const ValidationError = require("../../error/validationError");

const sendInvitationLink = ({ addProfessorSer }) => {
  return async function get(httpRequest) {
    const { professors } = await addProfessorSer({
      user: httpRequest.user,
      professors: httpRequest.body.professors,
    });
    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 200,
      body: professors,
    };
  };
};

module.exports = sendInvitationLink;
