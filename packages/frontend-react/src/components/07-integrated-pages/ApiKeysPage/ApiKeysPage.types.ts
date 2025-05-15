import type { ReactNode } from 'react'

import type {
    zApiKeysEditSchema,
    zApiKeysCreateSchema,
    zApiKeysActiveView,
    zApiKeysActiveViewHelp,
    zApiKeysActiveViewList,
    zApiKeysActiveViewUsage,
    zApiKeysScope,
    zParsedApiKeysPath,
    zScopedApiKeysTerm
} from './ApiKeysPage.schemas'
import type { z } from 'zod'

import type { NOMOSSWRResponse } from '@/types/api'
import type { Keys, BasePrivileges } from '@/types/validators/records'

export type ApiKeysEditSchema = z.infer<typeof zApiKeysEditSchema>
export type ApiKeysCreateSchema = z.infer<typeof zApiKeysCreateSchema>
export type ApiKeysActiveView = z.infer<typeof zApiKeysActiveView>
export type ApiKeysActiveViewHelp = z.infer<typeof zApiKeysActiveViewHelp>
export type ApiKeysActiveViewList = z.infer<typeof zApiKeysActiveViewList>
export type ApiKeysActiveViewUsage = z.infer<typeof zApiKeysActiveViewUsage>
export type ApiKeysScope = z.infer<typeof zApiKeysScope>
export type ParsedApiKeysPath = z.infer<typeof zParsedApiKeysPath>
export type ScopedApiKeysTerm = z.infer<typeof zScopedApiKeysTerm>

export interface ApiKeysPageProps {
    children?: ReactNode
    scope?: ApiKeysScope
    basePath: string
}

export type ApiKeysDictionary = Record<string, string | ScopedApiKeysTerm>

export interface ApiKeysPageContextValue {
    activeView: ApiKeysActiveView
    availableKeys: NOMOSSWRResponse<Keys>
    availablePrivileges: BasePrivileges
    basePath: string
    scope: ApiKeysScope
}
