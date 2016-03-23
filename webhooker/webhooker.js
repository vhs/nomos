/**
 * Created by Thomas on 3/7/2016.
 */

//require('daemon')();
var http = require('http');
var config = require('./config.js').settings;
var nomos = require('./nomos.js')(config);
var webhooks = require('./webhooks.js')(config, nomos, function() {
    var events = require('./events.js')(config, nomos, function(event, data) {

        if (event.domain == "WebHook")
            webhooks.refresh();

        if (event.domain == "Event")
            return events.reload(function() {
                webhooks.raise(event, data);
            });

        webhooks.raise(event, data);
    });
});
