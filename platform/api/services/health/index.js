module.exports = (TService) => class Health extends TService {
    constructor(options) {
        super(options);
    }

    async get(req, res) {
        return res.json("Everything is awesome");
    }
};
