/**
 * Created by Thomas on 3/7/2016.
 */

var http = require('http');
var url = require('url');
var querystring = require("querystring");

module.exports = function(config) { return new WebHooks(config); };

var WebHooks = function(config) {
    this.hooks = [];

    this.config = config;
    this.options = {
        host: this.config.nomos.host,
        path: '/services/web/WebHookService1.svc/GetAllHooks',
        method: 'GET',
        headers: { 'X-Api-Key': this.config.nomos.token }
    };

    this.refresh();
};

WebHooks.prototype.refresh = function(callback) {
    var self = this;

    http.get(self.options, function(res) {
        if (res.statusCode == 200)
            res.on('data', function(chunk) {
                self.hooks = JSON.parse(chunk);
                if (callback) callback(self.hooks);
            });
    });
};

WebHooks.prototype.find = function(domain, event) {
    var items = [];

    for(var i = 0; i < this.hooks.length; i++) {
        var hook = this.hooks[i];

        if (hook.event.domain == domain && hook.event.event == event) {
            items.push(hook);
        }
    }

    return items;
};

WebHooks.prototype.raise = function(event, data) {

    var hooks = this.find(event.domain, event.event);

    for (var i = 0; i < hooks.length; i++) {
        var hook = hooks[i];

        this.send(event, data, hook);
    }

};

WebHooks.prototype.send = function(event, data, hook) {
    //TODO determine if the webhook has the right privileges for the event. Possibly down to the field level.
    var urlObj = url.parse(this.translate(hook.url, data));

    console.log(JSON.stringify(urlObj));

    var param = urlObj.search;

    if (hook.method == "GET") {
        if (param != null)
            param += "&";
        else
            param += "?";

        param += querystring.stringify({event_data: JSON.stringify(data)});
    }

    var options = {
        host: urlObj.hostname,
        port: urlObj.port,
        path: urlObj.pathname + param,
        method: hook.method,
        headers: this.translate(hook.headers, data)
    };

    var req = http.request(options, function(res) {
        console.log('[hook] ['+hook.url+'] STATUS: ' + res.statusCode);
    });

    req.on('error', function(e) {
        //TODO disable webhook
        console.log('problem with request: ' + e.message);
    });

    if (hook.method == "POST") {

        var body = data;
        if (hook.translation != null && hook.translate !== "")
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
