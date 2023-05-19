const ValidationError = require("../../error/validationError");
const { sendMail } = require("../../util/emailUtils");
const {
  generateInvitationTokenForPSByAdmin,
} = require("../../util/tokenUtils");
const { invitationEmailByAdminToPS } = require("../auth/forget_emailcontent");

const sendInvitationLink = ({ userRepository, institutionRepository }) => {
  return async function verify({ user, email }) {
    if (!email || email.trim() == "") {
      throw new ValidationError("Error! Please provide email", 400);
    }
    const loggedInUser = await userRepository.getByEmail(user);

    if (!loggedInUser) {
      throw new ValidationError(" User does not exists!", 400);
    }
    const invitedUser = await userRepository.getByEmail(email);

    if (invitedUser) {
      throw new ValidationError(" User already exist!", 400);
    }

    const token = await generateInvitationTokenForPSByAdmin(
      loggedInUser.id,
      email
    );

    const text = `Please click \n here! `;
    const html = invitationEmailByAdminToPS(email, token, "POST_SECONDARY_INS");
    console.log(text);
    try {
      sendMail({
        to: email,
        from: "test",
        subject: "Invitation to Join Special Compass",
        text: text,
        html: html,
      });
    } catch (error) {
      throw new ValidationError("Email Sendding error", 400);
    }
    return { message: "Invitation Link is sent! Please check mail" };
  };
};

module.exports = sendInvitationLink;
