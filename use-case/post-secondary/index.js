const userRepository = require("../../data-access/user");
const documentRepository = require("../../data-access/document");
const profileRepository = require("../../data-access/profile");
const accomodationLetterRepository = require("../../data-access/accomodation-letter");
const clientRequestRepository = require("../../data-access/client-request");
const institutionRepository = require("../../data-access/institution");
const professorRepository = require("../../data-access/professor");

const selectStudentFun = require("./select-student");
const selectHPFun = require("./select-hp");
const selectCollegeFun = require("./select-colleges");
const selectProfessorFun = require("./select-professor");
const updateUserFun = require("./update-post-sec");
const selectDocumentFun = require("./select-document");
const selectDocumentForSByHpFun = require("./select-doc-by-hp-to-st");
const selectAccomodationLetterFun = require("./select-acmmdtn-letter");
const sendAccomodationLetterToProfFun = require("./send-acmtn-to-prof");
const deleteDocumentFun = require("./delete-document");
const approveProfileFun = require("./approve-profile");
const addPointOfContactFun = require("./add-point-of-contact");
const getPointOfContactFun = require("./get-point-of-contact");
const sendAccomodationLetterFun = require("./send-acmmdtn-letter");
const getHPStudentRelationFun = require("./get-hp-student-relation");
const addProfessorFun = require("./add-professor");
const updateProfessorFun = require("./update-professor");


const sendAccomodationLetterSer = sendAccomodationLetterFun({
  userRepository,
  profileRepository,
  accomodationLetterRepository,
});

const getHPStudentRelationSer = getHPStudentRelationFun({
  userRepository,
  clientRequestRepository,
});

const sendAccomodationLetterToProfSer = sendAccomodationLetterToProfFun({
  userRepository,
  profileRepository,
  accomodationLetterRepository,
  professorRepository,
});

const selectStudentSer = selectStudentFun({
  userRepository,
});

const selectHPSer = selectHPFun({
  userRepository,
});

const selectCollegeSer = selectCollegeFun({
  userRepository,
  institutionRepository,
});

const selectProfessorSer = selectProfessorFun({
  userRepository,
  professorRepository,
});

const updateUserSer = updateUserFun({
  userRepository,
  institutionRepository,
});

const deleteDocumentSer = deleteDocumentFun({
  userRepository,
  documentRepository,
  profileRepository,
});

const selectDocumentForSByHpSer = selectDocumentForSByHpFun({
  userRepository,
  profileRepository,
  documentRepository,
});

const selectDocumentSer = selectDocumentFun({
  userRepository,
  profileRepository,
  documentRepository,
});

const selectAccomodationLetterSer = selectAccomodationLetterFun({
  userRepository,
  profileRepository,
  documentRepository,
  accomodationLetterRepository,
});

const approveProfileSer = approveProfileFun({
  userRepository,
});

const addPointOfContactSer = addPointOfContactFun({ userRepository });
const getPointOfContactSer = getPointOfContactFun({
  userRepository,
  institutionRepository,
});

const addProfessorSer = addProfessorFun({
  userRepository,
  professorRepository,
});
const updateProfessorSer = updateProfessorFun({
  userRepository,
  professorRepository,
});

const services = Object.freeze({
  selectStudentSer,
  selectHPSer,
  selectDocumentSer,
  selectDocumentForSByHpSer,
  selectAccomodationLetterSer,
  sendAccomodationLetterToProfSer,
  deleteDocumentSer,
  approveProfileSer,
  addPointOfContactSer,
  getPointOfContactSer,
  selectCollegeSer,
  selectProfessorSer,
  updateUserSer,
  sendAccomodationLetterSer,
  getHPStudentRelationSer,
  addProfessorSer,
  updateProfessorSer
});

module.exports = services;
