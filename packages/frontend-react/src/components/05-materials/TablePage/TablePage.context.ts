import { createContext, useContext } from 'react'

import type { TablePageContextDefinition } from './TablePage.types'

export const TablePageContext = createContext<TablePageContextDefinition | undefined>(undefined)

export const useTablePageContext = (): TablePageContextDefinition => {
    const tablePageContext = useContext(TablePageContext)

    if (tablePageContext == null) throw new Error('useTablePageContext was called outside of TablePage context')

    return tablePageContext
}
