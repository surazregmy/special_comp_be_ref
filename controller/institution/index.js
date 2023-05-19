const {
  selectInstitutionSer,
  createInstitutionSer,
  updateInstitutionSer,
  deleteInstitutionSer,
} = require("../../use-case/institution");
// #########

const selectInstitutionFun = require("./select-institution");
const createInstitutionFun = require("./insert-institution");
const updateInstitutionFun = require("./update-institution");
const deleteInstitutionFun = require("./delete-institution");

// #########

const selectInstitutionController = selectInstitutionFun({ selectInstitutionSer });
const createInstitutionController = createInstitutionFun({ createInstitutionSer });
const updateInstitutionController = updateInstitutionFun({ updateInstitutionSer });
const deleteInstitutionController = deleteInstitutionFun({ deleteInstitutionSer });

// #########
const services = Object.freeze({
  selectInstitutionController,
  createInstitutionController,
  updateInstitutionController,
  deleteInstitutionController,
});

module.exports = services;