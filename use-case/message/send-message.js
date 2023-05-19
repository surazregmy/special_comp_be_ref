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
  return async function upload(files, body, user) {
    const { message, receiverId } = body;

    const loggedInUser = await userRepository.getByEmail(user);
    if (!loggedInUser) {
      throw new ValidationError("Unauthorized!", 401);
    }

    const receiverUser = await userRepository.getOne(receiverId);
    if (!receiverUser) {
      throw new ValidationError("Receiver User  is not found!", 401);
    }

    if (message == null && files.attachment == null) {
      throw new ValidationError("Messages can not be null", 401);
    }
    if (files.attachment) {
      const pfResponse = await uploadAndHandle(
        files.attachment[0],
        "attachment",
        loggedInUser.id
      );
      const savedDoc = await messageRepository.add({
        user1Id: loggedInUser.id,
        user2Id: receiverUser.id,
        hasAttachment: true,
        sentByUserId: loggedInUser.id,
        receiverEmail: receiverUser.email,
        originalFileName: files.attachment[0].originalname,
        documentUrl: pfResponse.Location,
        message: message,
      });
    } else {
      const savedDoc = await messageRepository.add({
        user1Id: loggedInUser.id,
        user2Id: receiverUser.id,
        hasAttachment: false,
        sentByUserId: loggedInUser.id,
        receiverEmail: receiverUser.email,
        message: message,
      });
    }
    const messageHistory =
      await messageRepository.getMessageHistoryWithAnotherUser(
        loggedInUser.id,
        receiverUser.id,
        { page: 1, size: "50" }
      );
    return messageHistory;
  };
};

const uploadAndHandle = async (file, folder, loggedInUserId) => {
  try {
    const res = await uploadFile(file, folder, loggedInUserId);
    console.log("Upload to AWS complete...");
    console.log("Deleting from Local Storage...");
    fs.unlink(file.path, (err) => {
      if (err) {
        console.error(err);
      }
    });
    return res;
  } catch (error) {
    console.log(error);
    throw new ValidationError("Error in AWS service", 500);
  }
};

module.exports = sendMessage;
