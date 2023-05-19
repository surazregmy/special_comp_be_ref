const sendAccomodationLetterFun = ({ sendAccomodationLetterSer }) => {
  return async function get(httpRequest) {
    console.log("The user is ");
    console.log(httpRequest.user);
    const res = await sendAccomodationLetterSer(
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

module.exports = sendAccomodationLetterFun;
