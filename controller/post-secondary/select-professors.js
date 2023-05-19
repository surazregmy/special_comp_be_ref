const selectShiftFun = ({ selectProfessorSer }) => {
  return async function get(httpRequest) {
    console.log("The user is : " + httpRequest.user);
    console.log("httpRequest.query");
    console.log(httpRequest.query);
    const { clinic, count, totalCount } = await selectProfessorSer(
      httpRequest.user,
      httpRequest.query
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
