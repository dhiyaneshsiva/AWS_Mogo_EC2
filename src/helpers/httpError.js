function makeHttpError({ statusCode, message }) {
    return {
        headers: {
            'Content-Type': 'application/json'
        },
        statusCode,
        data: JSON.stringify({
            success: false,
            error: message
        })
    };
}

//   module.exports = makeHttpError;
module.exports = { makeHttpError };