const markMessage = ({ markMessageSer }) => {
  return async function get(httpRequest) {
    console.log("The user is ");
    console.log(httpRequest.user);

    const body = httpRequest.body;

    const { clinic, count, totalCount } = await markMessageSer(
      httpRequest.user,
      body
    );
    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 200,
      body: clinic,
      pagination: {
        page: httpRequest.query.page,
        size: httpRequest.query.size,
        count: count,
        totalCount: totalCount,
      },
    };
  };
};

module.exports = markMessage;
