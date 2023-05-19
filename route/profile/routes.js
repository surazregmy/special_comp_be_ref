const {
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
} = require("../../controller/profile");

const verifyStudentJWT = require("../../middleware/verifyTStudentJWT");
const verifyPSI = require("../../middleware/verifyPSIJWT");
const verifyHP = require("../../middleware/verifyHPJWT");
const verifyLoggedIn = require("../../middleware/verifyLoggedIn");

const validateRequestSchema = require("../../middleware/validate-request-schema");
const { body } = require("express-validator");
const { createShiftBodyValidator } = require("../../validation/shift");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const cuUpload = upload.fields([{ name: "allfiles", maxCount: 10 }]);
const cuUploadStudent = upload.fields([
  { name: "accessMedical", maxCount: 1 },
  { name: "authorization", maxCount: 1 },
  { name: "accessService", maxCount: 1 },
  { name: "schoolDisablity", maxCount: 1 },
  { name: "others", maxCount: 1 },
]);

const route = ({ router, makeExpressCallback }) => {
  router.post(
    "/",
    verifyStudentJWT,
    makeExpressCallback(createUserProfileController)
  );

  router.post(
    "/update",
    verifyLoggedIn,
    makeExpressCallback(updateUserProfileController)
  );

  router.get(
    "/",
    verifyLoggedIn,
    makeExpressCallback(selectUserProfileController)
  );

  router.post(
    "/uploadps",
    verifyPSI,
    cuUpload,
    makeExpressCallback(uploadFilePSController)
  );

  router.post(
    "/upload",
    verifyStudentJWT,
    cuUpload,
    makeExpressCallback(uploadFileController)
  );

  router.post(
    "/uploadhp",
    verifyHP,
    cuUpload,
    makeExpressCallback(uploadFileHPController)
  );

  return router;
};

module.exports = route;
