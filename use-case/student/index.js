const userRepository = require("../../data-access/user");
const documentRepository = require("../../data-access/document");
const profileRepository = require("../../data-access/profile");
const accomodationLetterRepository = require("../../data-access/accomodation-letter");
const clientRequestRepository = require("../../data-access/client-request");
const professorRepository = require("../../data-access/professor");

const selectDocumentFun = require("./select-acc-ltr");
const selectDocumentUploadedBySelfFun = require("./select-document");
const selectProfFun = require("./select-prof");
const selectDocsbyPsFun = require("./select-docs-byps");
const selectDocsbyPsListFun = require("./select-docs-byps-list");
const getProfessorListFun = require("./get-professor");
const getClientRequestFun = require("./get-client-request");
const manageClientRequestFun = require("./manage-client-request");

const selectDocumentSer = selectDocumentFun({
  userRepository,
  profileRepository,
  documentRepository,
  accomodationLetterRepository,
});

const selectDocumentUploadedBySelfSer = selectDocumentUploadedBySelfFun({
  userRepository,
  profileRepository,
  documentRepository,
  accomodationLetterRepository,
});

const selectDocsbyPsSer = selectDocsbyPsFun({
  userRepository,
  profileRepository,
  documentRepository,
  accomodationLetterRepository,
});

const selectDocsbyPsListSer = selectDocsbyPsListFun({
  userRepository,
  profileRepository,
  documentRepository,
  accomodationLetterRepository,
});

const selectProfSer = selectProfFun({
  userRepository,
  profileRepository,
  documentRepository,
  accomodationLetterRepository,
  professorRepository,
});
const getClientRequestSer = getClientRequestFun({
  userRepository,
  clientRequestRepository,
});

const manageClientRequestSer = manageClientRequestFun({
  userRepository,
  clientRequestRepository,
});

const getProfListSer = getProfessorListFun({
  userRepository,
  profileRepository,
  documentRepository,
  accomodationLetterRepository,
});

const services = Object.freeze({
  selectDocumentSer,
  selectDocumentUploadedBySelfSer,
  selectProfSer,
  selectDocsbyPsSer,
  selectDocsbyPsListSer,
  getProfListSer,
  getClientRequestSer,
  manageClientRequestSer,
});

module.exports = services;
