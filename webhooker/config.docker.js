/**
 * Created by Thomas on 3/7/2016.
 */
exports.settings = {
    rabbitmq: {
        host: process.env.NOMOS_RABBITMQ_HOST || "nomos-rabbitmq",
        port:  process.env.NOMOS_RABBITMQ_PORT || "5672",
        username:  process.env.NOMOS_RABBITMQ_USER || "webhooker",
        password:  process.env.NOMOS_RABBITMQ_PASSWORD || "password",
        vhost:  process.env.NOMOS_RABBITMQ_VHOST || "nomos"
    },
    nomos: {
        host: process.env.NOMOS_RABBITMQ_NOMOS_HOST || "nomos-backend",
        token: process.env.NOMOS_RABBITMQ_NOMOS_TOKEN || ""
    }
};
