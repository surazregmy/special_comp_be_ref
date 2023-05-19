const ValidationError = require("../../error/validationError");

const selectCollege = ({ userRepository, professorRepository }) => {
  return async function select(user, query) {
    if (query.institutionId == null || query.institutionId == "") {
      throw new ValidationError("institutionId is required");
    }
    const onlyDocuments = await professorRepository.getPublicList(query);
    const totalDocuments = await professorRepository.getPublicListTotal(query);

    console.log("onlyDocuments.length");
    console.log(onlyDocuments.length);
    console.log(totalDocuments.length);
    return {
      clinic: onlyDocuments,
      count: onlyDocuments.length,
      totalCount: totalDocuments.length,
    };
  };
};

module.exports = selectCollege;
