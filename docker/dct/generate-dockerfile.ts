import { DockerConfigTool } from '@tyisi/docker-config-tool-js'
import { buildDependencies, appPath, buildPath, backendDependencies, nginxWebPath } from './constants'
import { createSourceStage } from './stages/source'
import { createBaseStage } from './stages/base'
import { createBuildBaseStage } from './stages/build-base'
import { createBuildStage } from './stages/build'
import { createBuildBackendPHPStageStage } from './stages/build-backed-php'
import { createBuildFrontendReactStageStage } from './stages/build-frontend-react'
import { createBuildFrontendWebStageStage } from './stages/build-frontend-web'
import { createBuildWebhookerStageStage } from './stages/build-webhooker'
import { createBackendPHPBaseStage } from './stages/backend-php-base'
import { createBackendPHPStage } from './stages/backend-php'
import { createFrontendReactStage } from './stages/frontend-react'
import { createFrontendWebStage } from './stages/frontend-web'
import { createWebHookerBaseStage } from './stages/webhooker-base'
import { createWebHookerStage } from './stages/webhooker'

// Constants

// Generate Dockerfile

const dct = new DockerConfigTool()

dct.withArg(`PHP_VERSION=8.3`)

const sourceStage = createSourceStage(dct)

const baseStage = createBaseStage(dct)

const buildBaseStage = createBuildBaseStage(dct, { baseStage })

const buildStage = createBuildStage(dct, { buildBaseStage, sourceStage })

const buildBackendPHPStage = createBuildBackendPHPStageStage(dct, { buildStage })

const buildFrontendReactStage = createBuildFrontendReactStageStage(dct, { buildStage })

const buildFrontendWebStage = createBuildFrontendWebStageStage(dct, { buildStage })

const buildWebhookerStage = createBuildWebhookerStageStage(dct, { buildStage })

const backendPHPBaseStage = createBackendPHPBaseStage(dct)

const webHookerBaseStage = createWebHookerBaseStage(dct, { baseStage })

const backendPHPStage = createBackendPHPStage(dct, { backendPHPBaseStage, buildBackendPHPStage, sourceStage })

const frontendReactStage = createFrontendReactStage(dct, { buildFrontendReactStage })

const frontendWebStage = createFrontendWebStage(dct, { buildFrontendWebStage })

const webHookerStage = createWebHookerStage(dct, { webHookerBaseStage, buildWebhookerStage })

console.log(dct.toString())
