const userRepository = require("../../data-access/user");
const profileRepository = require("../../data-access/profile");
const documentRepository = require("../../data-access/document");
const clientRequestRepository = require("../../data-access/client-request");
const institutionRepository = require("../../data-access/institution");

const selectStudentFun = require("./select-student");
const sendClientRequestFun = require("./send-client-request");
const getClientRequestFun = require("./get-client-request");
const removeClientRequestFun = require("./remove-client-request");
const selectDocumentFun = require("./select-document");
const selectDocumentByPSFun = require("./select-docs-by-ps");

const selectStudentSer = selectStudentFun({
  userRepository,
  clientRequestRepository,
});

const selectDocumentSer = selectDocumentFun({
  userRepository,
  profileRepository,
  documentRepository,
});

const selectDocumentByPSSer = selectDocumentByPSFun({
  userRepository,
  profileRepository,
  documentRepository,
  institutionRepository,
});

const sendClientRequestSer = sendClientRequestFun({
  userRepository,
  clientRequestRepository,
});
const getClientRequestSer = getClientRequestFun({
  userRepository,
  clientRequestRepository,
});

const removeClientRequestSer = removeClientRequestFun({
  userRepository,
  clientRequestRepository,
});

const services = Object.freeze({
  selectStudentSer,
  sendClientRequestSer,
  getClientRequestSer,
  removeClientRequestSer,
  selectDocumentSer,
  selectDocumentByPSSer,
});

module.exports = services;
module.exports = {
  selectStudentSer,
  sendClientRequestSer,
  getClientRequestSer,
  removeClientRequestSer,
  selectDocumentSer,
  selectDocumentByPSSer,
};
