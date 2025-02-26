import type { ReactNode } from 'react'

import type { ApiKeyEditSchema } from './ApiKey.schema'
import type { z } from 'zod'

import type { ApiKeysScopes } from '@/components/05-materials/ApiKeysPage/ApiKeysPage.types'

import type { BasePrivileges, Key } from '@/types/records'

export interface ApiKeyProps {
    children?: ReactNode
    apiKey: Key
    availablePrivileges: BasePrivileges
    scope: ApiKeysScopes
}

export type ApiKeyEditForm = z.infer<typeof ApiKeyEditSchema>
