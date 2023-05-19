const { check, body } = require("express-validator");
const signUpBodyValidator = [
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password Length should be 8!"),
  check("role")
    .isIn(["STUDENT", "POST_SECONDARY_INS", "HEALTH_PROVIDER"])
    .withMessage("Please provide a valid role!"),
];
module.exports = signUpBodyValidator;
