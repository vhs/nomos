import type { Meta, StoryObj } from '@storybook/react'

import Tab from './Tab/Tab'
import Tabs from './Tabs'

type StoryType = StoryObj<typeof Tabs>

const meta: Meta<typeof Tabs> = {
    component: Tabs,
    title: '04-Composites/Tabs'
}

export default meta

export const Default: StoryType = {
    args: {
        defaultTab: 'tab1',
        children: [
            <Tab key='tab1' tabKey={'tab1'} title={'tab1'}>
                tab1
            </Tab>,
            <Tab key='tab2' tabKey={'tab2'} title={'tab2'}>
                tab2
            </Tab>
        ]
    }
}
