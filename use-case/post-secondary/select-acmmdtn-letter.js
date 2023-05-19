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

    if (query.studentId) {
      const student = await userRepository.getOne(query.studentId);
      if (!student) {
        throw new ValidationError("Student ID not found!", 400);
      }

      const onlyDocuments =
        await accomodationLetterRepository.getAccomodationLettersByPSForStudent(
          query,
          loggedInUser.id,
          query.studentId
        );
      const totalDocuments =
        await accomodationLetterRepository.getAccomodationLettersByPSForStudentTotal(
          query,
          loggedInUser.id,
          query.studentId
        );
      return {
        clinic: onlyDocuments,
        count: onlyDocuments.length,
        totalCount: totalDocuments.length,
      };
    }

    const onlyDocuments =
      await accomodationLetterRepository.getAccomodationLettersByPS(
        query,
        loggedInUser.institutionId
      );

    const totalDocuments =
      await accomodationLetterRepository.getAccomodationLettersByPSTotal(
        query,
        loggedInUser.institutionId
      );

    return {
      clinic: onlyDocuments,
      count: onlyDocuments.length,
      totalCount: totalDocuments.length,
    };
  };
};

module.exports = selectShift;
