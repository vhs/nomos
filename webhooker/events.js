/**
 * Created by Thomas on 3/7/2016.
 */

var http = require('http');
var amqp = require('amqplib');

module.exports = function (options, handler) {
    return new Events(options, handler);
};

var Events = function (options, handler) {
    this.config = options.config;
    this.nomos = options.nomos;
    this.log = options.log.child({ component: 'Events' });
    this.handler = handler;

    this.rabbitmq =
        'amqp://' +
        this.config.rabbitmq.username +
        ':' +
        this.config.rabbitmq.password +
        '@' +
        this.config.rabbitmq.host +
        ':' +
        this.config.rabbitmq.port +
        '/' +
        this.config.rabbitmq.vhost;

    this.connection = null;

    this.events = [];

    this.init();
};

Events.prototype.loadEvents = function (callback) {
    var self = this;
    self.nomos.getAllEvents(function (data) {
        self.events = data;
        if (callback) callback(self.events);
    });
};

Events.prototype.init = function () {
    var self = this;

    amqp.connect(self.rabbitmq)
        .then(function (conn) {
            self.connection = conn;
            var ok = conn.createChannel();
            ok = ok.then(function (ch) {
                self.connected(conn, ch);
            });

            return ok;
        })
        .then(null, console.warn);
};

Events.prototype.connected = function (conn, channel) {
    var self = this;
    self.loadEvents(function (events) {
        for (var i = 0; i < events.length; i++) {
            (function (event) {
                channel.consume(
                    event.domain + '.' + event.event,
                    function (msg) {
                        if (msg != null) {
                            //channel.ack(msg);

                            var data = JSON.parse(msg.content.toString())[0][0];

                            self.handleEvent(event, data);
                        }
                    },
                    { noAck: true },
                    function (err, ok) {
                        return ok;
                    },
                );
            })(events[i]);
        }
    });
};

Events.prototype.reload = function () {
    if (this.connection != null) {
        this.connection.close();

        this.events = [];

        this.init();
    }
};

Events.prototype.handleEvent = function (event, data) {
    this.log.info({ event: event, data: data }, 'Event triggered ' + event.name);
    this.handler(event, data);
};
