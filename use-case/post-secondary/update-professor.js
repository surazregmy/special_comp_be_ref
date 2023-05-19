const ValidationError = require("../../error/validationError");

const updateProfessor = ({ userRepository, professorRepository }) => {
  return async function verify({ user, professor, professorId }) {
    const loggedInUser = await userRepository.getByEmail(user);
    if (!loggedInUser) {
      throw new ValidationError("Unauthorized!", 401);
    }

    const isPSSuperAdmin = loggedInUser.isSuperPS;

    if (!isPSSuperAdmin) {
      throw new ValidationError("Unauthorized! Not a Super PS.", 401);
    }

    const checkProfessor =
      await professorRepository.checkEmailExist(
        professor.email,
        professorId,
        loggedInUser.institutionId
      );

    if (checkProfessor && checkProfessor.id !=professorId) {
      throw new ValidationError(
        "Email already exists"
      );
    }

    const updatedProfessor = await professorRepository.update(professorId, professor);

    return { professor: updatedProfessor };
  };
};

module.exports = updateProfessor;
