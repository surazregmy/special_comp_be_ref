const ValidationErrors = require("../../error/validationErrors");
const ValidationError = require("../../error/validationError");

const { uploadFile } = require("../../util/s3");
const fs = require("fs");

const uploadFileFun = ({
  userRepository,
  profileRepository,
  documentRepository,
}) => {
  return async function upload(files, body, user) {
    const {
      accessMedicalNotes,
      authorizationNotes,
      accessServiceNotes,
      schoolDisablityNotes,
      othersNote,
    } = body;

    const loggedInUser = await userRepository.getByEmail(user);
    if (!loggedInUser) {
      throw new ValidationError("Unauthorized!", 401);
    }

    const exProfile = await profileRepository.getByUserId(loggedInUser.id);

    if (!exProfile) {
      await profileRepository.addInclusive({ userId: loggedInUser.id });
    }

    const profile = await profileRepository.getByUserId(loggedInUser.id);

    console.log(files);
    // upload for files
    if (!files || !files.allfiles) {
      throw new ValidationError("No files to uplaod!");
    }
    if (!body.fileNames || files.allfiles == "") {
      throw new ValidationError("No names provided");
    }

    if (!body.fileAccess || files.fileAccess == "") {
      throw new ValidationError("No access for file provided");
    }

    if (files.allfiles) {
      const allFiles = files.allfiles;
      const fileNames = body.fileNames.split(",");
      const access = body.fileAccess.split(",");

      for (let i = 0; i < access.length; i++) {
        if (!["ALL", "STUDENT", "HP"].includes(access[0])) {
          throw new ValidationError("Access can be ALL, STUDENT and HP Only");
        }
      }
      if (
        allFiles.length != fileNames.length ||
        fileNames.length != access.length
      ) {
        throw new ValidationError("Invalid no of files, names and accesses");
      }

      for (let i = 0; i < allFiles.length; i++) {
        const pfResponse = await uploadAndHandle(
          allFiles[i],
          fileNames[i],
          loggedInUser.id
        );
        const savedDoc = await documentRepository.add({
          profileId: profile.id,
          category: "psupload",
          originalFileName: allFiles[i].originalname,
          fileName: fileNames[i],
          access: access[i],
          documentUrl: pfResponse.Location,
          keyword: "hi",
          notes: "notes",
        });
      }
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
