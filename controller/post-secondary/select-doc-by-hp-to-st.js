const selectShiftFun = ({ selectDocumentForSByHpSer }) => {
  return async function get(httpRequest) {
    const query = httpRequest.query;
    console.log("query");
    console.log(query);
    console.log("The user is : " + httpRequest.user);
    const { clinic, count, totalCount } = await selectDocumentForSByHpSer(
      httpRequest.user,
      httpRequest.params.id,
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
