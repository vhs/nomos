/**
 * Created by Thomas on 3/7/2016.
 */

const http = require('http')
const querystring = require('querystring')
const url = require('url')

module.exports = function (options, callback) {
    return new WebHooks(options, callback)
}

const WebHooks = function (options, callback) {
    const self = this
    this.hooks = []

    this.config = options.config
    this.nomos = options.nomos
    this.log = options.log.child({ component: 'WebHooks' })
    this.domains = require('./domains.js')(options, function () {
        self.refresh(callback)
    })
}

WebHooks.prototype.refresh = function (callback) {
    const self = this
    self.nomos.getAllHooks(function (data) {
        self.hooks = []

        for (const hook of data) {
            if (hook.enabled) self.hooks.push(hook)
        }

        if (callback) callback(self.hooks)
    })
}

WebHooks.prototype.hasAccess = function (event, hook) {
    for (let i = 0; i < hook.privileges.length; i++) {
        const hookPriv = hook.privileges[i].code

        if (hookPriv === 'administrator') return true

        for (let j = 0; i < event.privileges.length; j++) {
            if (hookPriv === event.privileges[j].code) return true
        }
    }

    return false
}

WebHooks.prototype.find = function (event) {
    const items = []

    for (const hook of this.hooks) {
        if (hook.event.domain === event.domain && hook.event.event === event.event) {
            if (this.hasAccess(event, hook)) {
                items.push(hook)
            } else {
                this.disable(hook.id)
            }
        }
    }

    return items
}

WebHooks.prototype.disable = function (id) {
    for (let i = 0; i < this.hooks.length; i++) {
        if (this.hooks[i].id === id) {
            this.log.warn({ id }, 'disabling hook ')
            this.hooks.splice(i, 1)
            //this.nomos.disableHook(id); //TODO fix the loops
        }
    }
}

WebHooks.prototype.raise = function (event, data) {
    const hooks = this.find(event)

    for (const hook of hooks) {
        this.send(event, this.domains.resolve(hook, data), hook)
    }
}

WebHooks.prototype.send = function (event, data, hook) {
    const self = this
    const urlObj = new url.URL(this.translate(hook.url, data))

    this.log.info({ event, data, hook, url: urlObj }, 'Calling hook ' + hook.name)

    let param = urlObj.search

    if (hook.method === 'GET') {
        if (param != null) param += '&'
        else param += '?'

        param += querystring.stringify({ event_data: JSON.stringify(data) })
    }

    if (param == null) param = ''

    const options = {
        host: urlObj.hostname,
        port: urlObj.port,
        path: urlObj.pathname + param,
        method: hook.method,
        headers: this.translate(hook.headers, data)
    }

    const req = http.request(options, function (res) {
        self.log.info({ hook, res }, 'Hook response ' + res.statusCode)
    })

    req.on('error', function (e) {
        self.log.warn({ hook, exception: e }, 'Problem with hook request: ' + e.message)
        self.disable(hook.id)
    })

    if (hook.method === 'POST') {
        let body = JSON.stringify(data)
        if (hook.translation != null && hook.translation !== '') body = this.translate(hook.translation, data)

        req.write(body)
    }

    req.end()
}

WebHooks.prototype.translate = function (target, data) {
    const regex = /{{(?:.*?)}}/g

    let translated = target

    let match

    while ((match = regex.exec(target)) !== null) {
        if (match.index === regex.lastIndex) {
            regex.lastIndex++
        }

        const token = match[0]
        const field = match[0].replace('{{', '').replace('}}', '')

        if (data[field] != null) translated = translated.replace(token, data[field])
    }

    return translated
}
