const fs = require("fs");

const mq_vhost_file = process.env.MQ_VHOST_FILE || "/run/secrets/mq_vhost";
const mq_user_file = process.env.MQ_USER_FILE || "/run/secrets/mq_user";
const mq_password_file = process.env.MQ_PASSWORD_FILE || "/run/secrets/mq_password";
const webhooker_token_file = process.env.WEBHOOKER_TOKEN_FILE || "/run/secrets/webhooker_token";

const mq_host = process.env.MQ_HOST || "rabbitmq";
const mq_port = "5672";
const mq_vhost = fs.readFileSync(mq_vhost_file, 'utf8').trim();
const mq_user = fs.readFileSync(mq_user_file, 'utf8').trim();
const mq_password = fs.readFileSync(mq_password_file, 'utf8').trim();
const webhooker_token = fs.readFileSync(webhooker_token_file, 'utf8').trim();
const nomos_core_host = process.env.NOMOS_CORE_HOST || "proxy";
const nomos_core_port = "443";
const nomos_core_protocol = "https:";
const nomos_core_rejectUnauthorized = process.env.NOMOS_CORE_REJECTUNAUTHORIZED === "false" ? false : true;

exports.settings = {
    rabbitmq: {
        host: mq_host,
        port: mq_port,
        username: mq_user,
        password: mq_password,
        vhost: mq_vhost
    },
    nomos: {
        host: nomos_core_host,
        port: nomos_core_port,
        protocol: nomos_core_protocol,
        token: webhooker_token,
        rejectUnauthorized: nomos_core_rejectUnauthorized
    }
};
