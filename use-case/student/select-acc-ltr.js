const ValidationError = require("../../error/validationError");

const selectShift = ({
  userRepository,
  profileRepository,
  documentRepository,
  accomodationLetterRepository,
}) => {
  return async function select(user, query) {
    const loggedInUser = await userRepository.getByEmail(user);
    if (!loggedInUser) {
      throw new ValidationError("Unauthorized!", 401);
    }

    const onlyDocuments =
      await accomodationLetterRepository.getAccomodationLettersForStudent(
        query,
        loggedInUser.id
      );
    const totalDocuments =
      await accomodationLetterRepository.getAccomodationLettersForStudentTotal(
        query,
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
