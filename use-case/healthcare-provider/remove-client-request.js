const ValidationErrors = require("../../error/validationErrors");
const ValidationError = require("../../error/validationError");
const { emailNotificationCommon } = require("../auth/forget_emailcontent");
const { sendAllNotification } = require("../../util/allnotification");

const sendClientRequest = ({
  userRepository,
  clientRequestRepository,
}) => {
  return async function remove(body, user) {
    const loggedInUser = await userRepository.getByEmail(user);
    if (!loggedInUser) {
      throw new ValidationError("Unauthorized!", 401);
    }
    const request = await clientRequestRepository.removeRequest(body.requestId);
    
    const student = await userRepository.getOne(body.studentId);

    let subject = "Your Healthcare Provider has removed you as a client.";
    let type = "HP_DISCONNECT_S";
    const emailTemplate = emailNotificationCommon(
      student,
      subject
    );
    sendAllNotification(
      loggedInUser.id,
      body.studentId,
      type,
      subject,
      subject + " Please view by going to HP requests.",
      emailTemplate
    );
    // const clientRequests = await clientRequestRepository.getHPClients({}, loggedInUser.id);
    return true;
  };
};


module.exports = sendClientRequest;
