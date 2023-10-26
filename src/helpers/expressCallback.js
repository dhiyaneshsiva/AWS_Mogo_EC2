const adaptRequest = require("./adaptRequest");
const makeExpressCallback = (controller) => {
  return (req, res,) => {
    const httpReq = adaptRequest(req);
    controller(httpReq)
      .then((httpResponse) => {

        if (httpResponse.headers) {
          res.set(httpResponse.headers);
        }

        if (httpResponse.refreshToken) {
          res.cookie('__invapp', httpResponse.refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
          });
        }

        res.type('json');
        res.status(httpResponse.statusCode).send(httpResponse.data);
      })
      .catch((e) => {
        res.status(500).send({
          error: 'An unknown error occurred.',
          errorMessage: e?.message || 'UNKNOWN'
        });
      });
  };
};

module.exports = { makeExpressCallback };
