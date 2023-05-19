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
  return async function upload(files, body, user, query) {
    const { receiverId } = body;

    const loggedInUser = await userRepository.getByEmail(user);
    if (!loggedInUser) {
      throw new ValidationError("Unauthorized!", 401);
    }

    // get
    const messageHistory = await messageRepository.getRecentChatUser(
      loggedInUser.id,
      query
    );

    return {
      clinic: messageHistory.slice(
        (Number(query.page) - 1) * Number(query.size),
        (Number(query.page) - 1) * Number(query.size) + Number(query.size)
      ),
      count: messageHistory.slice(
        (Number(query.page) - 1) * Number(query.size),
        (Number(query.page) - 1) * Number(query.size) + Number(query.size)
      ).length,
      totalCount: messageHistory.length,
    };
  };
};

module.exports = sendMessage;
