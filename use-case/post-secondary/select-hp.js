const ValidationError = require("../../error/validationError");

const selectShift = ({ userRepository }) => {
  return async function select(user, query, id) {
    const loggedInUser = await userRepository.getByEmail(user);
    if (!loggedInUser) {
      throw new ValidationError("Unauthorized!", 401);
    }

    if (id) {
      const userSelected = await userRepository.getOne(id);
      return {
        clinic: userSelected,
        count: 1,
        totalCount: 1,
      };
    }

    const onlyStudents = await userRepository.getOnlyHPs(query);
    const all = await userRepository.getOnlyHPsTotal(query);
    return {
      clinic: onlyStudents,
      count: onlyStudents.length,
      totalCount: all.length,
    };
  };
};

module.exports = selectShift;
