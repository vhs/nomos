import { DockerConfigTool, IStage } from '@tyisi/docker-config-tool-js'
import { buildPath, appPath } from '../constants'

export const createBuildFrontendReactStageStage = (dct: DockerConfigTool, { buildStage }: Record<string, IStage>): IStage => {
    const buildFrontendReactStage = dct.withStage({ from: `scratch`, as: `build-frontend-react` })

    buildFrontendReactStage.withWorkDir(buildPath)
    buildFrontendReactStage.withCopy(`/build/packages/frontend-react/conf/`, `${appPath}/frontend-react/conf/`).setLinked().setFrom(buildStage)
    buildFrontendReactStage.withCopy(`/build/packages/frontend-react/dist/`, `${appPath}/frontend-react/dist/`).setLinked().setFrom(buildStage)

    return buildFrontendReactStage
}
