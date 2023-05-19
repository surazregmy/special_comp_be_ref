const ValidationErrors = require("../../error/validationErrors");
const ValidationError = require("../../error/validationError");

const { uploadFile } = require("../../util/s3");
const fs = require("fs");
const { sendAllNotification } = require("../../util/allnotification");
const {
  accomodationLetterNotificationTemplate,
} = require("../auth/forget_emailcontent");

const sendAccomodationLetter = ({
  userRepository,
  profileRepository,
  documentRepository,
  accomodationLetterRepository,
}) => {
  return async function upload(files, body, user) {
    const { accomodationLetterNotes, studentId } = body;

    const loggedInUser = await userRepository.getByEmail(user);
    if (!loggedInUser) {
      throw new ValidationError("Unauthorized!", 401);
    }

    const studentUser = await userRepository.getOne(studentId);
    if (!studentUser) {
      throw new ValidationError("Student User is not found!", 401);
    }

    if (files.accomodationLetter == null) {
      throw new ValidationError("There is no accomodation letter", 401);
    }

    let savedAccomodationLetter = null;
    if (files.accomodationLetter) {
      const pfResponse = await uploadAndHandle(
        files.accomodationLetter[0],
        "accomodationLetter",
        loggedInUser.id
      );
      savedAccomodationLetter = await accomodationLetterRepository.add({
        postSecondaryId: loggedInUser.id,
        studentId: studentUser.id,
        originalFileName: files.accomodationLetter[0].originalname,
        documentUrl: pfResponse.Location,
        notes: accomodationLetterNotes,
      });
    }
    // Log in table and send the accomodation Letter Email Notification
    const emailTemplate = accomodationLetterNotificationTemplate(
      studentUser,
      savedAccomodationLetter
    );
    let type = "AL_RECEIVED";
    let subject = "You have received a new accomodation letter."
    sendAllNotification(
      loggedInUser.id,
      studentUser.id,
      type,
      subject,
      subject + " Please view by going to accomodation letters.",
      emailTemplate
    );


    const accomodation_Letter =
      await accomodationLetterRepository.getByPSUserId(loggedInUser.id);
    return accomodation_Letter;
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

module.exports = sendAccomodationLetter;
