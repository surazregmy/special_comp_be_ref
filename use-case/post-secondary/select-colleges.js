const ValidationError = require("../../error/validationError");

const selectCollege = ({ userRepository, institutionRepository }) => {
  return async function select(user, id, query) {
    if (id) {
      const onlyDocuments = await institutionRepository.getOneCollege(id);
      return {
        clinic: onlyDocuments,
        count: onlyDocuments.length,
        totalCount: onlyDocuments.length,
      };
    }
    const onlyDocuments = await institutionRepository.getPublicList(query);
    const totalDocuments = await institutionRepository.getPublicListTotal(
      query
    );
    return {
      clinic: onlyDocuments,
      count: onlyDocuments.length,
      totalCount: totalDocuments.length,
    };
  };
};

module.exports = selectCollege;
