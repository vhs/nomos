import { DockerConfigTool, IStage } from '@tyisi/docker-config-tool-js'
import { buildPath, appPath } from '../constants'

export const createBuildFrontendWebStageStage = (dct: DockerConfigTool, { buildStage }: Record<string, IStage>): IStage => {
    const buildFrontendWebStage = dct.withStage({ from: `scratch`, as: `build-frontend-web` })

    buildFrontendWebStage.withWorkDir(buildPath)
    buildFrontendWebStage.withCopy(`/build/packages/frontend-web/`, `${appPath}/frontend-web/`).setLinked().setFrom(buildStage)

    return buildFrontendWebStage
}
