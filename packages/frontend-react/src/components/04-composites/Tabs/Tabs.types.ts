import type { ReactElement } from 'react'

import type Tab from './Tab/Tab'
import type { TabProps } from './Tab/Tab.types'

export interface TabsProps {
    children?: Array<ReactElement<TabProps, typeof Tab>>
    defaultTab?: string
}
