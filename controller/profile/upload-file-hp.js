const uploadFileFun = ({ uploadFileHPSer }) => {
  return async function get(httpRequest) {
    const res = await uploadFileHPSer(
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

module.exports = uploadFileFun;
