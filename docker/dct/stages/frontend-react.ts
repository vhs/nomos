import { DockerConfigTool, IStage } from '@tyisi/docker-config-tool-js'
import { appPath, nginxWebPath } from '../constants'

export const createFrontendReactStage = (dct: DockerConfigTool, { buildFrontendReactStage }: Record<string, IStage>): IStage => {
    const frontendReactStage = dct.withStage({ from: `nginx:stable-alpine`, as: `frontend-react` })

    frontendReactStage
        .withCopy(`${appPath}/frontend-react/conf/nginx-react-docker-compose.conf`, `/etc/nginx/conf.d/default.conf`)
        .setLinked()
        .setFrom(buildFrontendReactStage)
    frontendReactStage.withCopy(`${appPath}/frontend-react/dist/`, `${nginxWebPath}/`).setLinked().setFrom(buildFrontendReactStage)

    return frontendReactStage
}
