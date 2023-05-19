const ValidationError = require("../../error/validationError");

const selectShift = ({
  userRepository,
  profileRepository,
  documentRepository,
  accomodationLetterRepository,
}) => {
  return async function select(user, query) {
    const loggedInUser = await userRepository.getByEmailForDocs(user);
    if (!loggedInUser) {
      throw new ValidationError("Unauthorized!", 401);
    }

    const onlyDocuments = await documentRepository.getDocumentsForStudentsList(
      loggedInUser.institution.id
    );
    const totalDocuments = await documentRepository.getDocumentsForStudentsList(
      loggedInUser.institution.id
    );
    return {
      clinic: onlyDocuments,
      count: onlyDocuments.length,
      totalCount: totalDocuments.length,
    };
  };
};

module.exports = selectShift;
