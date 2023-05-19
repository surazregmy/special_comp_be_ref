const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ValidationError = require("../../error/validationError");
const { sendMail } = require("../../util/emailUtils");
const { capitalizeFirstLetter } = require("../../util/stringUtil");
const {
  generateToken,
  generateWelcomeToken,
} = require("../../util/tokenUtils");
const { welcomeEmail } = require("./forget_emailcontent");
const userRepository = require("../../data-access/user");
require("dotenv").config();

function validatePassword(password) {
  const strongPasswordRegex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
  return strongPasswordRegex.test(password);
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validateFullName(fullName) {
  const maxNameLength = 50;
  return fullName.length <= maxNameLength;
}
const signUpAuth = ({
  authRepository,
  profileRepository,
  institutionRepository,
}) => {
  return async function signup(info) {
    const {
      fullName,
      studentId,
      psEmployeeId,
      hcEmployeeId,
      institutionId,
      password,
      role,
      registrationToken,
    } = info;

    let { email, byPassRegistration, isInvitedByAdmin } = info;

    let isPSInvitedByAdmin = false;
    if (
      isInvitedByAdmin != null &&
      isInvitedByAdmin != "" &&
      isInvitedByAdmin == true
    ) {
      isPSInvitedByAdmin = true;
    }

    let collegeName = "";
    let isPointOfContact = false;

    if (byPassRegistration == "" || byPassRegistration == null) {
      byPassRegistration = false;
    }

    if (!password) {
      throw new ValidationError("Email Or Password is required", 400);
    }
    if (!role) {
      throw new ValidationError("Role is Required", 400);
    }
    if (role == "STUDENT") {
      if (!email) {
        throw new ValidationError("Email Or Password is required", 400);
      }
      if (!studentId) {
        throw new ValidationError("Student Id is Required", 400);
      }
      if (!institutionId) {
        throw new ValidationError("Institution Id is Required", 400);
      }
      const college = await institutionRepository.getOneCollege(institutionId);
      if (!college) {
        throw new ValidationError("Institution Id is not found", 400);
      }
      collegeName = college.name;
    }
    let invitedUserId = "";

    // Invited By ADMIN
    if (role == "POST_SECONDARY_INS" && isPSInvitedByAdmin) {
      const { institution, professors } = info;
      if (institution == null || institution == "") {
        throw new ValidationError("Institution  is required", 400);
      }
      if (institution.name == null || institution.name == "") {
        throw new ValidationError("Institution Name is required", 400);
      }
      if (institution.emailDomain == null || institution.emailDomain == "") {
        throw new ValidationError("Institution Domain is required", 400);
      }
      if (professors) {
        if (professors.length > 0) {
          for (const professor of professors) {
            if (professor.name == null || professor.name == "") {
              throw new ValidationError(
                "One of the professor is missing name",
                400
              );
            }
            if (professor.email == null || professor.email == "") {
              throw new ValidationError(
                "One of the professor is missing email",
                400
              );
            }
          }
          // check if duplicate exists
          const hasDuplicate = professors.some((prof, index) => {
            return (
              professors.findIndex((innerProf) => {
                return (
                  innerProf.email == prof.email &&
                  index != professors.indexOf(innerProf)
                );
              }) != -1
            );
          });

          if (hasDuplicate) {
            throw new ValidationError("Professor Email is duplicated", 400);
          }
        }
      }
      // All Good to this point
      //Check if the institute already exist
      const existingInstituteByName =
        await institutionRepository.getOneCollegeByName(institution.name);
      if (existingInstituteByName) {
        throw new ValidationError("Institution already Exists", 400);
      }

      const existingInstituteByEmail =
        await institutionRepository.getOneCollegeByEmailDomain(
          institution.emailDomain
        );
      if (existingInstituteByEmail) {
        throw new ValidationError("Email domain already Exists", 400);
      }

      let email = "";
      validateAll(password, email, fullName, false);

      //
      let decoded = {};
      try {
        decoded = jwt.verify(
          registrationToken,
          process.env.JWT_ACCESS_TOKEN_SECRET
        );
      } catch (e) {
        console.log(e);
        throw new ValidationError("Invalid Registration Token");
      }
      const user = await authRepository.getOne(decoded.id);
      email = decoded.email;
      invitedUserId = user.id;

      const duplicate = await authRepository.getByEmail(email);
      if (duplicate) {
        throw new ValidationError("Email Already Exists!");
      }

      const encryptedPassword = await bcrypt.hash(password, 12);
      //All Good to this point. Insert
      await institutionRepository.insertInstitutionWithProfessorsAndSuperPs({
        user: {
          fullName: capitalizeFirstLetter(fullName),
          email,
          psEmployeeId,
          hcEmployeeId,
          studentId,
          institutionId,
          collegeName: collegeName,
          password: encryptedPassword,
          role,
          isPointOfContact,
          // refreshToken,
          invitedUserId,
        },
        institution: institution,
        professors: professors,
      });

      return {
        message: "Sign In successful. Please login`" + "`.",
      };
    }

    // Invited by POST SECONDARY
    if (role == "POST_SECONDARY_INS" && isPSInvitedByAdmin == false) {
      validateAll(password, email, fullName, false);
      if (!psEmployeeId) {
        throw new ValidationError(
          "Post Secondary Employee Id is Required",
          400
        );
      }
      if (!institutionId) {
        throw new ValidationError("Institution Id is Required", 400);
      }
      const college = await institutionRepository.getOneCollege(institutionId);
      if (!college) {
        throw new ValidationError("Institution Id is not found", 400);
      }
      collegeName = college.name;

      if (!byPassRegistration) {
        if (!registrationToken || registrationToken == "") {
          throw new ValidationError(
            "Registration Token is Required for Post Secondary Employee to Sign Up",
            400
          );
        }

        let decoded = {};
        try {
          decoded = jwt.verify(
            registrationToken,
            process.env.JWT_ACCESS_TOKEN_SECRET
          );
        } catch (e) {
          throw new ValidationError("Invalid Registration Token");
        }
        const user = await authRepository.getOne(decoded.id);
        email = decoded.email;

        if (!user) {
          throw new ValidationError("Invalid JWT Token");
        }
        if (!email) {
          throw new ValidationError("Problem in Link");
        }
        invitedUserId = user.id;
      }
      // Add Point of Contact Default
      const existingisPointOfContact = await userRepository.getPointOfContact(
        institutionId
      );
      if (!existingisPointOfContact) {
        isPointOfContact = true;
      }
    }

    if (role == "HEALTH_PROVIDER" && registrationToken != null) {
      validateAll(password, email, fullName, false);
      if (!hcEmployeeId) {
        throw new ValidationError("Health Care Employee Id is Required", 400);
      }
      if (!byPassRegistration) {
        if (!registrationToken || registrationToken == "") {
          throw new ValidationError(
            "Registration Token is Required for Post Secondary Employee to Sign Up",
            400
          );
        }

        let decoded = {};
        try {
          decoded = jwt.verify(
            registrationToken,
            process.env.JWT_ACCESS_TOKEN_SECRET
          );
        } catch (e) {
          throw new ValidationError("Invalid Registration Token");
        }
        const user = await authRepository.getOne(decoded.id);
        email = decoded.email;

        if (!user) {
          throw new ValidationError("Invalid JWT Token");
        }
        if (!email) {
          throw new ValidationError("Problem in Link");
        }
        invitedUserId = user.id;
      }
    } else if (role == "HEALTH_PROVIDER") {
      validateAll(password, email, fullName, true);
      if (!hcEmployeeId) {
        throw new ValidationError("Health Care Employee Id is Required", 400);
      }
    }

    const duplicate = await authRepository.getByEmail(email);
    if (duplicate) {
      throw new ValidationError("User Already Exists!");
    }
    const encryptedPassword = await bcrypt.hash(password, 12);

    const newuser = await authRepository.add({
      fullName: capitalizeFirstLetter(fullName),
      email,
      psEmployeeId,
      hcEmployeeId,
      studentId,
      institutionId,
      collegeName: collegeName,
      password: encryptedPassword,
      role,
      isPointOfContact,
      // refreshToken,
      invitedUserId,
    });

    // Also create profile for each user
    await profileRepository.addInclusive({ userId: newuser.id });

    const token = await generateWelcomeToken(newuser.email);

    console.log("\n\n newuser = ", newuser);
    const text = `Please click \n here! `;
    // const html = invitationEmail(email, token);
    const html = welcomeEmail(newuser.fullName, token);

    console.log(text);
    sendMail({
      to: email,
      from: "test",
      subject: "Welcome to Special Compass!",
      text: text,
      html: html,
    });
    return {
      // user: newuser,
      // accessToken: accessToken,
      // refreshToken: refreshToken,
      message: "Verification email sent at `" + newuser.email + "`.",
    };
  };
};

module.exports = signUpAuth;

function validateAll(password, email, fullName, isEmailRequired) {
  if (!validatePassword(password)) {
    throw new ValidationError(
      "Strong password is required! (1 uppercase, 1 lowercase, 1 special character, 1 numeric, minimum 8 characters)."
    );
  }

  if (isEmailRequired)
    if (!validateEmail(email)) {
      throw new ValidationError("Invalid Email");
    }

  if (!validateFullName(fullName)) {
    throw new ValidationError(
      `Full name exceeds the maximum length of 50 characters.`
    );
  }
}
