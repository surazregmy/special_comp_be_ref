const userRepository = require("../../data-access/user");

const profileRepository = require("../../data-access/profile");
const addressRepository = require("../../data-access/address");
const educationRepository = require("../../data-access/education");
const documentRepository = require("../../data-access/document");

const createUserProfileFun = require("./insert-user-profile");
const updateUserProfileFun = require("./update-user-profile");
const uploadFileFun = require("./upload-file");
const uploadFilePSFun = require("./upload-fille-ps");
const uploadFileHPFun = require("./upload-fille-hp");
const createUserAvailabilityFun = require("./insert-availability");
const updateUserAvailabilityFun = require("./update-availability");
const selectUserProfileFun = require("./select-user-profile");
const createUserEducationFun = require("./insert-education");
const updateUserEducationFun = require("./update-education");
const deleteUserEducationFun = require("./delete-education");

const selectShiftFun = require("./select-shift");
const selectClinicShiftFun = require("./select-clinic-shift");
const updateShiftFun = require("./update-shift");
const deleteShiftFun = require("./delete-shift");

const createUserProfileSer = createUserProfileFun({
  userRepository,
  profileRepository,
  addressRepository,
  educationRepository,
});

const updateUserProfileSer = updateUserProfileFun({
  userRepository,
  profileRepository,
  addressRepository,
  educationRepository,
});

const uploadFileSer = uploadFileFun({
  userRepository,
  profileRepository,
  addressRepository,
  educationRepository,
  documentRepository,
});

const uploadFilePSSer = uploadFilePSFun({
  userRepository,
  profileRepository,
  addressRepository,
  educationRepository,
  documentRepository,
});

const uploadFileHPSer = uploadFileHPFun({
  userRepository,
  profileRepository,
  addressRepository,
  educationRepository,
  documentRepository,
});

const createUserAvailabilitySer = createUserAvailabilityFun({
  userRepository,
  profileRepository,
  addressRepository,
  educationRepository,
});

const updateUserAvailabilitySer = updateUserAvailabilityFun({
  userRepository,
  profileRepository,
  addressRepository,
  educationRepository,
});

const selectUserProfileSer = selectUserProfileFun({
  userRepository,
  profileRepository,
  addressRepository,
  educationRepository,
});

const createUserEducationSer = createUserEducationFun({
  userRepository,
  profileRepository,
  addressRepository,
  educationRepository,
});

const updateUserEducationSer = updateUserEducationFun({
  userRepository,
  profileRepository,
  addressRepository,
  educationRepository,
});

const deleteUserEducationSer = deleteUserEducationFun({
  userRepository,
  profileRepository,
  addressRepository,
  educationRepository,
});

const selectShiftSer = selectShiftFun({
  userRepository,
});
const selectClinicShiftSer = selectClinicShiftFun({
  userRepository,
});
const updateShiftSer = updateShiftFun({
  userRepository,
});
const deleteShiftSer = deleteShiftFun({
  userRepository,
});

const services = Object.freeze({
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
  selectShiftSer,
  selectClinicShiftSer,
  updateShiftSer,
  deleteShiftSer,
});

module.exports = services;
module.exports = {
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
  selectShiftSer,
  selectClinicShiftSer,
  updateShiftSer,
  deleteShiftSer,
};
