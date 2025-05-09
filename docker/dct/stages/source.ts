import { DockerConfigTool, IStage } from '@tyisi/docker-config-tool-js'
import { buildPath } from '../constants'

export const createSourceStage = (dct: DockerConfigTool): IStage => {
    const sourceStage = dct.withStage({ from: `scratch`, as: `source` })
    sourceStage.withWorkDir(buildPath)
    sourceStage.withCopy(`./`, `./`).setLinked()

    return sourceStage
}
