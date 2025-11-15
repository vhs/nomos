import { DockerConfigTool, IStage } from '@tyisi/docker-config-tool-js'
import { appPath, buildPath } from '../constants'

export const createBuildStage = (dct: DockerConfigTool, { buildBaseStage, sourceStage }: Record<string, IStage>): IStage => {
    const buildStage = dct.withStage({ from: buildBaseStage, as: `build` })

    buildStage.withEnv(`COMPOSER_INSTALL_OPT=--no-dev`)
    buildStage.withEnv(`CI=true`)
    buildStage.withRun(`mkdir ${appPath}/ /build/ && chown 1000:1000 /build/ ${appPath}/`)
    buildStage.withUser({ uid: 1000, gid: 1000 })
    buildStage.withCopy({ sources: buildPath, destination: buildPath }).setFrom(sourceStage).setLinked().setChown(`1000:1000`)
    buildStage.withWorkDir(buildPath)
    buildStage.withRun({
        commands: [`pnpm install --frozen-lockfile && pnpm -r build`],
        mount: {
            type: `cache`,
            id: `nomos-pnpm`,
            target: `/pnpm/store`,
            uid: 1000,
            gid: 1000
        }
    })

    return buildStage
}
