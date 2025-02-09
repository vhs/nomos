import { z } from 'zod'

import type { ApiKeysDictionary, ApiKeysScopes, ScopedApiKeyTerm } from './ApiKeysPage.types'

export const ApiKeysTerms: ApiKeysDictionary = {
    title: { user: 'Manage API Keys', system: 'Manage System API Keys' },
    manageTabTitle: 'Manage',
    manageTableDescription: { user: 'Your API Keys', system: 'System API Keys' }
}

export const zApiKeysScope = z.union([z.literal('system'), z.literal('user')])

export const isApiKeysScope = (inp: unknown): inp is ApiKeysScopes => zApiKeysScope.safeParse(inp).success

export const zScopedApiKeyTerm = z.record(zApiKeysScope, z.string())

export const isScopedApiKeyTerm = (inp: unknown): inp is ScopedApiKeyTerm => zScopedApiKeyTerm.safeParse(inp).success

export const getApiKeyTermByScope = (term: string, scope: ApiKeysScopes): string => {
    if (typeof ApiKeysTerms[term] === 'string') return ApiKeysTerms[term]

    const scopedTermRecord = ApiKeysTerms[term]

    if (
        typeof ApiKeysTerms[term] !== 'string' &&
        isScopedApiKeyTerm(scopedTermRecord) &&
        isApiKeysScope(scope) &&
        typeof ApiKeysTerms[term][scope] === 'string'
    )
        return scopedTermRecord[scope]

    throw new Error(`Missing term and/or scope for term: ${term} [${scope}]`)
}
