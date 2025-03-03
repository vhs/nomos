import type {
    zApiKeySchema,
    zApiKeysActiveView,
    zApiKeysActiveViewHelp,
    zApiKeysActiveViewList,
    zApiKeysActiveViewUsage,
    zApiKeysScope,
    zParsedApiKeyPath,
    zScopedApiKeyTerm
} from './ApiKeysPage.schemas'
import type { ReactNode } from '@tanstack/react-router'
import type { z } from 'zod'

import type { NOMOSSWRResponse } from '@/types/custom'
import type { BasePrivileges, Keys } from '@/types/records'

export type ApiKeyForm = z.infer<typeof zApiKeySchema>
export type ApiKeySchema = z.infer<typeof zApiKeySchema>
export type ApiKeysActiveView = z.infer<typeof zApiKeysActiveView>
export type ApiKeysActiveViewHelp = z.infer<typeof zApiKeysActiveViewHelp>
export type ApiKeysActiveViewList = z.infer<typeof zApiKeysActiveViewList>
export type ApiKeysActiveViewUsage = z.infer<typeof zApiKeysActiveViewUsage>
export type ApiKeysScope = z.infer<typeof zApiKeysScope>
export type ParsedApiKeyPath = z.infer<typeof zParsedApiKeyPath>
export type ScopedApiKeyTerm = z.infer<typeof zScopedApiKeyTerm>

export interface ApiKeysPageProps {
    children?: ReactNode
    scope?: ApiKeysScope
    basePath: string
}

export type ApiKeysDictionary = Record<string, string | ScopedApiKeyTerm>

export interface ApiKeysPageContextValue {
    activeView: ApiKeysActiveView
    availableKeys: NOMOSSWRResponse<Keys>
    availablePrivileges: BasePrivileges
    basePath: string
    scope: ApiKeysScope
}
