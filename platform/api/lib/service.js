const SUPPORTED_METHODS = [
    'get', 'post', 'put', 'patch', 'delete', 'head', 'options', 'trace'
];

module.exports = class Service {
    constructor(opts) {
        this.opts = opts || {};
    }

    handle(req, res) {
        const method = (req.method || 'get').toLowerCase();

        if(SUPPORTED_METHODS.includes(method) && Reflect.has(this, method)) {
            this[method](req, res)
                .catch((err) => {
                    if (err && err.code) {
                        res.status(err.code);
                    }

                    if (err && err.message) {
                        res.json(err.message);
                    }
                });
        } else {
            res.status(400).json('Method not supported');
        }
    }

    async get() { throw new HTTPError(400, 'Method not supported'); }
    async post() { throw new HTTPError(400, 'Method not supported'); }
    async put() { throw new HTTPError(400, 'Method not supported'); }
    async patch() { throw new HTTPError(400, 'Method not supported'); }
    async delete() { throw new HTTPError(400, 'Method not supported'); }
    async head() { throw new HTTPError(400, 'Method not supported'); }
    async options() { throw new HTTPError(400, 'Method not supported'); }
    async trace() { throw new HTTPError(400, 'Method not supported'); }
};

class HTTPError extends Error {
    constructor(code, message) {
        super(message);

        this.code = code;
    }

    get statusCode() {
        return this.code;
    }
}
