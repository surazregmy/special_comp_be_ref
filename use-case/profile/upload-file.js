const ValidationErrors = require("../../error/validationErrors");
const ValidationError = require("../../error/validationError");

const { uploadFile } = require("../../util/s3");
const fs = require("fs");
const { CSVtoArray } = require("../../util/stringUtil");
const { emailNotificationCommon } = require("../auth/forget_emailcontent");
const { sendAllNotification } = require("../../util/allnotification");

const uploadFileFun = ({
  userRepository,
  profileRepository,
  documentRepository,
}) => {
  return async function upload(files, body, user) {
    const { fileNotes } = body;

    const fileNames = body.fileNames.split(",");
    const loggedInUser = await userRepository.getByEmail(user);
    if (!loggedInUser) {
      throw new ValidationError("Unauthorized!", 401);
    }

    const studentProfile = await profileRepository.getByUserId(loggedInUser.id);
    if (!studentProfile) {
      await profileRepository.addInclusive({ userId: loggedInUser.id });
    }

    const profile = await profileRepository.getByUserId(loggedInUser.id);

    console.log(files);
    // upload for files
    if (!files || !files.allfiles) {
      throw new ValidationError("No files to uplaod!");
    }

    if (files.allfiles) {
      const allFiles = files.allfiles;

      if (allFiles.length != fileNames.length) {
        throw new ValidationError("Invalid no of files, names");
      }

      let notes = [""];
      if (body.notes) {
        console.log("In the notes");
        notes = CSVtoArray(body.notes);
        console.log(notes);
      }

      for (let i = 0; i < allFiles.length; i++) {
        console.log("inside loop ", i);
        console.log(allFiles[i]);
        console.log(notes[i]);
        const pfResponse = await uploadAndHandle(
          allFiles[i],
          "studentUpload",
          loggedInUser.id
        );
        const savedDoc = await documentRepository.add({
          profileId: profile.id,
          fileName: fileNames[i],
          category: "studentUpload",
          originalFileName: allFiles[i].originalname,
          documentUrl: pfResponse.Location,
          keyword: "",
          notes: notes[i],
        });
      }
    }

    const pointOfContactPS =
      await userRepository.getPointOfContactByInstitution(
        loggedInUser.institutionId
      );

    if (pointOfContactPS) {
      //send Notification
      let subject = `Student - ${loggedInUser.fullName} has uploaded file in their profile`;
      let type = "S_COMPLETED_PROFILE";
      const emailTemplate = emailNotificationCommon(pointOfContactPS, subject);
      sendAllNotification(
        loggedInUser.id,
        pointOfContactPS.id,
        type,
        subject,
        subject + " Please view by going to documents.",
        emailTemplate
      );
    }
    const updatedProfile = await profileRepository.getByUserId(loggedInUser.id);
    return updatedProfile;
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

module.exports = uploadFileFun;
