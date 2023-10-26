const adaptRequest = require("./adaptRequest");

const makeAuthMiddleware = (handleAuthCallback) => {
    return async (req, res, next) => {
        const httpReq = adaptRequest(req);
        try {
            const result = await handleAuthCallback(httpReq.headers);
            if (result && result.data && result.data.success) {
                req.user = { id: result.data.data.id };
                return next();
            } else {
                req.user = undefined;
                const statusCode = result ? result.statusCode : 500;
                const responseMessage = result ? result.message : 'Internal Server Error';
                res.status(statusCode).send({
                    success: false,
                    error: responseMessage,
                });
            }
        } catch (error) {
            res.status(500).send({
                success: false,
                error: 'Internal Server Error',
            });
        }
    };
};

module.exports = { makeAuthMiddleware };
