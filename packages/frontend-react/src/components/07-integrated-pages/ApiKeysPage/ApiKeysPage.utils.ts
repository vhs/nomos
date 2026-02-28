import type { ApiKeysActiveView, ApiKeysScope, ParsedApiKeysPath } from './ApiKeysPage.types'

import { isApiKeysScope, isScopedApiKeysTerm } from './ApiKeysPage.guard'
import { ApiKeysTerms } from './ApiKeysPage.settings'

export const getApiKeysTermByScope = (term: string, scope: ApiKeysScope): string => {
    if (typeof ApiKeysTerms[term] === 'string') return ApiKeysTerms[term]

    if (
        typeof ApiKeysTerms[term] !== 'string' &&
        isScopedApiKeysTerm(ApiKeysTerms[term]) &&
        isApiKeysScope(scope) &&
        typeof ApiKeysTerms[term][scope] === 'string'
    )
        return ApiKeysTerms[term][scope]

    throw new Error(`Missing term and/or scope for term: ${term} [${scope}]`)
}

export const getParsedApiKeysPath = (basePath: string, pathname: string): ParsedApiKeysPath => {
    const pathChunks = pathname.replace(basePath, '').split('/').slice(1)

    const keyId = /\d+/.test(pathChunks[0]) ? Number(pathChunks[0]) : undefined
    const activeView = (/(help|usage)/.test(pathChunks[0]) ? pathChunks[0] : 'list') as ParsedApiKeysPath['activeView']
    const editModal = keyId != null
    const createModal = !editModal && pathChunks.includes('new')

    return {
        createModal,
        editModal,
        keyId,
        activeView
    }
}

export const getApiKeysViewPath = (basePath: string, activeView: ApiKeysActiveView): string =>
    activeView === 'list' ? `${basePath}/` : `${basePath}/${activeView}`
