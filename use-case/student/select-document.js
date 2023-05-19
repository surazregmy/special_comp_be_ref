const ValidationError = require("../../error/validationError");

const selectShift = ({
  userRepository,
  profileRepository,
  documentRepository,
}) => {
  return async function select(user, query) {
    const loggedInUser = await userRepository.getByEmail(user);
    if (!loggedInUser) {
      throw new ValidationError("Unauthorized!", 401);
    }

    const profile = await profileRepository.getByUserId(loggedInUser.id);

    if (!profile) {
      return {
        clinic: [],
        count: 0,
        totalCount: 0,
      };
    }

    const onlyDocuments =
      await documentRepository.getDocumentsOfStudentWithAllHp(
        query,
        profile.id,
        loggedInUser.id
      );
    const totalDocuments =
      await documentRepository.getDocumentsOfStudentWithAllHpTotal(
        query,
        profile.id,
        loggedInUser.id
      );
    return {
      clinic: onlyDocuments,
      count: onlyDocuments.length,
      totalCount: totalDocuments.length,
    };
  };
};

module.exports = selectShift;
