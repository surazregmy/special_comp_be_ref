const sendMessageFun = ({ sendMessageSer }) => {
  return async function get(httpRequest) {
    console.log("The user is ");
    console.log(httpRequest.user);
    const res = await sendMessageSer(
      httpRequest.files,
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

module.exports = sendMessageFun;
