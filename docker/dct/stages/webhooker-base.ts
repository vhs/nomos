import { DockerConfigTool, IStage } from '@tyisi/docker-config-tool-js'

export const createWebHookerBaseStage = (dct: DockerConfigTool, { baseStage }: Record<string, IStage>): IStage => {
    const webHookerBaseStage = dct.withStage({ from: baseStage, as: `webhooker-base` })

    webHookerBaseStage.withRun(`apk --no-cache add bash`)

    return webHookerBaseStage
}
