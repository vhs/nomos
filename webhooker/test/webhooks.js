var should = require('chai').should();

var webhooksInitializer = require('../webhooks.js');

var defaults = function() {
    return new function(){
        this.mock = {
            nomos: {
                getAllDomainDefinitions: function (callback) {
                    callback({});
                },
                getAllHooks: function(callback) {
                    callback({});
                }
            },
            log: {
                child: function () {
                    return {
                        info: function () {
                        },
                        warn: function () {
                        }
                    };
                }
            }
        };

        this.mock.options = {
            nomos: this.mock.nomos,
            log: this.mock.log
        };
    };
};

describe('WebHooks', function() {
    describe('#translate()', function () {
        it('should translate properly', function() {
            var webhooks = webhooksInitializer(defaults().mock.options);

            var translation = webhooks.translate(
                "{{a}} This would be an example document translate... {{asdf}}",
                {
                    a: "hello world!",
                    asdf: "yerrrup"
                }
            );

            translation.should.be.a("string");
            translation.should.equal("hello world! This would be an example document translate... yerrrup");
        });
    });
});
