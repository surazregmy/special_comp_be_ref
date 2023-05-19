// approveProfileSer

const addPointOfContact = ({ addPointOfContactSer }) => {
  return async function post(httpRequest) {
    const body = httpRequest.body;
    const { user } = await addPointOfContactSer(httpRequest.user, body);
    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 200,
      body: user,
    };
  };
};

module.exports = addPointOfContact;
