const selectShiftFun = ({ selectDocumentByPSSer }) => {
  return async function get(httpRequest) {
    const query = httpRequest.query;
    console.log("query");
    console.log(query);
    console.log("The user is : " + httpRequest.user);
    const id = httpRequest.params.id;
    const { clinic, count, totalCount } = await selectDocumentByPSSer(
      httpRequest.user,
      id,
      query
    );
    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 200,
      body: clinic,
      pagination: {
        page: httpRequest.query.page,
        size: httpRequest.query.size,
        count: count,
        totalCount: totalCount,
      },
    };
  };
};

module.exports = selectShiftFun;
