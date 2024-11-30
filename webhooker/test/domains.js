const should = require('chai').should()

const domainsInitializer = require('../domains.js')

const defaults = function () {
    return new (function () {
        this.mock = {
            nomos: {
                getAllDomainDefinitions: function (callback) {
                    callback({})
                }
            },
            log: {
                child: function () {
                    return {
                        info: function () {},
                        warn: function () {}
                    }
                }
            }
        }

        this.mock.options = {
            nomos: this.mock.nomos,
            log: this.mock.log
        }
    })()
}

describe('Domains', function () {
    describe('#refresh()', function () {
        it('should call nomos to load domain definitions and add them to the domains', function () {
            const domains = domainsInitializer({
                nomos: {
                    getAllDomainDefinitions: function (callback) {
                        callback({ domain: 'definitions' })
                    }
                },
                log: defaults().mock.log
            })

            domains.domains.should.be.an('object')
            domains.domains.should.have.property('domain').equal('definitions')

            domains.nomos.getAllDomainDefinitions = function (callback) {
                callback({ something: 'different' })
            }

            domains.refresh()

            domains.domains.should.be.an('object')
            domains.domains.should.have.property('something').equal('different')
        })
    })

    describe('#find()', function () {
        it('should find a domain by property name and return it', function () {
            const domains = domainsInitializer(defaults().mock.options)

            domains.nomos.getAllDomainDefinitions = function (callback) {
                callback({ a: 'a', b: 'b', c: 'c', d: 'd' })
            }

            domains.refresh()

            let domain = null

            domain = domains.find('a')
            domain.should.be.a('string')
            domain.should.equal('a')

            domain = domains.find('b')
            domain.should.be.a('string')
            domain.should.equal('b')

            domain = domains.find('c')
            domain.should.be.a('string')
            domain.should.equal('c')
        })
        it('should return null if the domain is not found and log a message', function () {
            const domains = domainsInitializer(defaults().mock.options)

            domains.log.warn = function (msg) {
                msg.should.be.a('string')
                msg.should.equal('Domain does not exist: d')
            }

            const domain = domains.find('d')
            should.not.exist(domain)
        })
    })

    describe('#hasPrivilege()', function () {
        it('should always be true if hook has administrator', function () {
            const domains = domainsInitializer(defaults().mock.options)

            const hook = {
                privileges: [{ code: 'administrator' }]
            }

            const has = domains.hasPrivilege(hook, 'abc')

            has.should.be.a('boolean')
            has.should.equal(true)
        })
        it('should always be false if hook has no privileges', function () {
            const domains = domainsInitializer(defaults().mock.options)

            const hook = {
                privileges: []
            }

            const has = domains.hasPrivilege(hook, 'abc')

            has.should.be.a('boolean')
            has.should.equal(false)
        })
        it('should always be true if event has no privileges, as long as we have administrator', function () {
            const domains = domainsInitializer(defaults().mock.options)

            const hook = {
                privileges: [{ code: 'administrator' }]
            }

            const has = domains.hasPrivilege(hook, null)

            has.should.be.a('boolean')
            has.should.equal(true)
        })
        it('should always be false if hook has no privileges', function () {
            const domains = domainsInitializer(defaults().mock.options)

            const hook = {
                privileges: []
            }

            let has = domains.hasPrivilege(hook, null)

            has.should.be.a('boolean')
            has.should.equal(false)

            has = domains.hasPrivilege(hook, 'abc')

            has.should.be.a('boolean')
            has.should.equal(false)
        })
        it("should always be true so long as one of the hook's privileges matches", function () {
            const domains = domainsInitializer(defaults().mock.options)

            const hook = {
                privileges: [{ code: 'a' }, { code: 'b' }, { code: 'c' }, { code: 'access:obj' }]
            }

            let has = domains.hasPrivilege(hook, 'access:obj')

            has.should.be.a('boolean')
            has.should.equal(true)

            has = domains.hasPrivilege(hook, 'b')

            has.should.be.a('boolean')
            has.should.equal(true)
        })
        it("should always be false so long as none of the hook's privileges matches", function () {
            const domains = domainsInitializer(defaults().mock.options)

            const hook = {
                privileges: [{ code: 'a' }, { code: 'b' }, { code: 'c' }, { code: 'access:obj' }]
            }

            let has = domains.hasPrivilege(hook, 'access:obj2')

            has.should.be.a('boolean')
            has.should.equal(false)

            has = domains.hasPrivilege(hook, 'z')

            has.should.be.a('boolean')
            has.should.equal(false)
        })
    })

    describe('#hasAnyPrivilege()', function () {
        it('should always be true if hook has administrator', function () {
            const domains = domainsInitializer(defaults().mock.options)

            const hook = {
                privileges: [{ code: 'administrator' }]
            }

            const has = domains.hasAnyPrivilege(hook, ['abc'])

            has.should.be.a('boolean')
            has.should.equal(true)
        })
        it('should always be false if the hook has no privileges', function () {
            const domains = domainsInitializer(defaults().mock.options)

            const hook = {
                privileges: []
            }

            const has = domains.hasAnyPrivilege(hook, ['abc'])

            has.should.be.a('boolean')
            has.should.equal(false)
        })
        it("should always be false if the event has no privileges, even if we're administrator", function () {
            const domains = domainsInitializer(defaults().mock.options)

            const hook = {
                privileges: ['administrator']
            }

            const has = domains.hasAnyPrivilege(hook, [])

            has.should.be.a('boolean')
            has.should.equal(false)
        })
        it('should be true as long as we have at least one matching privilege', function () {
            const domains = domainsInitializer(defaults().mock.options)

            const hook = {
                privileges: [{ code: 'a' }, { code: 'b' }, { code: 'c' }, { code: 'access:obj' }]
            }

            const has = domains.hasAnyPrivilege(hook, ['access:obj'])

            has.should.be.a('boolean')
            has.should.equal(true)
        })
        it('should be false as long as we have no matching privilege', function () {
            const domains = domainsInitializer(defaults().mock.options)

            const hook = {
                privileges: [{ code: 'a' }, { code: 'b' }, { code: 'c' }, { code: 'access:obj' }]
            }

            const has = domains.hasAnyPrivilege(hook, ['v', 'd', 'access:obj2'])

            has.should.be.a('boolean')
            has.should.equal(false)
        })
    })

    describe('#resolve()', function () {
        it('should return the full data object if we have domain table privileges', function () {
            const domains = domainsInitializer({
                nomos: {
                    getAllDomainDefinitions: function (callback) {
                        callback({
                            mydomain: {
                                checks: [
                                    {
                                        type: 'table',
                                        privileges: ['zxcv']
                                    }
                                ]
                            }
                        })
                    }
                },
                log: defaults().mock.log
            })

            const hook = {
                event: { domain: 'mydomain' },
                privileges: [{ code: 'zxcv' }]
            }

            const data = domains.resolve(hook, {
                all: 'my',
                objects: 'are',
                available: 'because',
                i: 'have',
                permissions: 'woot'
            })

            data.should.be.an('object')
            data.should.have.property('all')
            data.all.should.equal('my')
            data.should.have.property('objects')
            data.objects.should.equal('are')
            data.should.have.property('available')
            data.available.should.equal('because')
            data.should.have.property('i')
            data.i.should.equal('have')
            data.should.have.property('permissions')
            data.permissions.should.equal('woot')
        })
        it('should return partial data object for only the columns I have privileges for', function () {
            const domains = domainsInitializer({
                nomos: {
                    getAllDomainDefinitions: function (callback) {
                        callback({
                            mydomain: {
                                checks: [
                                    {
                                        type: 'table',
                                        privileges: ['zxcv'],
                                        checks: [
                                            {
                                                type: 'column',
                                                column: { name: 'a' },
                                                privileges: ['access:zxcv:a']
                                            },
                                            {
                                                type: 'column',
                                                column: { name: 'b' },
                                                privileges: ['asdf']
                                            },
                                            {
                                                type: 'column',
                                                column: { name: 'c' },
                                                privileges: ['access:zxcv:c']
                                            }
                                        ]
                                    }
                                ]
                            }
                        })
                    }
                },
                log: defaults().mock.log
            })

            const hook = {
                event: { domain: 'mydomain' },
                privileges: [{ code: 'asdf' }]
            }

            const data = domains.resolve(hook, {
                a: 'a',
                b: 'b',
                c: 'c'
            })

            data.should.be.an('object')
            data.should.have.property('b')
            data.b.should.equal('b')
            data.should.not.have.property('a')
            data.should.not.have.property('c')
        })
        it('should return empty data object if I have no privileges', function () {
            const domains = domainsInitializer({
                nomos: {
                    getAllDomainDefinitions: function (callback) {
                        callback({
                            mydomain: {
                                checks: [
                                    {
                                        type: 'table',
                                        privileges: ['zxcv'],
                                        checks: [
                                            {
                                                type: 'column',
                                                column: { name: 'a' },
                                                privileges: ['access:zxcv:a']
                                            },
                                            {
                                                type: 'column',
                                                column: { name: 'b' },
                                                privileges: ['asdf']
                                            },
                                            {
                                                type: 'column',
                                                column: { name: 'c' },
                                                privileges: ['access:zxcv:c']
                                            }
                                        ]
                                    }
                                ]
                            }
                        })
                    }
                },
                log: defaults().mock.log
            })

            const hook = {
                event: { domain: 'mydomain' },
                privileges: [{ code: 'xcvbxvcb' }]
            }

            const data = domains.resolve(hook, {
                a: 'a',
                b: 'b',
                c: 'c'
            })

            data.should.be.an('object')
            data.should.not.have.property('a')
            data.should.not.have.property('b')
            data.should.not.have.property('c')
        })
        it('should return empty data object if I have no privileges and its only a table check', function () {
            const domains = domainsInitializer({
                nomos: {
                    getAllDomainDefinitions: function (callback) {
                        callback({
                            mydomain: {
                                checks: [
                                    {
                                        type: 'table',
                                        privileges: ['zxcv']
                                    }
                                ]
                            }
                        })
                    }
                },
                log: defaults().mock.log
            })

            const hook = {
                event: { domain: 'mydomain' },
                privileges: [{ code: 'xcvbxvcb' }]
            }

            const data = domains.resolve(hook, {
                a: 'a',
                b: 'b',
                c: 'c'
            })

            data.should.be.an('object')
            data.should.not.have.property('a')
            data.should.not.have.property('b')
            data.should.not.have.property('c')
        })
        it('should return full data object if I have ownership', function () {
            const domains = domainsInitializer({
                nomos: {
                    getAllDomainDefinitions: function (callback) {
                        callback({
                            mydomain: {
                                checks: [
                                    {
                                        type: 'ownership',
                                        ownership: { name: 'userid' }
                                    }
                                ]
                            }
                        })
                    }
                },
                log: defaults().mock.log
            })

            const hook = {
                event: { domain: 'mydomain' },
                privileges: [{ code: 'xcvbxvcb' }],
                userid: 123
            }

            const data = domains.resolve(hook, {
                userid: 123,
                b: 'b',
                c: 'c'
            })

            data.should.be.an('object')
            data.should.have.property('userid')
            data.should.have.property('b')
            data.should.have.property('c')
        })
        it('should return no data object if I do not have ownership', function () {
            const domains = domainsInitializer({
                nomos: {
                    getAllDomainDefinitions: function (callback) {
                        callback({
                            mydomain: {
                                checks: [
                                    {
                                        type: 'ownership',
                                        ownership: { name: 'userid' }
                                    }
                                ]
                            }
                        })
                    }
                },
                log: defaults().mock.log
            })

            const hook = {
                event: { domain: 'mydomain' },
                privileges: [{ code: 'xcvbxvcb' }],
                userid: 123
            }

            const data = domains.resolve(hook, {
                userid: 125,
                b: 'b',
                c: 'c'
            })

            data.should.be.an('object')
            data.should.not.have.property('userid')
            data.should.not.have.property('b')
            data.should.not.have.property('c')
        })
        it('should return some data object if I do not have ownership but have column access', function () {
            const domains = domainsInitializer({
                nomos: {
                    getAllDomainDefinitions: function (callback) {
                        callback({
                            mydomain: {
                                checks: [
                                    {
                                        type: 'ownership',
                                        ownership: { name: 'userid' },
                                        checks: [
                                            {
                                                type: 'column',
                                                column: { name: 'c' },
                                                privileges: ['asdf']
                                            }
                                        ]
                                    }
                                ]
                            }
                        })
                    }
                },
                log: defaults().mock.log
            })

            const hook = {
                event: { domain: 'mydomain' },
                privileges: [{ code: 'xcvbxvcb' }, { code: 'asdf' }],
                userid: 123
            }

            const data = domains.resolve(hook, {
                userid: 125,
                b: 'b',
                c: 'c'
            })

            data.should.be.an('object')
            data.should.not.have.property('userid')
            data.should.not.have.property('b')
            data.should.have.property('c')
        })
    })
})
