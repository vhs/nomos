/**
 * Created by Thomas on 3/7/2016.
 */

var http = require('http');
var amqp = require('amqplib');

module.exports = function(config, nomos, handler) { return new Events(config, nomos, handler); };

var Events = function(config, nomos, handler) {
    this.config = config;
    this.nomos = nomos;
    this.handler = handler;

    this.rabbitmq = "amqp://" + config.rabbitmq.username + ":" + config.rabbitmq.password + "@" + config.rabbitmq.host + ":" + config.rabbitmq.port + "/" + config.rabbitmq.vhost;

    this.connection = null;

    this.events = [];

    this.init();

};

Events.prototype.loadEvents = function(callback) {
    var self = this;
    self.nomos.getAllEvents(function(data) {
        self.events = data;
        if (callback) callback(self.events);
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

    console.log("[Event] " + event.name + " " + JSON.stringify(data));
    this.handler(event, data);
};
