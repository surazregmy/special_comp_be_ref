const selectNotificationFun = ({ selectNotificationSer }) => {
  return async function get(httpRequest) {
    console.log("User is ");
    console.log(httpRequest.user);
    const query = httpRequest.query;
    console.log("query is");
    console.log(query);
    const { notifications, count, totalCount } = await selectNotificationSer(httpRequest.user, query);
    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 200,
      body: notifications,
      pagination: {
        page: httpRequest.query.page,
        size: httpRequest.query.size,
        count: count,
        totalCount: totalCount,
      },
    };
  };
};

module.exports = selectNotificationFun;
