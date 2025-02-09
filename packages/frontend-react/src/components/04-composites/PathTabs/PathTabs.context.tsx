import { createContext, useContext } from 'react'

import type { PathTabsContextState, PathTabsContextStateEntry } from './PathTabs.types'

export const PathTabsContext = createContext<PathTabsContextState | null>(null)

export const usePathTabContext = (): PathTabsContextStateEntry => {
    const pathTabContext = useContext(PathTabsContext)

    if (pathTabContext == null) throw new Error('usePathTabContext is being used outside of PathTabContextProvider')

    return pathTabContext
}
