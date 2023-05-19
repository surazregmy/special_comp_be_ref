const institutionDelete = ({ deleteInstitutionSer }) => {
  return async function get(httpRequest) {
    const id = httpRequest.params.id;

    const institution = await deleteInstitutionSer(id);
    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 200,
      body: institution,
    };
  };
};

module.exports = institutionDelete;
