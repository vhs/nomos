import { DockerConfigTool, IStage } from '@tyisi/docker-config-tool-js'
import { backendDependencies } from '../constants'

export const createBackendPHPBaseStage = (dct: DockerConfigTool): IStage => {
    const backendPHPBaseStage = dct.withStage({ from: `alpine:3`, as: `backend-php-base` })

    backendPHPBaseStage.withRun(`apk --no-cache add`, ...backendDependencies)
    backendPHPBaseStage.withRun(`sed -i 's/^listen/;listen/g' /etc/php83/php-fpm.d/www.conf`)

    return backendPHPBaseStage
}
