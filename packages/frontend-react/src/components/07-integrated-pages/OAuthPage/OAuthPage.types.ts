import type { ReactNode } from 'react'

import type {
    zOAuthPageActiveView,
    zOAuthPageEditSchema,
    zOAuthPageScope,
    zParsedOAuthPagePath,
    zScopedOAuthPageTerm
} from './OAuthPage.schemas'
import type { z } from 'zod'

export type OAuthPageEditSchema = z.infer<typeof zOAuthPageEditSchema>
export type OAuthPageActiveView = z.infer<typeof zOAuthPageActiveView>
export type OAuthPageScope = z.infer<typeof zOAuthPageScope>
export type ParsedOAuthPagePath = z.infer<typeof zParsedOAuthPagePath>
export type ScopedOAuthPageTerm = z.infer<typeof zScopedOAuthPageTerm>

export interface OAuthPageProps {
    children?: ReactNode
    scope?: OAuthPageScope
    basePath: string
}

export type OAuthPagehDictionary = Record<string, string | ScopedOAuthPageTerm>

export interface OAuthPageContextValue {
    activeView: OAuthPageActiveView
    basePath: string
    scope: OAuthPageScope
}
