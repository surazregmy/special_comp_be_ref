const ValidationError = require("../../error/validationError");
const { sendMail } = require("../../util/emailUtils");
const {
  verifyToken,
  generateResetToken,
  generateInvitationToken,
} = require("../../util/tokenUtils");
const { forgetEmail, invitationEmail } = require("./forget_emailcontent");

const sendInvitationLink = ({ authRepository, institutionRepository }) => {
  return async function verify({ email, user, role, institutionId }) {
    if (!email || email.trim() == "") {
      throw new ValidationError("Error! Please provide email", 400);
    }
    const loggedInUser = await authRepository.getByEmail(user);

    if (!loggedInUser) {
      throw new ValidationError(" User does not exists!", 400);
    }
    const invitedUser = await authRepository.getByEmail(email);

    if (invitedUser) {
      throw new ValidationError(" User already exist!", 400);
    }

    if (role == "STUDENT" || role == "POST_SECONDARY_INS") {
      if (!institutionId || institutionId.trim() == "") {
        throw new ValidationError("Error! Please provide insitutionId", 400);
      }
      const institution = await institutionRepository.getOne(institutionId);
      if (!institution) {
        throw new ValidationError(" Institution Id does not exist!", 400);
      }
      if (institution.id != loggedInUser.institutionId) {
        throw new ValidationError(
          " Can not send invitation to anothere institute",
          400
        );
      }
    }

    const token = await generateInvitationToken(
      loggedInUser.id,
      email,
      role,
      institutionId
    );
    const text = `Please click \n here! `;
    // const html = `<p>Hello <strong>${loggedInUser.email}! </strong><br/>  Please find the password reset link <a href="https://specialcompassfe.netlify.app/resetPassword/${token}">Reset Password Here</a><p/>`;
    const html = invitationEmail(email, token, role, institutionId);
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
