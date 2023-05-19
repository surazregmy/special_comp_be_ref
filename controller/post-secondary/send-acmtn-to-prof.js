const approveProfilefun = ({ sendAccomodationLetterToProfSer }) => {
  return async function post(httpRequest) {
    const body = httpRequest.body;
    const { user } = await sendAccomodationLetterToProfSer(
      httpRequest.user,
      body
    );
    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 200,
      body: user,
    };
  };
};

module.exports = approveProfilefun;
