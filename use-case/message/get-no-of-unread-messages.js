const ValidationErrors = require("../../error/validationErrors");
const ValidationError = require("../../error/validationError");

const { uploadFile } = require("../../util/s3");
const fs = require("fs");

const sendMessage = ({
  userRepository,
  profileRepository,
  documentRepository,
  messageRepository,
}) => {
  return async function upload(user) {
    const loggedInUser = await userRepository.getByEmail(user);
    if (!loggedInUser) {
      throw new ValidationError("Unauthorized!", 401);
    }

    const totalMessages = await messageRepository.getCountOfUnreadMessages(
      loggedInUser.id
    );

    console.log("totalMessages");
    console.log(totalMessages);

    if (totalMessages.length > 0)
      return {
        count: totalMessages[0]._count.message,
      };
    else
      return {
        count: 0,
      };
  };
};

module.exports = sendMessage;
