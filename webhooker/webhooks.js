/**
 * Created by Thomas on 3/7/2016.
 */

var http = require('http');
var url = require('url');
var querystring = require("querystring");

module.exports = function(options, callback) { return new WebHooks(options, callback); };

var WebHooks = function(options, callback) {
    var self = this;
    this.hooks = [];

    this.config = options.config;
    this.nomos = options.nomos;
    this.log = options.log.child({component: "WebHooks"});
    this.domains = require('./domains.js')(options, function() {
        self.refresh(callback);
    });
};

WebHooks.prototype.refresh = function(callback) {
    var self = this;
    self.nomos.getAllHooks(function(data) {

        self.hooks = [];
        for (var i = 0; i < data.length; i++) {
            var hook = data[i];

            if (hook.enabled)
                self.hooks.push(hook);
        }

        if (callback) callback(self.hooks);
    });
};

WebHooks.prototype.hasAccess = function(event, hook) {
    for (var i = 0; i < hook.privileges.length; i++) {
        var hookPriv = hook.privileges[i].code;

        if (hookPriv == "administrator")
            return true;

        for(var j = 0; i < event.privileges.length; j++) {
            if (hookPriv == event.privileges[j].code)
                return true;
        }
    }

    return false;
};

WebHooks.prototype.find = function(event) {
    var items = [];

    for(var i = 0; i < this.hooks.length; i++) {
        var hook = this.hooks[i];

        if (hook.event.domain == event.domain && hook.event.event == event.event) {
            if (this.hasAccess(event, hook)) {
                items.push(hook);
            } else {
                this.disable(hook.id);
            }
        }
    }

    return items;
};

WebHooks.prototype.disable = function(id) {
    for(var i = 0; i < this.hooks.length; i++) {
        if (this.hooks[i].id == id) {
            this.log.warn({id: id }, "disabling hook ");
            this.hooks.splice(i, 1);
            //this.nomos.disableHook(id); //TODO fix the loops
        }
    }
};

WebHooks.prototype.raise = function(event, data) {

    var hooks = this.find(event);

    for (var i = 0; i < hooks.length; i++) {
        var hook = hooks[i];

        this.send(event, this.domains.resolve(hook, data), hook);
    }

};

WebHooks.prototype.send = function(event, data, hook) {
    var self = this;
    var urlObj = url.parse(this.translate(hook.url, data));

    this.log.info({event:event, data:data, hook:hook, url: urlObj}, "Calling hook " + hook.name);

    var param = urlObj.search;

    if (hook.method == "GET") {
        if (param != null)
            param += "&";
        else
            param += "?";

        param += querystring.stringify({event_data: JSON.stringify(data)});
    }

    if (param == null) param = "";

    var options = {
        host: urlObj.hostname,
        port: urlObj.port,
        path: urlObj.pathname + param,
        method: hook.method,
        headers: this.translate(hook.headers, data)
    };

    var req = http.request(options, function(res) {
        self.log.info({hook:hook, res: res}, "Hook response " + res.statusCode);
    });

    req.on('error', function(e) {
        self.log.warn({hook:hook, exception: e}, "Problem with hook request: " + e.message);
        self.disable(hook.id);
    });

    if (hook.method == "POST") {

        var body = JSON.stringify(data);
        if (hook.translation != null && hook.translation !== "")
            body = this.translate(hook.translation, data);

        req.write(body);
    }

    req.end();
};

WebHooks.prototype.translate = function(target, data) {
    var regex = /{{(?:.*?)}}/g;

    var translated = target;

    while((match = regex.exec(target)) !== null) {
        if (match.index === regex.lastIndex) {
            regex.lastIndex++;
        }

        var token = match[0];
        var field = match[0].replace("{{", "").replace("}}", "");

        if (data[field] != null)
            translated = translated.replace(token, data[field]);
    }

    return translated;
};
