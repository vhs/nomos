import { DockerConfigTool, IStage } from '@tyisi/docker-config-tool-js'
import { appPath } from '../constants'

export const createWebHookerStage = (dct: DockerConfigTool, { webHookerBaseStage, buildWebhookerStage }: Record<string, IStage>): IStage => {
    const webHookerStage = dct.withStage({ from: webHookerBaseStage, as: `webhooker` })

    webHookerStage.withUser({ uid: 1000, gid: 1000 })
    webHookerStage.withWorkDir(appPath)
    webHookerStage.withRun(`mkdir -p ${appPath}/logs ${appPath}/webhooker && chown 1000:1000 ${appPath}/logs ${appPath}/webhooker`)
    webHookerStage.withWorkDir(`${appPath}/webhooker`)
    webHookerStage.withCopy(`${appPath}/webhooker/`, `${appPath}/webhooker/`).setLinked().setFrom(buildWebhookerStage)
    webHookerStage.withCmd(`${appPath}/webhooker/webhooker.sbin`)

    return webHookerStage
}
