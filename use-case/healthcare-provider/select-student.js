const ValidationError = require("../../error/validationError");



const selectShift = ({ userRepository, clientRequestRepository }) => {
  return async function select(user, query, id) {
    const loggedInUser = await userRepository.getByEmail(user);
    if (!loggedInUser) {
      throw new ValidationError("Unauthorized!", 401);
    }


    const existingStudents = await clientRequestRepository.getExistingStudents(query, loggedInUser)
    const onlyStudents = await userRepository.getStudentsNotHPClients(query, loggedInUser, existingStudents);

    // const all = await userRepository.getStudentsNotHPClientsTotal(query);
    return {
      clinic: onlyStudents,
      count: onlyStudents.length,
      // totalCount: all.length,
    };
  };
};

module.exports = selectShift;
