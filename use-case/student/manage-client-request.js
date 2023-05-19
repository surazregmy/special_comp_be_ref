const ValidationError = require("../../error/validationError");
const { sendAllNotification } = require("../../util/allnotification");
const { emailNotificationCommon } = require("../auth/forget_emailcontent");

const getClientRequest = ({ userRepository, clientRequestRepository }) => {
  return async function get(body, user, query) {
    const loggedInUser = await userRepository.getByEmail(user);
    if (!loggedInUser) {
      throw new ValidationError("Unauthorized!", 401);
    }
    await clientRequestRepository.manageClientRequest(body, loggedInUser.id);

    const hp = await userRepository.getOne(body.hpId);

    let subject = "You have received a update on a client request.";
    let type = "S_RESPONSE_HP_CONN";
    const emailTemplate = emailNotificationCommon(hp, subject);
    sendAllNotification(
      loggedInUser.id,
      body.hpId,
      type,
      subject,
      subject + " Please view by going to manage clients.",
      emailTemplate
    );
    return true;
  };
};

module.exports = getClientRequest;
