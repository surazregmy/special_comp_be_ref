const selectInstitution = ({ institutionRepository }) => {
  return async function select(id) {
    if (id) {
      return institutionRepository.getOne(id);
    } else {
      return institutionRepository.get();
    }
  };
};

module.exports = selectInstitution;
