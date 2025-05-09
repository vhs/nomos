import { DockerConfigTool, IStage } from '@tyisi/docker-config-tool-js'
import { buildPath, appPath } from '../constants'

export const createBuildWebhookerStageStage = (dct: DockerConfigTool, { buildStage }: Record<string, IStage>): IStage => {
    const buildWebhookerStage = dct.withStage({ from: buildStage, as: `build-webhooker` })

    buildWebhookerStage.withWorkDir(buildPath)
    buildWebhookerStage.withRun({
        commands: [`pnpm deploy --filter="@vhs/webhooker" --prod ${appPath}/webhooker/`],
        mount: {
            type: `cache`,
            id: `nomos-pnpm`,
            target: `/pnpm/store`,
            uid: 1000,
            gid: 1000
        }
    })

    return buildWebhookerStage
}
