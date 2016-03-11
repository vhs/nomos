/**
 * Created by Thomas on 3/7/2016.
 */

var http = require('http');
var amqp = require('amqplib');

module.exports = function(config, handler) { return new Events(config, handler); };

var Events = function(config, handler) {
    this.config = config;
    this.handler = handler;

    this.options = {
        host: config.nomos.host,
        path: '/services/web/EventService1.svc/GetEvents',
        method: 'GET',
        headers: { 'X-Api-Key': config.nomos.token }
    };

    this.rabbitmq = "amqp://" + config.rabbitmq.username + ":" + config.rabbitmq.password + "@" + config.rabbitmq.host + ":" + config.rabbitmq.port + "/" + config.rabbitmq.vhost;

    this.connection = null;

    this.events = [];

    this.init();

};

Events.prototype.loadEvents = function(callback) {
    var self = this;

    http.get(self.options, function(res) {
        res.setEncoding('utf8');

        if (res.statusCode == 200) {

            res.on('data', function (chunk) {
                self.events = JSON.parse(chunk);

                if (callback) callback(self.events);
            });
        }
    });
};

Events.prototype.init = function() {
    var self = this;

    amqp.connect(self.rabbitmq).then(function(conn) {
        self.connection = conn;
        var ok = conn.createChannel();
        ok = ok.then(function(ch) {
            self.connected(conn, ch);
        });

        return ok;
    }).then(null, console.warn);
};

Events.prototype.connected = function(conn, channel) {
    var self = this;
    self.loadEvents(function(events) {
        for(var i = 0; i < events.length; i++) {
            (function(event) {
                channel.consume(event.domain + "." + event.event, function (msg) {
                    if (msg != null) {

                        //channel.ack(msg);

                        var data = JSON.parse(msg.content.toString())[0][0];

                        self.handleEvent(event, data);
                    }
                }, { noAck: true}, function(err, ok) { return ok; });
            })(events[i]);
        }
    });
};

Events.prototype.reload = function() {
    if (this.connection != null) {
        this.connection.close();

        this.events = [];

        this.init();
    }
};

Events.prototype.handleEvent = function(event, data) {

    console.log("Event happened: " + JSON.stringify(event));
    console.log("With data: " + JSON.stringify(data));

    this.handler(event, data);
};


/*
open.then(function(conn) {
    var ok = conn.createChannel();

    ok = ok.then(function(ch) {
        //ch.assertQueue("AccessLog.created");

        var options = {
            host: config.nomos.host,
            path: '/services/web/EventService1.svc/GetEvents',
            method: 'GET',
            headers: { 'X-Api-Key': config.nomos.token }
        };

        http.get(options, function(res) {
            res.setEncoding('utf8');

            if (res.statusCode == 200) {

                res.on('data', function (chunk) {

                    var events = JSON.parse(chunk);

                    for(var i = 0; i < events.length; i++) {
                        (function(event) {
                            ch.consume(event.domain + "." + event.event, function (msg) {
                                if (msg != null) {

                                    ch.ack(msg);

                                    if (event.domain == "WebHook")
                                        webhooks.refresh();

                                    var data = JSON.parse(msg.content.toString())[0][0];

                                    handleEvent(event, data);
                                }
                            });
                        })(events[i]);
                    }

                });
            } else {
                console.log(res.statusCode);
            }

        }).on('error', function(e) {
            console.log(e.message);
        });
    });

    return ok;
}).then(null, console.warn);
*/