import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import Tab from './Tab/Tab'
import Tabs from './Tabs'

type StoryType = StoryObj<typeof Tabs>

const meta: Meta<typeof Tabs> = {
    component: Tabs,
    title: '99-Templates/default',
    decorators: [
        (Story) => (
            <AuthenticationProvider>
                <Story />
            </AuthenticationProvider>
        )
    ]
}

export default meta

export const Default: StoryType = {
    args: {
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
