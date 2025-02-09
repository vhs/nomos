/* eslint-disable @typescript-eslint/naming-convention */
import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import AdminAccessLogsItem from './AdminAccessLogsItem'

type StoryType = StoryObj<typeof AdminAccessLogsItem>

const meta: Meta<typeof AdminAccessLogsItem> = {
    component: AdminAccessLogsItem,
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
