import type { ReactNode } from 'react'

import type { ApiKeysPageContextValue, ApiKeysScope, ParsedApiKeyPath } from '../ApiKeysPage.types'

export interface ApiKeysPageContainerProps extends ParsedApiKeyPath {
    basePath: string
    children?: ReactNode
    contextValue: ApiKeysPageContextValue
    scope?: ApiKeysScope
}
