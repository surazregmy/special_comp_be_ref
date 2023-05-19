const ValidationError = require("../../error/validationError");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const emailVerification = ({ authRepository }) => {
  return async function reset({ token }) {
    if (!token || token.trim() == "") {
      throw new ValidationError("Verification token can not be empty!", 400);
    }

    let decoded = {};
    try {
      decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);
    } catch (e) {
      if (e instanceof jwt.TokenExpiredError)
        throw new ValidationError("Expired Token", 401);
      throw new ValidationError("Unable to verify token!", 401);
    }

    //send email
    const user = await authRepository.getByEmail(decoded.email);
    console.log("\n\n\n user === ", user, "\n\n\n");
    if (!user) throw new ValidationError("User not found!", 400);
    if (user.isVerified)
      throw new ValidationError("User already verified!", 400);
    await authRepository.update(user.id, {
      isVerified: true,
    });

    return { message: "Account verified successfully" };
  };
};

module.exports = emailVerification;
