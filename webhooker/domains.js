module.exports = function (options, callback) {
    return new Domains(options, callback);
};

var Domains = function (options, callback) {
    this.nomos = options.nomos;
    this.log = options.log.child({ component: 'Domains' });
    this.domains = {};

    this.refresh(callback);
};

Domains.prototype.refresh = function (callback) {
    var self = this;
    self.nomos.getAllDomainDefinitions(function (data) {
        self.domains = data;
        if (callback) callback();
    });
};

Domains.prototype.find = function (name) {
    if (this.domains[name] != null) return this.domains[name];

    this.log.warn('Domain does not exist: ' + name);

    return null;
};

Domains.prototype.hasAnyPrivilege = function (hook, privileges) {
    for (var i = 0; i < privileges.length; i++) {
        if (this.hasPrivilege(hook, privileges[i])) return true;
    }

    return false;
};

Domains.prototype.hasPrivilege = function (hook, privilege) {
    for (var i = 0; i < hook.privileges.length; i++) {
        if (hook.privileges[i].code == 'administrator' || hook.privileges[i].code == privilege) return true;
    }

    return false;
};

Domains.prototype.resolve = function (hook, data) {
    var self = this;
    var domain = self.find(hook.event.domain);

    var retval = {};

    if (domain == null) return retval;

    if (!domain.hasOwnProperty('checks')) return retval;

    var innerResolve = function (hook, data, check, retval) {
        if (check.type == 'ownership' && data[check.ownership.name] != null && data[check.ownership.name] == hook.userid) return data;

        if (check.type == 'table' && self.hasAnyPrivilege(hook, check.privileges)) {
            return data;
        }

        if (check.type == 'column' && data.hasOwnProperty(check.column.name) && self.hasAnyPrivilege(hook, check.privileges))
            retval[check.column.name] = data[check.column.name];

        if (check.checks != null) {
            for (var i = 0; i < check.checks.length; i++) retval = innerResolve(hook, data, check.checks[i], retval);
        }

        return retval;
    };

    for (var i = 0; i < domain.checks.length; i++) {
        retval = innerResolve(hook, data, domain.checks[i], retval);
    }

    return retval;
};
