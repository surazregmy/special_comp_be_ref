const signUpAuthFun = ({ signUpAuthSer }) => {
  return async function get(httpRequest) {
    const user = await signUpAuthSer(httpRequest.body);

    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 200,
      body: user,
    };
  };
};

module.exports = signUpAuthFun;
