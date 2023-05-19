const ValidationError = require("../../error/validationError");
const { sendMail } = require("../../util/emailUtils");
const {
  generateInvitationTokenForPSByAdmin,
} = require("../../util/tokenUtils");
const { invitationEmailByAdminToPS } = require("../auth/forget_emailcontent");

const addProfessor = ({ userRepository, professorRepository }) => {
  return async function verify({ user, professors }) {
    const loggedInUser = await userRepository.getByEmail(user);
    if (!loggedInUser) {
      throw new ValidationError("Unauthorized!", 401);
    }

    const isPSSuperAdmin = loggedInUser.isSuperPS;

    if (!isPSSuperAdmin) {
      throw new ValidationError("Unauthorized! Not a Super PS.", 401);
    }

    if (professors == null || professors == "" || professors.length < 1) {
      return new ValidationError("Professors are required");
    }

    for (const professor of professors) {
      if (professor.name == null || professor.name == "") {
        throw new ValidationError("One of the professor is missing name", 400);
      }
      if (professor.email == null || professor.email == "") {
        throw new ValidationError("One of the professor is missing email", 400);
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

    // create professors
    let professorsWithIns = professors.map((p) => {
      return { ...p, institutionId: loggedInUser.institutionId };
    });

    // collect all emails
    const emailList = professorsWithIns.map((prof) => prof.email);

    const { existingEmails, notFoundEmails } =
      await professorRepository.checkEmailsExist(
        emailList,
        loggedInUser.institutionId
      );

    console.log("existingEmails");
    console.log(existingEmails);
    console.log(notFoundEmails);

    if (existingEmails.length > 0) {
      throw new ValidationError(
        "Invalid, emails already exists " + existingEmails
      );
    }

    //apparently insertMany returns only count of inserted records. Yes, prisma library not so good :,-(
    const addedprofessors = await professorRepository.addManyProfessors(
      professorsWithIns
    );

    return { professors: addedprofessors };
  };
};

module.exports = addProfessor;
