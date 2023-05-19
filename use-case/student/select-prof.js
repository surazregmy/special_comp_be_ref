const ValidationError = require("../../error/validationError");
const { sendAllNotification } = require("../../util/allnotification");
const { emailNotificationCommon } = require("../auth/forget_emailcontent");

const selectShift = ({
  userRepository,
  profileRepository,
  documentRepository,
  accomodationLetterRepository,
  professorRepository,
}) => {
  return async function select(user, query, body) {
    const loggedInUser = await userRepository.getByEmail(user);
    if (!loggedInUser) {
      throw new ValidationError("Unauthorized!", 401);
    }

    if (!body.accomodationLetterId) {
      throw new ValidationError(
        "Invalid Request! AccomodationLetterId is needed",
        400
      );
    }
    if (!body.professorId || body.professorId.length == 0) {
      throw new ValidationError(
        "Invalid Request! Atleast a professor is needed",
        400
      );
    }
    for (const prof of body.professorId) {
      const profFromDb = await professorRepository.getOne(prof);
      if (!profFromDb) {
        throw new ValidationError("Professor Id not found", 400);
      }
    }
    await accomodationLetterRepository.update(body.accomodationLetterId, {
      professorId: body.professorId,
      status: "SELECTED_PROFESSOR",
    });

    const pointOfContactPS =
      await userRepository.getPointOfContactByInstitution(
        loggedInUser.institutionId
      );

    if (pointOfContactPS) {
      //send Notification
      let subject = `Your student - ${loggedInUser.fullName} has selected a professor.`;
      let type = "S_SELECTED_PROF";
      const emailTemplate = emailNotificationCommon(pointOfContactPS, subject);
      sendAllNotification(
        loggedInUser.id,
        pointOfContactPS.id,
        type,
        subject,
        subject + " Please view by going to accomodation letters.",
        emailTemplate
      );
    }
    const totalDocuments = await accomodationLetterRepository.getOne(
      body.accomodationLetterId
    );
    return {
      clinic: totalDocuments,
      count: totalDocuments.length,
      totalCount: totalDocuments.length,
    };
  };
};

module.exports = selectShift;
