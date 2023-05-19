const {
  selectDocumentSer,
  selectDocumentUploadedBySelfSer,
  selectProfSer,
  selectDocsbyPsSer,
  selectDocsbyPsListSer,
  getProfListSer,
  getClientRequestSer,
  manageClientRequestSer,
} = require("../../use-case/student");
// #########

const selectDocumentFun = require("./select-acc-ltr");
const selectDocumentUploadedBySelfFun = require("./select-document");
const selectDocsbyPsFun = require("./select-docs-byps");
const selectDocsbyPsListFun = require("./select-docs-byps-list");
const selectProfFun = require("./select-prof");
const getProfListFun = require("./get-prof-list");
const getClientRequestFun = require("./get-client-request");
const manageClientRequestFun = require("./manage-client-request");

// #########

const selectDocumentController = selectDocumentFun({ selectDocumentSer });
const selectDocumentUploadedBySelfController = selectDocumentUploadedBySelfFun({
  selectDocumentUploadedBySelfSer,
});
const selectDocsbyPsController = selectDocsbyPsFun({ selectDocsbyPsSer });
const selectDocsbyPsListController = selectDocsbyPsListFun({
  selectDocsbyPsListSer,
});
const selectProfController = selectProfFun({ selectProfSer });
const getProfListController = getProfListFun({ getProfListSer });
const getClientRequestController = getClientRequestFun({ getClientRequestSer });
const manageClientRequestController = manageClientRequestFun({
  manageClientRequestSer,
});

const services = Object.freeze({
  selectDocumentController,
  selectDocumentUploadedBySelfController,
  selectProfController,
  selectDocsbyPsController,
  selectDocsbyPsListController,
  getProfListController,
  getClientRequestController,
  manageClientRequestController,
});

module.exports = services;
