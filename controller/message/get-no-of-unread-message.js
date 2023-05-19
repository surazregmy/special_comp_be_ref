const getMessageFun = ({ getNoOfUnreadMessageSer }) => {
  return async function get(httpRequest) {
    // console.log("The user is ");
    // console.log(httpRequest.user);
    const receiverId = httpRequest.params.receiverId;
    // console.log("receiverId");
    // console.log(receiverId);
    const query = httpRequest.query;
    console.log("query is");
    console.log(query);
    const { count } = await getNoOfUnreadMessageSer(httpRequest.user);
    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 200,
      body: { count },
    };
  };
};

module.exports = getMessageFun;
