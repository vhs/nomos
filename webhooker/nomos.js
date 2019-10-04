const http = require('http');
const https = require('https');

module.exports = function(options) { return new Nomos(options); };

var Nomos = function(options) {
    this.config = options.config;
    this.log = options.log.child({component: "Nomos"});

    this.client = this.config.nomos.protocol === "https:" ? https : http;

    this.options = {
        host: this.config.nomos.host,
        port: this.config.nomos.port,
        headers: { 'X-Api-Key': this.config.nomos.token },
        rejectUnauthorized: this.config.nomos.rejectUnauthorized
    };
};

Nomos.prototype.generate = function(method, path, args) {
    var options = this.options;
    options.method = method;
    options.path = path;

    var data = null;

    switch(options.method) {
        case "GET":
            var params = "";
            for(var field in args) {
                if (args.hasOwnProperty(field))
                    params += "&" + field + "=" + args[field];
            }

            if (params.length > 0)
                params = params.substr(1, params.length);

            options.path += "?" + params;
            break;
        case "POST":
            data = JSON.stringify(args);
            break;
        default:
            throw "Unsupported method";
    }

    return { options: options, data: data };
};

Nomos.prototype.request = function(method, path, args, callback) {
    var self = this;
    var payload = null;

    try {
        payload = this.generate(method, path, args);
    } catch(e) {
        self.log.warn({exception: e}, "Exception generating request payload: " + e.message);
        return;
    }

    var req = this.client.request(payload.options, function(res) {
        res.setEncoding('utf8');

        var data = "";

        res.on('data', function (chunk) {
            data += chunk;
        });

        res.on('end', function() {
            if (callback) {
                if (data == "") data = "{}";

                callback(JSON.parse(data));
            }
        });

        res.on('error', function (e) {
            self.log.warn({exception: e}, "problem with response: " + e.message);
        });
    });

    req.on('error', function(e) {
        self.log.warn({exception: e}, "problem with request: " + e.message);
    });

    if (payload.data != null)
        req.write(payload.data);

    req.end();
};

Nomos.prototype.get = function(path, args, callback) {
    this.log.info({path: path, args: args},"GET " + path);
    this.request("GET", path, args, callback);
};

Nomos.prototype.post = function(path, data, callback) {
    this.log.info({path: path, data: data},"POST " + path);
    this.request("POST", path, data, callback);
};

Nomos.prototype.getAllHooks = function(callback) {
    this.get('/services/web/WebHookService1.svc/GetAllHooks', {}, callback);
};

Nomos.prototype.getAllEvents = function(callback) {
    this.get('/services/web/EventService1.svc/GetEvents', {}, callback);
};

Nomos.prototype.disableHook = function(id, callback) {
    this.log.warn({id: id},"Disabling webhook " + id);
    this.post('/services/web/WebHookService1.svc/EnableHook', { id: id, enabled: false }, callback);
};

Nomos.prototype.getAllDomainDefinitions = function(callback) {
    this.get('/services/web/EventService1.svc/GetDomainDefinitions', {}, callback);
};
