const updateInstitutionFun = ({ updateInstitutionSer }) => {
  return async function get(httpRequest) {
    const id = httpRequest.params.id;
    const model = httpRequest.body;
    const institutions = await updateInstitutionSer(httpRequest.user, id, model);
    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 200,
      body: institutions,
    };
  };
};

module.exports = updateInstitutionFun;
