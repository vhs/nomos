var http = require('http');

module.exports = function(config) { return new Nomos(config); };

var Nomos = function(config) {
    this.config = config;

    this.options = {
        host: this.config.nomos.host,
        headers: { 'X-Api-Key': this.config.nomos.token }
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
    var payload = this.generate(method, path, args);

    var req = http.request(payload.options, function(res) {
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
            console.log("problem with response: " + e.message);
        });
    });

    req.on('error', function(e) {
        console.log("problem with request: " + e.message);
    });

    if (payload.data != null)
        req.write(payload.data);

    req.end();
};

Nomos.prototype.get = function(path, args, callback) {
    console.log("[nomos] GET " + path);
    this.request("GET", path, args, callback);
};

Nomos.prototype.post = function(path, data, callback) {
    console.log("[nomos] POST " + path);
    this.request("POST", path, data, callback);
};

Nomos.prototype.getAllHooks = function(callback) {
    this.get('/services/web/WebHookService1.svc/GetAllHooks', {}, callback);
};

Nomos.prototype.getAllEvents = function(callback) {
    this.get('/services/web/EventService1.svc/GetEvents', {}, callback);
};

Nomos.prototype.disableHook = function(id, callback) {
    console.log("[nomos] Disabling webhook: " + id);
    this.post('/services/web/WebHookService1.svc/EnableHook', { id: id, enabled: false }, callback);
};

Nomos.prototype.getAllDomainDefinitions = function(callback) {
    this.get('/services/web/EventService1.svc/GetDomainDefinitions', {}, callback);
};
