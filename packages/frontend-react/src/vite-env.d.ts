/* eslint-disable @typescript-eslint/naming-convention */
/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly NOMOS_FRONTEND_HOST?: string
    readonly NOMOS_FRONTEND_CA_FILE?: string
    readonly NOMOS_FRONTEND_CRT_FILE?: string
    readonly NOMOS_FRONTEND_KEY_FILE?: string
    readonly NOMOS_FRONTEND_BACKEND_URL?: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
