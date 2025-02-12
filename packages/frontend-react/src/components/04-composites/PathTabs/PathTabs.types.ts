import type { ReactElement } from 'react'

import type PathTab from './PathTab/PathTab'
import type { PathTabProps } from './PathTab/PathTab.types'

import type { CastReactElement } from '@/types/utils'

export interface PathTabsContextStateEntry {
    activeKey: string
}

export interface PathTabsProps extends CastReactElement<'div'> {
    children?: Array<ReactElement<PathTabProps, typeof PathTab>>
    id?: string
    defaultPath?: string
}

export type PathTabsContextState = PathTabsContextStateEntry
