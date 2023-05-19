const getMessageFun = ({ getMessageSer }) => {
  return async function get(httpRequest) {
    // console.log("The user is ");
    // console.log(httpRequest.user);
    const receiverId = httpRequest.params.receiverId;
    // console.log("receiverId");
    // console.log(receiverId);
    const query = httpRequest.query;
    console.log("query is");
    console.log(query);
    const { clinic, count, totalCount, unread } = await getMessageSer(
      httpRequest.files,
      { receiverId: receiverId },
      httpRequest.user,
      query
    );
    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 200,
      body: clinic,
      pagination: {
        unread: unread,
        page: httpRequest.query.page,
        size: httpRequest.query.size,
        count: count,
        totalCount: totalCount,
      },
    };
  };
};

module.exports = getMessageFun;
