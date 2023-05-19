const jwt = require("jsonwebtoken");
const ValidationError = require("../error/validationError");
require("dotenv").config();

const generateToken = async (id) => {
  const verificationToken = jwt.sign(
    { id: id },
    process.env.JWT_ACCESS_TOKEN_SECRET,
    { expiresIn: "7d" }
  );
  return verificationToken;
};

const generateResetToken = async (id) => {
  const verificationToken = jwt.sign(
    { id: id },
    process.env.JWT_ACCESS_TOKEN_SECRET,
    { expiresIn: "1d" }
  );
  return verificationToken;
};

const generateInvitationToken = async (id, email, role, institutionId) => {
  if (role == "HP") {
    const verificationToken = jwt.sign(
      { id: id, email: email, role: role },
      process.env.JWT_ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    return verificationToken;
  }
  const verificationToken = jwt.sign(
    { id: id, email: email, role: role, institutionId: institutionId },
    process.env.JWT_ACCESS_TOKEN_SECRET,
    { expiresIn: "1d" }
  );
  return verificationToken;
};

const generateInvitationTokenForPSByAdmin = async (id, email) => {
  const verificationToken = jwt.sign(
    { id: id, email: email, role: "POST_SECONDARY_INS" },
    process.env.JWT_ACCESS_TOKEN_SECRET,
    { expiresIn: "2d" }
  );
  return verificationToken;
};

const generateWelcomeToken = async (email) => {
  const verificationToken = jwt.sign(
    { email: email },
    process.env.JWT_ACCESS_TOKEN_SECRET,
    { expiresIn: "1d" }
  );
  return verificationToken;
};

const verifyToken = async (token, id) => {
  console.log("The token to verify is");
  console.log(token);
  jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET, (err, decoded) => {
    console.log("decoded");
    console.log(decoded.id);
    console.log("id");
    console.log(id);
    if (err || id !== decoded.id) {
      console.log(err);
      throw new ValidationError("Invalid Token!", 401);
    }
  });
  return true;
};

module.exports = {
  generateToken,
  verifyToken,
  generateResetToken,
  generateInvitationToken,
  generateWelcomeToken,
  generateInvitationTokenForPSByAdmin,
};
