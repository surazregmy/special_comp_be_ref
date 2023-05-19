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
      throw new ValidationError("No profile exists!", 401);
    }

    if (query.access) {
      if (!["ALL", "STUDENT", "HP"].includes(query.access.toUpperCase())) {
        throw new ValidationError(
          "The access can only be ALL, STUDENT and HP",
          404
        );
      }
    }

    const onlyDocuments = await documentRepository.getDocumentsForPSForInst(
      query,
      loggedInUser.institutionId
    );
    const totalDocuments =
      await documentRepository.getDocumentsForPSForInstTotal(
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
