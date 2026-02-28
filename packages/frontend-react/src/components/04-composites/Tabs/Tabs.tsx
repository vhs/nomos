import { useMemo, useState, type FC } from 'react'

import clsx from 'clsx'

import type { TabsProps } from './Tabs.types'

import Button from '@/components/02-molecules/Button/Button'

const Tabs: FC<TabsProps> = ({ children, defaultTab }) => {
    defaultTab ??= ''

    const childTabs = useMemo(() => children?.map((e) => e.props), [children])

    const [activeTab, setActiveTab] = useState<string>(defaultTab)

    return (
        <div data-testid='Tabs'>
            <div className='tab-titles grid-flow-row justify-evenly px-2'>
                {childTabs?.map((e) => {
                    return (
                        <Button
                            key={e.tabKey}
                            variant='link'
                            className={clsx(['tab-title', activeTab === e.tabKey ? 'tab-active' : null])}
                            onClick={() => {
                                setActiveTab(e.tabKey)
                            }}
                        >
                            {e.title}
                        </Button>
                    )
                })}
            </div>
            <div className='tab-container'>{children?.filter((c) => c.props.tabKey === activeTab)}</div>
        </div>
    )
}

export default Tabs
