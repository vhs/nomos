import type { ParsedOAuthPagePath, OAuthPageActiveView, OAuthPageScope } from './OAuthPage.types'

import { isScopedOAuthTerm, isOAuthScope } from './OAuthPage.guards'
import { OAuthTerms } from './OAuthPage.settings'

export const getOAuthTermByScope = (term: string, scope: OAuthPageScope): string => {
    if (typeof OAuthTerms[term] === 'string') return OAuthTerms[term]

    if (
        typeof OAuthTerms[term] !== 'string' &&
        isScopedOAuthTerm(OAuthTerms[term]) &&
        isOAuthScope(scope) &&
        typeof OAuthTerms[term][scope] === 'string'
    )
        return OAuthTerms[term][scope]

    throw new Error(`Missing term and/or scope for term: ${term} [${scope}]`)
}

export const getParsedOAuthPath = (basePath: string, pathname: string): ParsedOAuthPagePath => {
    const pathChunks = pathname.replace(basePath, '').split('/').slice(1)

    const appClientId = /\d+/.test(pathChunks[0]) ? Number(pathChunks[0]) : undefined
    const activeView =
        appClientId != null
            ? 'clients'
            : ((/(clients)/.test(pathChunks[0]) ? pathChunks[0] : '') as ParsedOAuthPagePath['activeView'])
    const editModal = appClientId != null
    const createModal = !editModal && pathChunks.includes('new')

    return {
        createModal,
        editModal,
        appClientId,
        activeView
    }
}

export const getOAuthViewPath = (basePath: string, activeView: OAuthPageActiveView): string =>
    activeView === '' ? `${basePath}/` : `${basePath}/${activeView}`
