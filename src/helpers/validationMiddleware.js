const adaptRequest = require("./adaptRequest");

const makeValidationMiddleware = (validationCallback) => {
    return (req, res, next) => {
        const httpReq = adaptRequest(req);

        const { valid, error } = validationCallback(httpReq.body);

        if (valid) {
            return next();
        }

        res.status(400).send({
            success: false,
            error,
            message: "Bad Request. Invalid request body",
        });
    };
};

module.exports = { makeValidationMiddleware };
