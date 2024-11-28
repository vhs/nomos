# Nomos

_In greek mythology, Nomos is the personified spirit of law._

This system in a way acts as the rule set for how things are governed, via membership levels and privileges.

## Development

See here for complete setup, API, and philosophy:
https://github.com/vhs/nomos/wiki

For the old development guide, see:
https://github.com/vhs/nomos/wiki/Contributing

### docker-compose

#### Site configuration files

Two configuration files are used, which will vary based on the installation:
`docker/nomos.env`, and `docker-compose.conf`. These should be set up before
running the `docker-compose` setup.

There is a development configuration at `docker-compose.dev.conf`, which can be
used for development.

#### Usage

- Copy `docker-compose.template.conf`, `docker-compose.sample.conf`, or `docker-compose.dev.conf` to `docker-compose.conf`
- Edit/uncomment the relevant lines in `docker-compose.conf` to enable - or even add - specific functionality
- Run `./docker-compose.sh` as a 1:1 wrapper for docker-compose, or generate a
  local `docker-compose.yml` file for direct usage with `docker-compose` with
  `./docker-compose.sh config > docker-compose.yml`

#### Development setup guide

On Linux, first install `docker` and `docker-compose` from your distribution
package manager. On Mac/Windows, you probably want [Docker Desktop], which is a
fancy app that makes and manages a Linux virtual machine that it runs Docker in.

[Docker Desktop]: https://docs.docker.com/get-docker/

Copy `docker/nomos.env.template` to `docker/nomos.env`.

Copy `docker-compose.dev.conf` to `docker-compose.conf`.

Grant write permission to all users on the log directory: `chmod a+w logs`. The
reason this is needed is because the back-end PHP code runs as a non-root user
inside the container, and by default permissions don't grant write access to
non-owners of directories.

Start the service with `./docker-compose.sh up`. This should bring everything up,
but the webhook service will still be failing, which is expected.

To get the webhook service working, run `tools/make-webhook-key.sh`, which will
provide the correct value of `NOMOS_RABBITMQ_NOMOS_TOKEN`. Then, edit that into
`docker/nomos.env`.

Once you have done this, press Ctrl-C in the terminal with `./docker-compose.sh up`,
then run `./docker-compose.sh up` again.

You're all set! You can get the address to access the Nomos service locally by
running the following in a separate terminal as `docker-compose.sh`:

```
$ docker inspect nomos-frontend | jq -r '.[0].NetworkSettings.Networks | to_entries | .[0].value.IPAddress'
```

The username is `vhs` and the password is `password`.
