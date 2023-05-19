// approveProfileSer

const approveProfilefun = ({ approveProfileSer }) => {
    return async function post(httpRequest) {
        const body = httpRequest.body;
        const { user } = await approveProfileSer(httpRequest.user, body);
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
