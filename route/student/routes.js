const {
  selectDocumentController,
  selectDocumentUploadedBySelfController,
  selectProfController,
  selectDocsbyPsController,
  selectDocsbyPsListController,
  getProfListController,
  getClientRequestController,
  manageClientRequestController,
} = require("../../controller/student");

const verifyStudentJWT = require("../../middleware/verifyTStudentJWT");

const validateRequestSchema = require("../../middleware/validate-request-schema");
const { body } = require("express-validator");
const { createShiftBodyValidator } = require("../../validation/shift");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const cuUpload = upload.fields([
  { name: "accessMedical", maxCount: 1 },
  { name: "authorization", maxCount: 1 },
  { name: "accessService", maxCount: 1 },
  { name: "schoolDisablity", maxCount: 1 },
  { name: "others", maxCount: 1 },
]);

const cuUploadAL = upload.fields([{ name: "accomodationLetter", maxCount: 1 }]);

const route = ({ router, makeExpressCallback }) => {
  router.get(
    "/acc-ltrs",
    verifyStudentJWT,
    makeExpressCallback(selectDocumentController)
  );

  router.post(
    "/assign-prof",
    verifyStudentJWT,
    makeExpressCallback(selectProfController)
  );

  router.get(
    "/prof-list",
    verifyStudentJWT,
    makeExpressCallback(getProfListController)
  );

  router.get(
    "/docs-ps",
    verifyStudentJWT,
    makeExpressCallback(selectDocsbyPsController)
  );

  router.get(
    "/docs-self",
    verifyStudentJWT,
    makeExpressCallback(selectDocumentUploadedBySelfController)
  );

  router.get(
    "/docs-list-ps",
    verifyStudentJWT,
    makeExpressCallback(selectDocsbyPsListController)
  );

  router.get(
    "/client-requests",
    verifyStudentJWT,
    makeExpressCallback(getClientRequestController)
  );

  router.put(
    "/manage-client-request",
    verifyStudentJWT,
    makeExpressCallback(manageClientRequestController)
  );

  return router;
};

module.exports = route;
