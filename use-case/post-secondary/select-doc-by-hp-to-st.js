const ValidationError = require("../../error/validationError");

const selectShift = ({
  userRepository,
  profileRepository,
  documentRepository,
}) => {
  return async function select(user, id, query) {
    const loggedInUser = await userRepository.getByEmail(user);
    if (!loggedInUser) {
      throw new ValidationError("Unauthorized!", 401);
    }

    if (id == null || id == "") {
      throw new ValidationError("Student Id is required", 400);
    }
    const student = await userRepository.getOne(id);
    if (!student) {
      throw new ValidationError("Student Id is not found", 400);
    }

    // if no profile then no files are uploaded so returning 0

    const studentProfile = await profileRepository.getByUserId(student.id);
    if (!studentProfile) {
      return {
        clinic: [],
        count: 0,
        totalCount: 0,
      };
    }
    console.log("Student ID");
    console.log(student.id);
    console.log("Student profile ID");
    console.log(studentProfile.id);

    const onlyDocuments =
      await documentRepository.getDocumentsOfStudentWithAllHp(
        query,
        studentProfile.id,
        student.id
      );
    const totalDocuments =
      await documentRepository.getDocumentsOfStudentWithAllHpTotal(
        query,
        studentProfile.id,
        student.id
      );
    return {
      clinic: onlyDocuments,
      count: onlyDocuments.length,
      totalCount: totalDocuments.length,
    };
  };
};

module.exports = selectShift;
