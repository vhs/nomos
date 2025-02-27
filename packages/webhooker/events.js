/**
 * Created by Thomas on 3/7/2016.
 */

const amqp = require('amqplib')

module.exports = function (options, handler) {
    return new Events(options, handler)
}

const Events = function (options, handler) {
    this.config = options.config
    this.nomos = options.nomos
    this.log = options.log.child({ component: 'Events' })
    this.handler = handler

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
        this.config.rabbitmq.vhost

    this.connection = null

    this.events = []

    // @ts-ignore
    this.init()
}

Events.prototype.loadEvents = function (callback) {
    const self = this
    self.nomos.getAllEvents(function (data) {
        self.events = data
        if (callback) callback(self.events)
    })
}

Events.prototype.init = function () {
    const self = this

    amqp.connect(self.rabbitmq)
        .then(function (conn) {
            self.connection = conn
            let ok = conn.createChannel()
            // @ts-ignore
            ok = ok.then(function (ch) {
                self.connected(conn, ch)
            })

            return ok
        })
        .then(null, console.warn)
}

Events.prototype.connected = function (_conn, channel) {
    const self = this
    self.loadEvents(function (events) {
        for (const event of events) {
            ;(function (event) {
                channel.consume(
                    event.domain + '.' + event.event,
                    function (msg) {
                        if (msg != null) {
                            //channel.ack(msg);

                            const data = JSON.parse(msg.content.toString())[0][0]

                            self.handleEvent(event, data)
                        }
                    },
                    { noAck: true },
                    function (err, ok) {
                        console.error(err)
                        return ok
                    }
                )
            })(event)
        }
    })
}

Events.prototype.reload = function (cb) {
    if (this.connection != null) {
        this.connection.close()

        this.events = []

        this.init()

        cb()
    }
}

Events.prototype.handleEvent = function (event, data) {
    this.log.info({ event, data }, 'Event triggered ' + event.name)
    this.handler(event, data)
}
