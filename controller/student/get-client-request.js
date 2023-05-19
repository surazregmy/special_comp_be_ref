const getClientRequestFun = ({ getClientRequestSer }) => {
  return async function get(httpRequest) {

    // console.log("httpRequest = ",httpRequest);
    const { clientRequests, count, totalCount } = await getClientRequestSer(
      httpRequest.body,
      httpRequest.user,
      httpRequest.query
    );
    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 200,
      body: clientRequests,
      pagination: {
        page: httpRequest.query.page,
        size: httpRequest.query.size,
        count: count,
        totalCount: totalCount,
      },
    };
  };
};

module.exports = getClientRequestFun;
