const ValidationError = require("../../error/validationError");

const selectShift = ({ userRepository }) => {
  return async function select(user) {
    const loggedInUser = await userRepository.getByEmail(user);
    if (!loggedInUser) {
      throw new ValidationError("Unauthorized!", 401);
    }
    return "In the success!";
  };
};

module.exports = selectShift;
