import { DockerConfigTool, IStage } from '@tyisi/docker-config-tool-js'
import { appPath, nginxWebPath } from '../constants'

export const createFrontendWebStage = (dct: DockerConfigTool, { buildFrontendWebStage }: Record<string, IStage>): IStage => {
    const frontendWebStage = dct.withStage({ from: `nginx:stable-alpine`, as: `frontend-web` })

    frontendWebStage
        .withCopy(`${appPath}/frontend-web/conf/nginx-vhost-docker-compose.conf`, `/etc/nginx/conf.d/default.conf`)
        .setLinked()
        .setFrom(buildFrontendWebStage)
    frontendWebStage.withCopy(`${appPath}/frontend-web/web/`, `${nginxWebPath}/`).setLinked().setFrom(buildFrontendWebStage)

    return frontendWebStage
}
