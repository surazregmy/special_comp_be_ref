const selectShiftFun = ({ deleteDocumentSer }) => {
  return async function get(httpRequest) {
    const query = httpRequest.query;
    console.log("query");
    console.log(query);
    console.log("The user is : " + httpRequest.user);
    const id = httpRequest.params.id;
    const { clinic, count, totalCount } = await deleteDocumentSer(
      httpRequest.user,
      id,
      { page: 1, size: 10, searchKey: "" }
    );
    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 200,
      body: clinic,
      pagination: {
        page: 1,
        size: 10,
        count: count,
        totalCount: totalCount,
      },
    };
  };
};

module.exports = selectShiftFun;
