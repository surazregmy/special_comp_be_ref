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
  return async function upload(user, body) {
    const loggedInUser = await userRepository.getByEmail(user);
    if (!loggedInUser) {
      throw new ValidationError("Unauthorized!", 401);
    }

    // validate the body

    if (!body.messageIds || body.messageIds.length == 0) {
      throw new ValidationError("Ids can not be empty!", 400);
    }
    if (![true, false].includes(body.isReadByReceiver)) {
      throw new ValidationError(
        "isReadByReceiver can only be true or false",
        400
      );
    }
    console.log("body.isReadByReceiver");
    console.log(body.isReadByReceiver);
    await messageRepository.markMessages(
      body.messageIds,
      body.isReadByReceiver
    );

    return {
      clinic: "Marked Successful",
    };
  };
};

module.exports = sendMessage;
