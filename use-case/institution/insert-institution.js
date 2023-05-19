const createInstitution = ({ institutionRepository }) => {
  return async function create(model) {
    return institutionRepository.add(model);
  };
};

module.exports = createInstitution;
