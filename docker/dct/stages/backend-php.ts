import { DockerConfigTool, IStage } from '@tyisi/docker-config-tool-js'
import { nginxWebPath, buildPath, appPath } from '../constants'

export const createBackendPHPStage = (
    dct: DockerConfigTool,
    { backendPHPBaseStage, buildBackendPHPStage, sourceStage }: Record<string, IStage>
): IStage => {
    const backendPHPStage = dct.withStage({ from: backendPHPBaseStage, as: `backend-php` })

    backendPHPStage.withVolume(`/sessions`)
    backendPHPStage.withExpose(9000)
    backendPHPStage.withWorkDir(`${nginxWebPath}`)
    backendPHPStage.withVolume(`${nginxWebPath}/backup`)
    backendPHPStage.withRun(`mkdir -p ${nginxWebPath}/backup && chown nobody:nobody ${nginxWebPath}/backup`)
    backendPHPStage.withEntryPoint(`docker_compose_run.sh`)
    backendPHPStage.withCmd(`php-fpm83`)
    backendPHPStage.withRun(`mkdir -p ${nginxWebPath}/conf/`)

    backendPHPStage.withCopy(`${buildPath}/migrations/`, `migrations/`).setFrom(sourceStage).setLinked()

    backendPHPStage.withCopy(`${appPath}/backend-php${appPath}/`, `app/`).setFrom(buildBackendPHPStage).setLinked()
    backendPHPStage.withCopy(`${appPath}/backend-php/conf/config.docker.ini.php`, `conf/config.ini.php`).setFrom(buildBackendPHPStage).setLinked()
    backendPHPStage.withCopy(`${appPath}/backend-php/tools/`, `tools/`).setFrom(buildBackendPHPStage).setLinked()
    backendPHPStage.withCopy(`${appPath}/backend-php/vhs/`, `vhs/`).setFrom(buildBackendPHPStage).setLinked()
    backendPHPStage.withCopy(`${appPath}/backend-php/vendor/`, `vendor/`).setFrom(buildBackendPHPStage).setLinked()

    backendPHPStage.withCopy(`${appPath}/backend-php/conf/php/*.ini`, `/etc/php83/conf.d/`).setFrom(buildBackendPHPStage).setLinked()
    backendPHPStage.withCopy(`${appPath}/backend-php/conf/php-fpm/*.conf`, `/etc/php83/php-fpm.d/`).setFrom(buildBackendPHPStage).setLinked()
    backendPHPStage.withCopy(`${appPath}/backend-php/docker/*.sh`, `/usr/local/bin/`).setFrom(buildBackendPHPStage).setLinked()

    return backendPHPStage
}
