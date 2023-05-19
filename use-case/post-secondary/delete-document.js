const ValidationError = require("../../error/validationError");

const selectShift = ({
  userRepository,
  documentRepository,
  profileRepository,
}) => {
  return async function select(user, id, query) {
    const loggedInUser = await userRepository.getByEmail(user);
    if (!loggedInUser) {
      throw new ValidationError("Unauthorized!", 401);
    }
    const userProfile = await profileRepository.getByUserId(loggedInUser.id);
    if (!userProfile) {
      throw new ValidationError("No Profile or documents uploaded to delete");
    }
    //verify if its users documents
    const doc = await documentRepository.getByUserIdAndDocumentId(
      userProfile.id,
      id
    );
    if (!doc) {
      throw new ValidationError(
        "Document is not found or this document is not uploaded by this user"
      );
    }
    // delete documents
    await documentRepository.del(id);
    const onlyDocuments = await documentRepository.getDocuments(
      query,
      userProfile.id
    );
    const totalDocuments = await documentRepository.getDocumentsTotal(
      query,
      userProfile.id
    );
    return {
      clinic: onlyDocuments,
      count: onlyDocuments.length,
      totalCount: totalDocuments.length,
    };
  };
};

module.exports = selectShift;
