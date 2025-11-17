module.exports = function (options, callback) {
    return new Domains(options, callback)
}

const Domains = function (options, callback) {
    this.nomos = options.nomos
    this.log = options.log.child({ component: 'Domains' })
    this.domains = {}

    this.refresh(callback)
}

Domains.prototype.refresh = function (callback) {
    const self = this
    self.nomos.getAllDomainDefinitions(function (data) {
        self.domains = data
        if (callback) callback()
    })
}

Domains.prototype.find = function (name) {
    if (this.domains[name] != null) return this.domains[name]

    this.log.warn('Domain does not exist: ' + name)

    return null
}

Domains.prototype.hasAnyPrivilege = function (hook, privileges) {
    for (const privilege of privileges) {
        if (this.hasPrivilege(hook, privilege)) return true
    }

    return false
}

Domains.prototype.hasPrivilege = function (hook, privilege) {
    for (const hookPrivilege of hook.privileges) {
        if (hookPrivilege.code === 'administrator' || hookPrivilege.code === privilege) return true
    }

    return false
}

Domains.prototype.resolve = function (hook, data) {
    const self = this
    const domain = self.find(hook.event.domain)

    let retval = {}

    if (domain == null) return retval

    if (!Object.hasOwn(domain, 'checks')) return retval

    const innerResolve = function (hook, data, check, retval) {
        if (check.type === 'ownership' && data[check.ownership.name] != null && data[check.ownership.name] === hook.userid) return data

        if (check.type === 'table' && self.hasAnyPrivilege(hook, check.privileges)) {
            return data
        }

        if (check.type === 'column' && Object.hasOwn(data, check.column.name) && self.hasAnyPrivilege(hook, check.privileges))
            retval[check.column.name] = data[check.column.name]

        if (check.checks != null) {
            for (const checkCheck of check.checks) retval = innerResolve(hook, data, checkCheck, retval)
        }

        return retval
    }

    for (const domainCheck of domain.checks) retval = innerResolve(hook, data, domainCheck, retval)

    return retval
}
