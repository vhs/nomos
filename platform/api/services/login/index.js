module.exports = (TService) => class Login extends TService {
    constructor(options) {
        super(options);
    }

    async post(req, res) {
        return res.json("Everything is awesome");
    }
};
