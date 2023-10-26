function adaptRequest(req) {
    return Object.freeze({
        file: req.file,
        files: req.files,
        method: req?.method,
        body: req?.body,
        query: req?.query,
        params: req?.params,
        ip: req?.ip,
        path: req?.path,
        user: req?.user,
        cookies: req?.cookies,
        headers: {
            Authorization: req?.headers['authorization'],
            Referer: req?.get('referer'),
            'Content-Type': req?.get('Content-Type'),
            'User-Agent': req?.get('User-Agent')
        }
    });
};

module.exports = adaptRequest