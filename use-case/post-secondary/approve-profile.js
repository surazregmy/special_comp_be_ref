const ValidationError = require("../../error/validationError");

const approveProfile = ({ userRepository }) => {
  return async function select(user, { userId }) {
    const loggedInUser = await userRepository.getByEmail(user);
    if (!loggedInUser) {
      throw new ValidationError("Unauthorized!", 401);
    }
    const userDetails = await userRepository.update(userId, { profileApproved: true }, { new: true })
    return {
      user: userDetails,
      message: "User profile approved",
    };
  };
};

module.exports = approveProfile;
