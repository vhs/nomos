import type { NOMOSSWRResponse } from '@/types/custom'
import type { BasePrivileges, Keys } from '@/types/records'

export interface ApiKeysPageProps {
    scope?: ApiKeysScopes
    basePath: string
    onCreate: (note: string) => void
    availablePrivileges: BasePrivileges
    keys: NOMOSSWRResponse<Keys>
}

export type ApiKeysScopes = 'user' | 'system'

export interface ScopedApiKeyTerm {
    user: string
    system: string
}

export type ApiKeysDictionary = Record<string, string | ScopedApiKeyTerm>
