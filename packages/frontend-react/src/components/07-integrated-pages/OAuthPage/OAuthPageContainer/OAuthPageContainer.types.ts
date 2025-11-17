import type { ReactNode } from 'react'

import type { ParsedOAuthPagePath, OAuthPageContextValue, OAuthPageScope } from '../OAuthPage.types'

export interface OAuthPageContainerProps extends ParsedOAuthPagePath {
    basePath: string
    children?: ReactNode
    contextValue: OAuthPageContextValue
    scope?: OAuthPageScope
}
