const deleteInstitution = ({ institutionRepository }) => {
  return async function del(id) {
    return institutionRepository.del(id);
  };
};

module.exports = deleteInstitution;
