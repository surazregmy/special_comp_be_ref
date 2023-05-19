const {
  selectStudentSer,
  selectDocumentSer,
  selectDocumentByPSSer,
  sendClientRequestSer,
  getClientRequestSer,
  removeClientRequestSer,
} = require("../../use-case/healthcare-provider");

const selectStudentFun = require("./select-student");
const selectDocumentFun = require("./select-document");
const selectDocumentByPSFun = require("./select-docs-by-ps");
const sendClientRequestFun = require("./send-client-request");
const getClientRequestFun = require("./get-client-request");
const removeClientRequestFun = require("./remove-client-request");

const selectStudentController = selectStudentFun({ selectStudentSer });
const selectDocumentByPSController = selectDocumentByPSFun({
  selectDocumentByPSSer,
});
const selectDocumentController = selectDocumentFun({ selectDocumentSer });
const sendClientRequestController = sendClientRequestFun({
  sendClientRequestSer,
});
const getClientRequestController = getClientRequestFun({ getClientRequestSer });
const removeClientRequestController = removeClientRequestFun({
  removeClientRequestSer,
});

const services = Object.freeze({
  selectStudentController,
  selectDocumentController,
  selectDocumentByPSController,
  sendClientRequestController,
  getClientRequestController,
  removeClientRequestController,
});

module.exports = services;
