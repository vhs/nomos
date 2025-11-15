export const sharedPHPDependencies = [
    `just`,
    `mariadb-client`,
    `php83-bcmath`,
    `php83-common`,
    `php83-curl`,
    `php83-dom`,
    `php83-iconv`,
    `php83-mbstring`,
    `php83-mysqli`,
    `php83-mysqlnd`,
    `php83-openssl`,
    `php83-phar`,
    `php83-session`,
    `php83-simplexml`,
    `php83-sockets`,
    `php83-zip`,
    `php83`,
    `python3`,
    `wget`
]

export const buildDependencies = [...sharedPHPDependencies, `alpine-sdk`, `bash`, `git`, `php83-tokenizer`, `php83-xml`, `php83-xmlwriter`]

export const backendDependencies = [...sharedPHPDependencies, `php83-fpm`]

export const appPath = `/app`
export const buildPath = `/build`
export const nginxWebPath = `/var/www/html`
