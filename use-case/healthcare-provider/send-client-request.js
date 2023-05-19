const ValidationErrors = require("../../error/validationErrors");
const ValidationError = require("../../error/validationError");
const { sendAllNotification } = require("../../util/allnotification");
const { emailNotificationCommon } = require("../auth/forget_emailcontent");

const sendClientRequest = ({
  userRepository,
  clientRequestRepository,
}) => {
  return async function add(body, user) {
    const loggedInUser = await userRepository.getByEmail(user);
    if (!loggedInUser) {
      throw new ValidationError("Unauthorized!", 401);
    }
    const request = await clientRequestRepository.add({ ...body, hpId: loggedInUser.id });

    const student = await userRepository.getOne(body.studentId);

    let subject = "You have received a client request from a Healthcare Provider.";
    let type = "HP_SENT_CONNET_S";
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
    // const clientRequests =  await clientRequestRepository.getHPClients({}, loggedInUser.id);
    return true;
  };
};


module.exports = sendClientRequest;
