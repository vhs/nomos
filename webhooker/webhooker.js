/**
 * Created by Thomas on 3/7/2016.
 */

var program = require('commander');

program
    .version('1.0.0')
    .option('-c, --console', 'Run in non-daemon mode and output log to console')
    .parse(process.argv);

//if (!program.console)
    //require('daemon')(); // using start-stop-daemon with upstart for now

var http = require('http');
var config = require('./config.js').settings;

var bunyan = require('bunyan');

var logStreams = [];

if (program.console) {
    logStreams.push({
        stream: process.stdout
    });
} else {
    logStreams.push({
        type: 'rotating-file',
        path: '../logs/webhooker.log',
        period: '1d',
        count: 5
    });
}

var log = bunyan.createLogger({
    name: 'webhooker',
    streams: logStreams,
    serializers: {
        req: bunyan.stdSerializers.req,
        res: bunyan.stdSerializers.res,
        hook: function(hook) {
            return {
                id: hook.id,
                name: hook.name,
                url: hook.url,
                userid: hook.userid
            };
        },
        event: function(event) {
            return {
                id: event.id,
                name: event.name,
                domain: event.domain,
                event: event.event

            };
        }
    }
});

var hooker = {
    config: config,
    log: log,
    nomos: require('./nomos.js')({ config: config, log: log })
};

var webhooks = require('./webhooks.js')(hooker, function() {
    var events = require('./events.js')(hooker, function(event, data) {

        if (event.domain == "WebHook")
            webhooks.refresh();

        if (event.domain == "Event")
            return events.reload(function() {
                webhooks.raise(event, data);
            });

        webhooks.raise(event, data);
    });
});
