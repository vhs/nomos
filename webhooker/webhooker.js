/**
 * Created by Thomas on 3/7/2016.
 */

const bunyan = require('bunyan')
const { Command } = require('commander')

const { settings: config } = require('./config.js')

const program = new Command()

program.version('1.0.0').option('-c, --console', 'Run in non-daemon mode and output log to console').parse(process.argv)

//if (!program.console)
//require('daemon')(); // using start-stop-daemon with upstart for now

const logStreams = []

if (Boolean(process.stdout.isTTY)) {
    logStreams.push({
        stream: process.stdout
    })
} else {
    logStreams.push({
        type: 'rotating-file',
        path: '/app/logs/webhooker.log',
        period: '1d',
        count: 5
    })
}

const log = bunyan.createLogger({
    name: 'webhooker',
    streams: logStreams,
    serializers: {
        req: bunyan.stdSerializers.req,
        res: bunyan.stdSerializers.res,
        hook: function (hook) {
            return {
                id: hook.id,
                name: hook.name,
                url: hook.url,
                userid: hook.userid
            }
        },
        event: function (event) {
            return {
                id: event.id,
                name: event.name,
                domain: event.domain,
                event: event.event
            }
        }
    }
})

const hooker = {
    config,
    log,
    nomos: require('./nomos.js')({ config, log })
}

const webhooks = require('./webhooks.js')(hooker, function () {
    const events = require('./events.js')(hooker, function (event, data) {
        if (event.domain === 'WebHook') webhooks.refresh()

        if (event.domain === 'Event')
            return events.reload(function () {
                webhooks.raise(event, data)
            })

        webhooks.raise(event, data)
    })
})
