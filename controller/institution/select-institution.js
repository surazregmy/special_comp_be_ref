const selectInstitutionFun = ({ selectInstitutionSer }) => {
  return async function get(httpRequest) {
    const id = httpRequest.params.id;
    const institutions = await selectInstitutionSer(id);
    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 200,
      body: institutions,
    };
  };
};

module.exports = selectInstitutionFun;
