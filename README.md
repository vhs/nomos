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

- Docker and Docker Compose
- NodeJS and PNPM
- PHP 8.2, and extensions (`php-xml`, `php-curl`, `php-bcmath`, `php-zip`, `php-mbstring`)
- jq (`apt install jq`)

All other development dependencies (just, bower, composer, husky, php-cs-fixer, phpunit, prettier, etc.) will automatically be installed upon running `pnpm install` after checkout.

### Development setup guide

1. Install the requirements:

- [docker and docker-compose](https://docs.docker.com/engine/install/)
- [nodejs](https://nodejs.org/en/download) (v20 or newer)
- [pnpm](https://pnpm.io) - a package manager like npm, that handles repos with multiple packages, like this one
    - `sudo npm install --global corepack@latest`
    - `corepack enable pnpm`
- php 8.2 (`apt-get install php8.2`)
- php extensions (`apt-get install php-xml php-curl php-bcmath php-zip php-mbstring`)

2. Create a docker.env file

- copy `docker-compose/nomos.env.template` to `docker-compose/nomos.env`.

3. Grant write permissions to the logs directory:

- `chmod a+w logs`
- This is needed is because the back-end PHP code runs as a non-root user
  inside the container.

3. install dependencies

- run `pnpm install` in the root directory

4. run docker

- `pnpm start` will run all packages
- `pnpm start:db` will run only the database server
- `pnpm start:backend` will run only the php backend
- `pnpm start:frontend-web` will run the legacy Angular frontend
- `pnpm start:frontend-react` will run the newer React frontend

The username is `vhs` and the password is `password`.

## dev cycle

With the docker containers running, you should be able to view nomos at http://127.0.0.1/

By default, frontend-react is mounted at `/` and frontend-web is mounted at `/v1/`

If you make changes to `packages/backend-php` or `packages/frontend-web` you'll need to re-start the docker container for them to take effect.

If you make changes to `packages/frontend-react` you'll need to `cd packages/frontend-react && pnpm run build` for changes to take effect.

# Webhooks

`docker-compose.yml` does not start rabbitmq or `packages/webhooker`. These services are slated for removal.

To get the webhook service working:

1. edit the `docker-compose.yml` to start rabbitmq and webhooker (see git history for old yml files)
2. run `tools/make-webhook-key.sh` in another terminal, which will provide the correct value of `NOMOS_RABBITMQ_NOMOS_TOKEN`. Then, edit that into
   `docker-compose/nomos.env`.
3. Once you have done this, press Ctrl-C in the terminal with `./docker-compose.sh up`,
   then run `./docker-compose.sh up` again.
