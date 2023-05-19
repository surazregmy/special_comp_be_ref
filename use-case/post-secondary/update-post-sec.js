const ValidationError = require("../../error/validationError");

const updatePostSec = ({ userRepository, institutionRepository }) => {
  return async function select(user, body) {
    const loggedInUser = await userRepository.getByEmail(user);
    if (!loggedInUser) {
      throw new ValidationError("Unauthorized!", 400);
    }

    if (body.calendlyUrl) {
      if (body.calendlyUrl.trim() == "") {
        throw new ValidationError("calendlyUrl is needed", 400);
      }

      if (!loggedInUser.institutionId) {
        throw new ValidationError(
          "No institution found for this user to updated",
          400
        );
      }
      const institution = await institutionRepository.getOneCollege(
        loggedInUser.institutionId
      );

      if (!institution) {
        throw new ValidationError(
          "No institution found for this user to updated",
          400
        );
      }
      return institutionRepository.update(institution.id, {
        calendlyUrl: body.calendlyUrl,
      });
    }
    const updatedUser = await userRepository.update(loggedInUser.id, body);
    return userRepository.getOne(updatedUser.id);
  };
};

module.exports = updatePostSec;
