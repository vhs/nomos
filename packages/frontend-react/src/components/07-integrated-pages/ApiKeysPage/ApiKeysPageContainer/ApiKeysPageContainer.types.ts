import type { ReactNode } from 'react'

import type { ApiKeysPageContextValue, ApiKeysScope, ParsedApiKeysPath } from '../ApiKeysPage.types'

export interface ApiKeysPageContainerProps extends ParsedApiKeysPath {
    basePath: string
    children?: ReactNode
    contextValue: ApiKeysPageContextValue
    scope?: ApiKeysScope
}
