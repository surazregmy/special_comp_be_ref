const ValidationError = require("../../error/validationError");

const selectShift = ({
  userRepository,
  profileRepository,
  documentRepository,
  accomodationLetterRepository,
  institutionRepository,
}) => {
  return async function select(user, institutionId, query) {
    const loggedInUser = await userRepository.getByEmail(user);
    if (!loggedInUser) {
      throw new ValidationError("Unauthorized!", 401);
    }
    if (institutionId == "" || institutionId == null) {
      throw new ValidationError("institutionId is required", 400);
    }
    console.log("the id is" + institutionId);

    const institution = await institutionRepository.getOneCollege(
      institutionId
    );

    if (!institution) {
      throw new ValidationError("Institution is not found", 400);
    }

    const onlyDocuments =
      await documentRepository.getDocumentsFromPSwithHPAccess(
        query,
        institutionId
      );
    const totalDocuments =
      await documentRepository.getDocumentsFromPSwithHPAccessTotal(
        query,
        institutionId
      );
    return {
      clinic: onlyDocuments,
      count: onlyDocuments.length,
      totalCount: totalDocuments.length,
    };
  };
};

module.exports = selectShift;
