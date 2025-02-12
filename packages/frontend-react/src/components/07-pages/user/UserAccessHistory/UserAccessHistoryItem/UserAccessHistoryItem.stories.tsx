/* eslint-disable @typescript-eslint/naming-convention */
import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import UserAccessHistoryItem from './UserAccessHistoryItem'

type StoryType = StoryObj<typeof UserAccessHistoryItem>

const meta: Meta<typeof UserAccessHistoryItem> = {
    component: UserAccessHistoryItem,
    title: '07-Pages/User/UserAccessHistory/UserAccessHistoryItem',
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
            key: 'UserAccessHistoryItem',
            authorized: false,
            from_ip: '127.0.0.1',
            time: Date.now()
        }
    }
}
