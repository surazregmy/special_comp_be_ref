const removeClientRequestFun = ({ removeClientRequestSer }) => {
  return async function get(httpRequest) {

    // console.log("httpRequest = ",httpRequest);
    const res = await removeClientRequestSer(
      httpRequest.body,
      httpRequest.user
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

module.exports = removeClientRequestFun;
