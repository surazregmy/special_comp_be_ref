const uploadFileFun = ({ uploadFilePSSer }) => {
  return async function get(httpRequest) {
    const res = await uploadFilePSSer(
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
