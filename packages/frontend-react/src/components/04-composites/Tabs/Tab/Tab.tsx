import type { FC } from 'react'

import type { TabProps } from './Tab.types'

const Tab: FC<TabProps> = ({ tabKey, children }) => (
    <div data-tabKey={tabKey} data-testid='Tab'>
        {children}
    </div>
)

export default Tab
