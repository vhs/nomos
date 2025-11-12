# Nomos

_In greek mythology, Nomos is the personified spirit of law._

This system in a way acts as the rule set for how things are governed, via membership levels and privileges.

## Development

See here for complete setup, API, and philosophy:
https://github.com/vhs/nomos/wiki

For the old development guide, see:
https://github.com/vhs/nomos/wiki/Contributing

### Requirements

For development, you'll need the following components/dependencies:

- Docker/Docker Compose
- NodeJS/NPM
- PHP 8.2, and extensions (php-xml, php-curl, php-bcmath, php-zip, php-mbstring)
- jq (`apt install jq`)

All other development dependencies (such as bower, composer, eslint, husky, php-cs-fixer, phpunit, prettier, etc.) will automatically be installed upon running `npm install` after checkout.

### Development setup guide

Install the requirements: [docker and docker-compose](https://docs.docker.com/engine/install/), nodejs, php 8.2 (`apt-get install php8.2`), php extensions (`apt-get install php-xml php-curl php-bcmath php-zip`)

On Mac/Windows, you probably want [Docker Desktop](https://docs.docker.com/get-docker/), which is a fancy app that makes and manages a Linux virtual machine that it runs Docker in.

- Create a docker-compose configuration file:
    - Copy `docker-compose.dev.conf` to `docker-compose.conf`
    - You can also use `docker-compose.template.conf` or `docker-compose.sample.conf` as a starting place.
    - Edit your new `docker-compose.conf` to customize what services are enabled
- Create a docker.env file
    - copy `docker/nomos.env.template` to `docker/nomos.env`.
- run `npm install` in the root directory
- Run `./docker-compose.sh` as a 1:1 wrapper for docker-compose, or generate a
  local `docker-compose.yml` file for direct usage with `docker-compose` with
  `./docker-compose.sh config > docker-compose.yml`

Grant write permission to all users on the log directory: `chmod a+w logs`. The
reason this is needed is because the back-end PHP code runs as a non-root user
inside the container, and by default permissions don't grant write access to
non-owners of directories.

Start the service with `./docker-compose.sh up`. This should bring everything up,
but the webhook service will still be failing, which is expected.

To get the webhook service working, run `tools/make-webhook-key.sh` in another terminal, which will provide the correct value of `NOMOS_RABBITMQ_NOMOS_TOKEN`. Then, edit that into
`docker/nomos.env`.

Once you have done this, press Ctrl-C in the terminal with `./docker-compose.sh up`,
then run `./docker-compose.sh up` again.

You're all set! You can get the address to access the Nomos service from your docker host system by running the following in a separate terminal as `docker-compose.sh`:

```
$ docker inspect nomos-frontend | jq -r '.[0].NetworkSettings.Networks | to_entries | .[0].value.IPAddress'
```

Or make your docker-compose.conf include `docker-compose/core.ports.yml`, to proxy port 80 of your docker network to port 80 on your host machine.

The username is `vhs` and the password is `password`.
