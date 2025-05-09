import { DockerConfigTool, IStage } from '@tyisi/docker-config-tool-js'
import { buildPath, appPath } from '../constants'

export const createBuildBackendPHPStageStage = (dct: DockerConfigTool, { buildStage }: Record<string, IStage>): IStage => {
    const buildBackendPHPStage = dct.withStage({ from: `scratch`, as: `build-backend-php` })

    buildBackendPHPStage.withWorkDir(buildPath)
    buildBackendPHPStage.withCopy(`/build/packages/backend-php/`, `${appPath}/backend-php/`).setLinked().setFrom(buildStage)

    return buildBackendPHPStage
}
