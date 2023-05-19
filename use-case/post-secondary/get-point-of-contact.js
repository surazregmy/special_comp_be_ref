const ValidationError = require("../../error/validationError");

const getPointOfContact = ({ userRepository, institutionRepository }) => {
  return async function select(user, { institutionId }) {
    if (institutionId == null || institutionId == "") {
      throw new ValidationError("Institution Id can not be empty", 400);
    }

    const institution = await institutionRepository.getOne(institutionId);
    if (!institution) {
      throw new ValidationError("Institution does not exist!", 400);
    }
    const pointOfContact = await userRepository.getPointOfContact(
      institutionId
    );
    return { user: pointOfContact == null ? {} : pointOfContact };
  };
};

module.exports = getPointOfContact;
