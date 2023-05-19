const ValidationError = require("../../error/validationError");

const updateInstitution = ({ institutionRepository,userRepository }) => {
  return async function update(user,id, model) {

    const loggedInUser = await userRepository.getByEmail(user);
    if (!loggedInUser) {
      throw new ValidationError("Unauthorized!", 401);
    }

    const isPSSuperAdmin = loggedInUser.isSuperPS;

    if (!isPSSuperAdmin) {
      throw new ValidationError("Unauthorized! Not a Super PS.", 401);
    }

    let institution = model;

    const existingInstituteByName =
      await institutionRepository.getOneCollegeByName(institution.name);

      console.log("existingInstituteByName = ",existingInstituteByName);
    if (existingInstituteByName && existingInstituteByName.id != id) {
      throw new ValidationError("Institution name already exists");
    }

    const existingInstituteByEmail =
      await institutionRepository.getOneCollegeByEmailDomain(
        institution.emailDomain
      );
    if (existingInstituteByEmail && existingInstituteByEmail.id != id) {
      throw new ValidationError("Email domain already exists", 400);
    }

    return institutionRepository.update(id, model);
  };
};

module.exports = updateInstitution;
