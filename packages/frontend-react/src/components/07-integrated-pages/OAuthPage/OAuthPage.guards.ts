import type {
    OAuthPageActiveView,
    OAuthPageEditSchema,
    OAuthPageScope,
    ParsedOAuthPagePath,
    ScopedOAuthPageTerm
} from './OAuthPage.types'

import {
    zOAuthPageActiveView,
    zOAuthPageEditSchema,
    zOAuthPageScope,
    zParsedOAuthPagePath,
    zScopedOAuthPageTerm
} from './OAuthPage.schemas'

export const isOAuthSchema = (inp: unknown): inp is OAuthPageEditSchema => zOAuthPageEditSchema.safeParse(inp).success
export const isOAuthActiveView = (inp: unknown): inp is OAuthPageActiveView =>
    zOAuthPageActiveView.safeParse(inp).success
export const isOAuthScope = (inp: unknown): inp is OAuthPageScope => zOAuthPageScope.safeParse(inp).success
export const isParsedOAuthPath = (inp: unknown): inp is ParsedOAuthPagePath =>
    zParsedOAuthPagePath.safeParse(inp).success
export const isScopedOAuthTerm = (inp: unknown): inp is ScopedOAuthPageTerm =>
    zScopedOAuthPageTerm.safeParse(inp).success
