const ValidationError = require("../../error/validationError");

const sendInvitationLink = ({ updateProfessorSer }) => {
  return async function get(httpRequest) {
    const { professor } = await updateProfessorSer({
      user: httpRequest.user,
      professor: httpRequest.body,
      professorId: httpRequest.params.id,
    });
    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 200,
      body: professor,
    };
  };
};

module.exports = sendInvitationLink;
