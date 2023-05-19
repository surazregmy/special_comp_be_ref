const getClientRequestFun = ({ getClientRequestSer }) => {
  return async function get(httpRequest) {

    // console.log("httpRequest = ",httpRequest);
    const res = await getClientRequestSer(
      httpRequest.body,
      httpRequest.user,
      httpRequest.query
    );
    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 200,
      body: res,
    };
  };
};

module.exports = getClientRequestFun;
