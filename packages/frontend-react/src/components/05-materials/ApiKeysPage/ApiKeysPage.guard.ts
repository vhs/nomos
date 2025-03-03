import type {
    ApiKeysActiveView,
    ApiKeysActiveViewHelp,
    ApiKeysActiveViewList,
    ApiKeysActiveViewUsage,
    ApiKeySchema,
    ApiKeysScope,
    ParsedApiKeyPath,
    ScopedApiKeyTerm
} from './ApiKeysPage.types'

import {
    zApiKeysActiveView,
    zApiKeysActiveViewHelp,
    zApiKeysActiveViewList,
    zApiKeysActiveViewUsage,
    zApiKeySchema,
    zApiKeysScope,
    zParsedApiKeyPath,
    zScopedApiKeyTerm
} from './ApiKeysPage.schemas'

export const isApiKeySchema = (inp: unknown): inp is ApiKeySchema => zApiKeySchema.safeParse(inp).success
export const isApiKeysActiveView = (inp: unknown): inp is ApiKeysActiveView => zApiKeysActiveView.safeParse(inp).success
export const isApiKeysActiveViewHelp = (inp: unknown): inp is ApiKeysActiveViewHelp =>
    zApiKeysActiveViewHelp.safeParse(inp).success
export const isApiKeysActiveViewList = (inp: unknown): inp is ApiKeysActiveViewList =>
    zApiKeysActiveViewList.safeParse(inp).success
export const isApiKeysActiveViewUsage = (inp: unknown): inp is ApiKeysActiveViewUsage =>
    zApiKeysActiveViewUsage.safeParse(inp).success
export const isApiKeysScope = (inp: unknown): inp is ApiKeysScope => zApiKeysScope.safeParse(inp).success
export const isParsedApiKeyPath = (inp: unknown): inp is ParsedApiKeyPath => zParsedApiKeyPath.safeParse(inp).success
export const isScopedApiKeyTerm = (inp: unknown): inp is ScopedApiKeyTerm => zScopedApiKeyTerm.safeParse(inp).success
