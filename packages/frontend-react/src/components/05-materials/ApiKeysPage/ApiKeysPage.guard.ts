import type {
    ApiKeysActiveView,
    ApiKeysActiveViewHelp,
    ApiKeysActiveViewList,
    ApiKeysActiveViewUsage,
    ApiKeysSchema,
    ApiKeysScope,
    ParsedApiKeysPath,
    ScopedApiKeysTerm
} from './ApiKeysPage.types'

import {
    zApiKeysActiveView,
    zApiKeysActiveViewHelp,
    zApiKeysActiveViewList,
    zApiKeysActiveViewUsage,
    zApiKeysSchema,
    zApiKeysScope,
    zParsedApiKeysPath,
    zScopedApiKeysTerm
} from './ApiKeysPage.schemas'

export const isApiKeysSchema = (inp: unknown): inp is ApiKeysSchema => zApiKeysSchema.safeParse(inp).success
export const isApiKeysActiveView = (inp: unknown): inp is ApiKeysActiveView => zApiKeysActiveView.safeParse(inp).success
export const isApiKeysActiveViewHelp = (inp: unknown): inp is ApiKeysActiveViewHelp =>
    zApiKeysActiveViewHelp.safeParse(inp).success
export const isApiKeysActiveViewList = (inp: unknown): inp is ApiKeysActiveViewList =>
    zApiKeysActiveViewList.safeParse(inp).success
export const isApiKeysActiveViewUsage = (inp: unknown): inp is ApiKeysActiveViewUsage =>
    zApiKeysActiveViewUsage.safeParse(inp).success
export const isApiKeysScope = (inp: unknown): inp is ApiKeysScope => zApiKeysScope.safeParse(inp).success
export const isParsedApiKeysPath = (inp: unknown): inp is ParsedApiKeysPath => zParsedApiKeysPath.safeParse(inp).success
export const isScopedApiKeysTerm = (inp: unknown): inp is ScopedApiKeysTerm => zScopedApiKeysTerm.safeParse(inp).success
