/* eslint-disable @typescript-eslint/naming-convention */
import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import AccessHistoryItem from './AccessHistoryItem'

type StoryType = StoryObj<typeof AccessHistoryItem>

const meta: Meta<typeof AccessHistoryItem> = {
    component: AccessHistoryItem,
    title: '07-Pages/User/AccessHistory/AccessHistoryItem',
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
        data: {
            id: 1,
            type: 'login',
            key: 'AccessHistoryItem',
            authorized: false,
            from_ip: '127.0.0.1',
            time: Date.now()
        }
    }
}
