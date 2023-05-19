const ValidationError = require("../../error/validationError");
const { sendMail } = require("../../util/emailUtils");
const { verifyToken, generateToken } = require("../../util/tokenUtils");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const resetPassword = ({ authRepository }) => {
  return async function reset({ resetToken, password }) {
    if (!resetToken || resetToken.trim() == "") {
      throw new ValidationError("Reset token can not be empty!", 400);
    }
    if (!password || password.trim() == "") {
      throw new ValidationError("Password  can not be empty!", 400);
    }

    let decoded = {};
    try {
      decoded = jwt.verify(resetToken, process.env.JWT_ACCESS_TOKEN_SECRET);
    } catch (e) {
      if (e instanceof jwt.TokenExpiredError)
        throw new ValidationError("Token is Expired");
      throw new ValidationError("Invalid token");
    }

    const user = await authRepository.getOne(decoded.id);
    if (!user) {
      throw new ValidationError("User not found!");
    }
    const encryptedPassword = await bcrypt.hash(password, 12);
    await authRepository.update(user.id, {
      password: encryptedPassword,
    });

    return { message: "Password Reset successful" };
  };
};

module.exports = resetPassword;
