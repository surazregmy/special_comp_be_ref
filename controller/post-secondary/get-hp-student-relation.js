const getHPStudentRelationFun = ({ getHPStudentRelationSer }) => {
  return async function get(httpRequest) {

    // console.log("httpRequest = ",httpRequest);
    const { hpStudents, count, totalCount }  = await getHPStudentRelationSer(
      httpRequest.body,
      httpRequest.user,
      httpRequest.query
    );
    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 200,
      body: hpStudents,
      pagination: {
        page: httpRequest.query.page,
        size: httpRequest.query.size,
        count: count,
        totalCount: totalCount,
      },
    };
  };
};

module.exports = getHPStudentRelationFun;
