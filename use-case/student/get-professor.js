const ValidationError = require("../../error/validationError");

const selectShift = ({
  userRepository,
  profileRepository,
  documentRepository,
  accomodationLetterRepository,
}) => {
  return async function select(user, query) {
    const loggedInUser = await userRepository.getByEmail(user);
    if (!loggedInUser) {
      throw new ValidationError("Unauthorized!", 401);
    }

    let professorList = [
      {
        name: "Professor 1",
        email: "Professor1@yopmail.com",
      },
      {
        name: "Professor 2",
        email: "Professor2@yopmail.com",
      },
      {
        name: "Professor 3",
        email: "Professor3@yopmail.com",
      },
    ];

    return {
      clinic: professorList,
      count: professorList.length,
      totalCount: professorList.length,
    };
  };
};

module.exports = selectShift;
