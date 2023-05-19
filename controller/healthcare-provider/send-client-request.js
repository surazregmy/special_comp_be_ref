const sendClientRequestFun = ({ sendClientRequestSer }) => {
  return async function get(httpRequest) {

    const res = await sendClientRequestSer(
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

module.exports = sendClientRequestFun;
