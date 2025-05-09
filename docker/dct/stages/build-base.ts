import { DockerConfigTool, IStage } from '@tyisi/docker-config-tool-js'
import { buildDependencies } from '../constants'

export const createBuildBaseStage = (dct: DockerConfigTool, { baseStage }: Record<string, IStage>): IStage => {
    const buildBaseStage = dct.withStage({ from: baseStage, as: `build-base` })

    buildBaseStage.withRun([`apk --no-cache add`, ...buildDependencies])

    return buildBaseStage
}
