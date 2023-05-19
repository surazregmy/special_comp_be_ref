const ValidationError = require("../../error/validationError");

const selectShift = ({
  userRepository,
  profileRepository,
  documentRepository,
}) => {
  return async function select(user, query) {
    const loggedInUser = await userRepository.getByEmail(user);
    if (!loggedInUser) {
      throw new ValidationError("Unauthorized!", 401);
    }

    let profile = await profileRepository.getByUserId(loggedInUser.id);

    if (!profile) {
      profile = await profileRepository.addInclusive({
        userId: loggedInUser.id,
      });
    }

    if (query.studentId) {
      const student = await userRepository.getOne(query.studentId);
      const studentProfile = await profileRepository.getByUserId(student.id);

      if (!student) {
        throw new ValidationError("Student with the Id not found!", 401);
      }
      const onlyDocuments = await documentRepository.getDocumentsHPAndStudent(
        query,
        profile.id,
        studentProfile.id,
        student.id
      );
      const totalDocuments =
        await documentRepository.getDocumentsHPAndStudentTotal(
          query,
          profile.id,
          studentProfile.id,
          student.id
        );
      return {
        clinic: onlyDocuments,
        count: onlyDocuments.length,
        totalCount: totalDocuments.length,
      };
    }

    const onlyDocuments = await documentRepository.getDocumentsHP(
      query,
      profile.id
    );

    const totalDocuments = await documentRepository.getDocumentsHPTotal(
      query,
      profile.id
    );
    return {
      clinic: onlyDocuments,
      count: onlyDocuments.length,
      totalCount: totalDocuments.length,
    };
  };
};

module.exports = selectShift;
