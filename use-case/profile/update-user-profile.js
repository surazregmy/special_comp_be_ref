const ValidationErrors = require("../../error/validationErrors");
const ValidationError = require("../../error/validationError");
const validateAddress = require("../../helper/validate-address");
const validateEducation = require("../../helper/validate-education");
const validateAvailabilities = require("../../helper/validate-availabilities");
const { PrismaClientKnownRequestError } = require("@prisma/client/runtime");
const { profile } = require("winston");
const bcrypt = require("bcrypt");
const { sendMail } = require("../../util/emailUtils");
const {
  generateToken,
  generateWelcomeToken,
} = require("../../util/tokenUtils");
const { updateEmail } = require("./../auth/forget_emailcontent");

const createShiftFun = ({
  userRepository,
  profileRepository,
  addressRepository,
  educationRepository,
  availabilityRepository,
}) => {
  return async function insert(model, user) {
    console.log("current email", user);

    const loggedInUser = await userRepository.getByEmail(user);
    if (!loggedInUser) {
      throw new ValidationError("Unauthorized!", 401);
    }
    if (model.password) {
      let encryptedPassword = await bcrypt.hash(model.password, 12);
      model.password = encryptedPassword;
    }
    if (model.email) {
      model.isVerified = false;
      model.refreshToken = null;
      const emailExists = await userRepository.getByEmail(model.email);
      if (emailExists) {
        throw new ValidationError("Email already exists!", 400);
      }
    }
    const updatedUser = await userRepository.update(loggedInUser.id, model);
    if (model.email) {
      const token = await generateWelcomeToken(model.email);
      const text = `Please click \n here! `;
      // const html = invitationEmail(email, token);
      const html = updateEmail(updatedUser.fullName, token);
      sendMail({
        to: model.email,
        from: "test",
        subject: "Welcome to Special Compass!",
        text: text,
        html: html,
      });
    }
    return updatedUser;
    // const existingProfile = await profileRepository.getByUserId(
    //   loggedInUser.id
    // );
    // if (existingProfile) {
    //   return profileRepository.getOne(existingProfile.id);
    // } else {
    //   return profileRepository.addInclusive({ userId: loggedInUser.id });
    // }
    // }
    // return true
  };
};

module.exports = createShiftFun;
