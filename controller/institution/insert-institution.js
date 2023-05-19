const createInstitutionFun = ({ createInstitutionSer }) => {
  return async function get(httpRequest) {
    const model = { ...httpRequest.body };
    const institutions = await createInstitutionSer(model);
    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 200,
      body: institutions,
    };
  };
};

module.exports = createInstitutionFun;
