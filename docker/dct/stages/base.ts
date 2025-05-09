import { DockerConfigTool, IStage } from '@tyisi/docker-config-tool-js'

export const createBaseStage = (dct: DockerConfigTool): IStage => {
    const baseStage = dct.withStage({ from: `node:22-alpine`, as: `base` })

    baseStage.withEnv(`PNPM_HOME="/pnpm"`)
    baseStage.withEnv(`PATH="$PNPM_HOME:$PATH"`)

    baseStage.withRun(`npm install -g npm@latest && npm install -g corepack@latest`)

    return baseStage
}
