const ValidationError = require("../../error/validationError");

const getHPStudentRelation = ({
  userRepository,
  clientRequestRepository,
}) => {
  return async function get(body, user, query) {
    const loggedInUser = await userRepository.getByEmail(user);
    if (!loggedInUser) {
      throw new ValidationError("Unauthorized!", 401);
    }
    const hpStudents = await clientRequestRepository.getHPStudentRelation(query, loggedInUser);
    const totalDocuments = await clientRequestRepository.getAllHPStudentRelation(query, loggedInUser);
    return {
      hpStudents: hpStudents,
      count: hpStudents.length,
      totalCount: totalDocuments.length,
    };
  };
};


module.exports = getHPStudentRelation;
