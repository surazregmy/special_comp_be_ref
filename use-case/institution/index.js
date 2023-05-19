const createInstitutionFun = require("./insert-institution");
const updateInstitutionFun = require("./update-institution");
const deleteInstitutionFun = require("./delete-institution");
const selectInstitutionFun = require("./select-institution");

const institutionRepository = require("../../data-access/institution");
const userRepository = require("../../data-access/user");

const createInstitutionSer = createInstitutionFun({ institutionRepository });
const updateInstitutionSer = updateInstitutionFun({ institutionRepository,userRepository });
const deleteInstitutionSer = deleteInstitutionFun({ institutionRepository });
const selectInstitutionSer = selectInstitutionFun({ institutionRepository });

const services = Object.freeze({
  createInstitutionSer,
  updateInstitutionSer,
  deleteInstitutionSer,
  selectInstitutionSer,
});

module.exports = services;
module.exports = {
  createInstitutionSer,
  updateInstitutionSer,
  deleteInstitutionSer,
  selectInstitutionSer,
};
