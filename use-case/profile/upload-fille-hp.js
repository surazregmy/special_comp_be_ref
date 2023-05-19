const ValidationErrors = require("../../error/validationErrors");
const ValidationError = require("../../error/validationError");

const { uploadFile } = require("../../util/s3");
const fs = require("fs");
const { CSVtoArray } = require("../../util/stringUtil");
const { sendAllNotification } = require("../../util/allnotification");
const { emailNotificationCommon } = require("../auth/forget_emailcontent");

const uploadFileFun = ({
  userRepository,
  profileRepository,
  documentRepository,
}) => {
  return async function upload(files, body, user) {
    const { submittedFor, notes } = body;

    const loggedInUser = await userRepository.getByEmail(user);
    if (!loggedInUser) {
      throw new ValidationError("Unauthorized!", 401);
    }

    if (submittedFor == null || submittedFor == "") {
      throw new ValidationError("submittedFor(studentId)  is required!", 401);
    }

    const student = await userRepository.getOne(submittedFor);
    if (!student) {
      throw new ValidationError("Student Id Does not exist", 401);
    }

    const hpProfile = await profileRepository.getByUserId(loggedInUser.id);
    if (!hpProfile) {
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
          "hpupload",
          loggedInUser.id
        );
        const savedDoc = await documentRepository.add({
          profileId: profile.id,
          submittedFor: student.id,
          submittedStudentName: student.fullName,
          submittedStudentEmail: student.email,
          category: "hpupload",
          fileName: allFiles[i].originalname,
          originalFileName: allFiles[i].originalname,
          documentUrl: pfResponse.Location,
          keyword: "",
          notes: notes[i],
        });
      }
    }

    let subject = "Health Care Provider has uploaded a document for you.";
    let type = "HP_UPLOAD_DOC_FOR_S";
    const emailTemplate = emailNotificationCommon(student, subject);
    sendAllNotification(
      loggedInUser.id,
      student.id,
      type,
      subject,
      subject + " Please view by going to documents.",
      emailTemplate
    );
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
