/* eslint-disable @typescript-eslint/naming-convention */
import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import AccessLogsItem from './AccessLogsItem'

type StoryType = StoryObj<typeof AccessLogsItem>

const meta: Meta<typeof AccessLogsItem> = {
    component: AccessLogsItem,
    title: '07-Pages/Admin/AccessLogs/AccessLogsItem',
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
            authorized: false,
            from_ip: '127.0.0.1',
            key: 'key',
            time: Date.now(),
            type: 'login'
        }
    }
}
