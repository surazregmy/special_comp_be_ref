const {
  selectStudentSer,
  selectHPSer,
  selectDocumentSer,
  selectDocumentForSByHpSer,
  selectAccomodationLetterSer,
  approveProfileSer,
  addPointOfContactSer,
  getPointOfContactSer,
  selectCollegeSer,
  selectProfessorSer,
  updateUserSer,
  deleteDocumentSer,
  sendAccomodationLetterSer,
  sendAccomodationLetterToProfSer,
  getHPStudentRelationSer,
  addProfessorSer,
  updateProfessorSer
} = require("../../use-case/post-secondary");
// #########

const selectStudentFun = require("./select-student");
const selectHPFun = require("./select-hp");
const selectDocumentFun = require("./select-document");
const selectDocumentForSByHpFun = require("./select-doc-by-hp-to-st");
const selectAccomodationLetterFun = require("./select-accmdtn-letter");
const sendAccomodationLetterToProfFun = require("./send-acmtn-to-prof");
const deleteDocumentFun = require("./delete-document");
const updateUserFun = require("./update-post-sec");
const selectCollegeFun = require("./select-colleges");
const selectProfessorFun = require("./select-professors");
const approveProfileFun = require("./approve-profile");
const addPointOfContactFun = require("./add-point-of-contact");
const getPointOfContactFun = require("./get-point-of-contact");
const sendAccomodationLetterFun = require("./send-accmdtn-letter");
const getHPStudentRelationFun = require("./get-hp-student-relation");
const addProfessorFun = require("./add-professor");
const updateProfessorFun = require("./update-professor");


// #########

const selectStudentController = selectStudentFun({ selectStudentSer });
const selectHPController = selectHPFun({ selectHPSer });
const updateUserController = updateUserFun({ updateUserSer });
const selectCollegeController = selectCollegeFun({ selectCollegeSer });
const selectProfessorController = selectProfessorFun({ selectProfessorSer });
const selectDocumentController = selectDocumentFun({ selectDocumentSer });
const selectDocumentForSByHpController = selectDocumentForSByHpFun({
  selectDocumentForSByHpSer,
});
const selectAccomodationLetterController = selectAccomodationLetterFun({
  selectAccomodationLetterSer,
});
const sendAccomodationLetterToProfController = sendAccomodationLetterToProfFun({
  sendAccomodationLetterToProfSer,
});
const deleteDocumentController = deleteDocumentFun({ deleteDocumentSer });
const approveProfileController = approveProfileFun({ approveProfileSer });
const addPointOfContactController = addPointOfContactFun({
  addPointOfContactSer,
});
const getPointOfContactController = getPointOfContactFun({
  getPointOfContactSer,
});
const getHPStudentRelationController = getHPStudentRelationFun({
  getHPStudentRelationSer,
});

const sendAccomodationLetterController = sendAccomodationLetterFun({
  sendAccomodationLetterSer,
});

const addProfessorController = addProfessorFun({
  addProfessorSer,
});

const updateProfessorController = updateProfessorFun({
  updateProfessorSer,
});

const services = Object.freeze({
  selectStudentController,
  selectHPController,
  selectDocumentController,
  selectDocumentForSByHpController,
  selectAccomodationLetterController,
  sendAccomodationLetterToProfController,
  deleteDocumentController,
  approveProfileController,
  addPointOfContactController,
  getPointOfContactController,
  selectCollegeController,
  selectProfessorController,
  updateUserController,
  sendAccomodationLetterController,
  getHPStudentRelationController,
  addProfessorController,
  updateProfessorController,
});

module.exports = services;
