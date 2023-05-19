const ValidationError = require("../../error/validationError");
const { sendMail } = require("../../util/emailUtils");
const { accomodationLetterTemplate } = require("../auth/forget_emailcontent");

const approveProfile = ({
  userRepository,
  accomodationLetterRepository,
  professorRepository,
}) => {
  return async function select(user, body) {
    const loggedInUser = await userRepository.getByEmail(user);
    if (!loggedInUser) {
      throw new ValidationError("Unauthorized!", 401);
    }

    const { accomodationLetterId, professorId } = body;

    if (accomodationLetterId == null || accomodationLetterId == "") {
      throw new ValidationError("accomodationLetterId is required!", 400);
    }

    if (professorId == null || professorId == "") {
      throw new ValidationError("Professor is required!", 400);
    }

    let professors = [];
    for (let prof of body.professorId) {
      const profFromDb = await professorRepository.getOne(prof);
      if (!profFromDb) {
        throw new ValidationError("Professor Id not found", 400);
      }
      professors.push({ name: profFromDb.name, email: profFromDb.email });
    }

    const accomodationLetter = await accomodationLetterRepository.getOne(
      accomodationLetterId
    );

    for (let pro of professors) {
      console.log("pro");
      console.log(pro);
      let html = accomodationLetterTemplate(pro, accomodationLetter);
      sendMail({
        to: pro.email,
        from: "specialcompass@gmail.com",
        subject: "You have received accomodation letter for a student",
        text: "text",
        html: html,
      });
    }
    await accomodationLetterRepository.update(accomodationLetterId, {
      status: "SENT_TO_PROFESSOR",
    });
    return {
      user: "Email Sent to professors successfully",
      message: "Email Send Successful",
    };
  };
};

module.exports = approveProfile;
