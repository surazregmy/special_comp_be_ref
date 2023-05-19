const {
  createUserProfileSer,
  updateUserProfileSer,
  uploadFileSer,
  uploadFilePSSer,
  uploadFileHPSer,
  createUserAvailabilitySer,
  updateUserAvailabilitySer,
  selectUserProfileSer,
  createUserEducationSer,
  updateUserEducationSer,
  deleteUserEducationSer,
} = require("../../use-case/profile");
// #########

const createUserFun = require("./insert-user-profile");
const updateUserFun = require("./update-user-profile");

const uploadFileFun = require("./upload-file");
const uploadFilePSFun = require("./upload-file-ps");
const uploadFileHPFun = require("./upload-file-hp");
const createUserAvailabilityFun = require("./insert-availability");
const updateUserAvailabilityFun = require("./update-availability");
const selectUserProfileFun = require("./select-user-profile");
const createUserEducationFun = require("./insert-education");
const updateUserEducationFun = require("./update-education");
const deleteUserEducationFun = require("./delete-education");

// #########

const createUserProfileController = createUserFun({ createUserProfileSer });
const updateUserProfileController = updateUserFun({ updateUserProfileSer });

const uploadFileController = uploadFileFun({ uploadFileSer });
const uploadFilePSController = uploadFilePSFun({ uploadFilePSSer });
const uploadFileHPController = uploadFileHPFun({ uploadFileHPSer });
const createUserAvailabilityController = createUserAvailabilityFun({
  createUserAvailabilitySer,
});
const updateUserAvailabilityController = updateUserAvailabilityFun({
  updateUserAvailabilitySer,
});
const selectUserProfileController = selectUserProfileFun({
  selectUserProfileSer,
});
const createUserEducationController = createUserEducationFun({
  createUserEducationSer,
});
const updateUserEducationController = updateUserEducationFun({
  updateUserEducationSer,
});
const deleteUserEducationController = deleteUserEducationFun({
  deleteUserEducationSer,
});
// #########
const services = Object.freeze({
  createUserProfileController,
  updateUserProfileController,
  uploadFileController,
  uploadFilePSController,
  uploadFileHPController,
  createUserAvailabilityController,
  updateUserAvailabilityController,
  selectUserProfileController,
  createUserEducationController,
  updateUserEducationController,
  deleteUserEducationController,
});

module.exports = services;
module.exports = {
  createUserProfileController,
  updateUserProfileController,
  uploadFileController,
  uploadFilePSController,
  uploadFileHPController,
  createUserAvailabilityController,
  updateUserAvailabilityController,
  selectUserProfileController,
  createUserEducationController,
  updateUserEducationController,
  deleteUserEducationController,
};
