const ValidationError = require("../../error/validationError");

const addPointOfContact = ({ userRepository }) => {
  return async function select(user, { psId }) {
    const loggedInUser = await userRepository.getByEmail(user);
    if (!loggedInUser) {
      throw new ValidationError("Unauthorized!", 401);
    }

    const pointOfContactUser = await userRepository.getOne(psId);
    if (!pointOfContactUser) {
      throw new ValidationError("Invalid, psId does not exist");
    }

    if (loggedInUser.institutionId != pointOfContactUser.institutionId) {
      throw new ValidationError(
        "Invalid, you can not add user of another institution as a point of contact"
      );
    }

    //Check if other user are exsiting point of contact and remove them
    const existingPointOfContact = await userRepository.getPointOfContact(
      loggedInUser.institutionId
    );
    if (existingPointOfContact) {
      userRepository.update(existingPointOfContact.id, {
        isPointOfContact: false,
      });
    }
    const userDetails = await userRepository.update(psId, {
      isPointOfContact: true,
    });
    return {
      user: userDetails,
      message: "User added as point of contact",
    };
  };
};

module.exports = addPointOfContact;
