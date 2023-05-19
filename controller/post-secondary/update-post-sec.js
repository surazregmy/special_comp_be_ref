const selectShiftFun = ({ updateUserSer }) => {
  return async function get(httpRequest) {
    const clinic = await updateUserSer(httpRequest.user, httpRequest.body);
    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 200,
      body: clinic,
    };
  };
};

module.exports = selectShiftFun;
