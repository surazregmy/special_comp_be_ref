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

    if (!receiverId) {
      throw new ValidationError("Receiver Id is required!", 401);
    }
    const receiverUser = await userRepository.getOne(receiverId);
    if (!receiverUser) {
      throw new ValidationError("Receiver User  is not found!", 401);
    }

    // await messageRepository.updateReadByReceiver(
    //   receiverUser.id,
    //   loggedInUser.id
    // );

    const messageHistory =
      await messageRepository.getMessageHistoryWithAnotherUser(
        loggedInUser.id,
        receiverUser.id,
        query
      );
    const totalMessages =
      await messageRepository.getMessageHistoryWithAnotherUserTotal(
        loggedInUser.id,
        receiverUser.id,
        query
      );

    const unreadMessagesWithUser =
      await messageRepository.getCountOfUnreadMessagesWithSender(
        loggedInUser.id,
        receiverUser.id
      );

    if (unreadMessagesWithUser.length > 0)
      return {
        unread: {
          count: unreadMessagesWithUser[0]._count.message,
        },
        clinic: messageHistory,
        count: messageHistory.length,
        totalCount: totalMessages.length,
      };
    else
      return {
        unread: {
          count: 0,
        },
        clinic: messageHistory,
        count: messageHistory.length,
        totalCount: totalMessages.length,
      };
  };
};

module.exports = sendMessage;
