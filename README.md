# Nomos

_In greek mythology, Nomos is the personified spirit of law._

This system in a way acts as the rule set for how things are governed, via membership levels and privileges.

## Configure


For a development configuration:

`sudo npm run build`
`sudo npm run configure`
`sudo npm run deploy:dev`

`sudo bash -c "echo '127.0.0.1 nomos.local.dev.vanhack.ca' >> /etc/hosts"`

`https://nomos.local.dev.vanhack.ca/`

## Cleanup

```
docker stack rm nomos_proxy
docker stack rm nomos

docker system prune
```

Optional:
```
# delete all stopped containers !! not just nomos, although stack rm should clean these all up anyway
docker rm $(docker ps -aq)

#delete all images !! not just nomos images, deletes everything
docker rmi $(docker images -q)

rm -rf /srv/nomos/
```

## Development

See here for complete setup, API, and philosophy:
https://github.com/vhs/membership-manager-pro/wiki

First steps should be installing your test environment:
https://github.com/vhs/membership-manager-pro/wiki/Contributing
