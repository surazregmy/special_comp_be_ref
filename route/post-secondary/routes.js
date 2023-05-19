const {
  selectStudentController,
  selectHPController,
  selectDocumentController,
  selectDocumentForSByHpController,
  approveProfileController,
  addPointOfContactController,
  getPointOfContactController,
  selectCollegeController,
  selectProfessorController,
  updateUserController,
  deleteDocumentController,
  sendAccomodationLetterController,
  selectAccomodationLetterController,
  sendAccomodationLetterToProfController,
  getHPStudentRelationController,
  addProfessorController,
  updateProfessorController,
} = require("../../controller/post-secondary");

const verifyPSIJWT = require("../../middleware/verifyPSIJWT");
const verifyLoggedIn = require("../../middleware/verifyLoggedIn");

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
    "/students",
    verifyPSIJWT,
    makeExpressCallback(selectStudentController)
  );

  router.get(
    "/students/:id",
    verifyPSIJWT,
    makeExpressCallback(selectStudentController)
  );

  router.get("/hps", verifyPSIJWT, makeExpressCallback(selectHPController));

  router.get("/hps/:id", verifyPSIJWT, makeExpressCallback(selectHPController));

  router.get("/college", makeExpressCallback(selectCollegeController));
  router.get("/college/:id", makeExpressCallback(selectCollegeController));
  router.get("/professor", makeExpressCallback(selectProfessorController));

  router.post(
    "/professor",
    verifyPSIJWT,
    makeExpressCallback(addProfessorController)
  );

  router.post(
    "/professor/:id",
    verifyPSIJWT,
    makeExpressCallback(updateProfessorController)
  );


  router.get(
    "/documents",
    verifyPSIJWT,
    makeExpressCallback(selectDocumentController)
  );

  // Get all documents of student along with HP uploaded documents for that student
  router.get(
    "/documents-of-st-with-hp/:id",
    verifyPSIJWT,
    makeExpressCallback(selectDocumentForSByHpController)
  );

  router.delete(
    "/documents/:id",
    verifyPSIJWT,
    makeExpressCallback(deleteDocumentController)
  );

  router.post(
    "/upload",
    verifyPSIJWT,
    cuUpload,
    makeExpressCallback(selectStudentController)
  );

  router.post(
    "/send-al",
    verifyPSIJWT,
    cuUploadAL,
    makeExpressCallback(sendAccomodationLetterController)
  );

  router.get(
    "/acc-ltrs",
    verifyPSIJWT,
    makeExpressCallback(selectAccomodationLetterController)
  );

  router.get(
    "/hp-student-relation",
    verifyPSIJWT,
    makeExpressCallback(getHPStudentRelationController)
  );

  router.post(
    "/send-al-to-prof",
    verifyPSIJWT,
    makeExpressCallback(sendAccomodationLetterToProfController)
  );

  router.post(
    "/update",
    verifyPSIJWT,
    makeExpressCallback(updateUserController)
  );

  router.post(
    "/updatecalendly",
    verifyPSIJWT,
    makeExpressCallback(updateUserController)
  );

  router.post(
    "/approve-profile",
    verifyPSIJWT,
    makeExpressCallback(approveProfileController)
  );

  router.post(
    "/add-point-contact",
    verifyPSIJWT,
    makeExpressCallback(addPointOfContactController)
  );

  router.post(
    "/get-point-contact",
    makeExpressCallback(getPointOfContactController)
  );

  return router;
};

module.exports = route;
