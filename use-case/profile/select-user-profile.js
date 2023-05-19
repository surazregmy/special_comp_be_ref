const ValidationErrors = require("../../error/validationErrors");
const ValidationError = require("../../error/validationError");
const validateAddress = require("../../helper/validate-address");
const validateEducation = require("../../helper/validate-education");
const validateAvailabilities = require("../../helper/validate-availabilities");
const { PrismaClientKnownRequestError } = require("@prisma/client/runtime");

const createShiftFun = ({
  userRepository,
  profileRepository,
  addressRepository,
  educationRepository,
  availabilityRepository,
}) => {
  return async function insert(model, user) {
    const loggedInUser = await userRepository.getByEmail(user);
    if (!loggedInUser) {
      throw new ValidationError("Unauthorized!",401);
    }
    model.userId = loggedInUser.id;

    const existingProfile = await profileRepository.getByUserId(
      loggedInUser.id
    );
    if (existingProfile) {
      return profileRepository.getOne(existingProfile.id);
    } else {
      return profileRepository.addInclusive({ userId: loggedInUser.id });
    }
  };
};

module.exports = createShiftFun;
