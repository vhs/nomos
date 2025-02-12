/* eslint-disable @typescript-eslint/naming-convention */
import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import AdminStripeRecordsItem from './AdminStripeRecordsItem'

type StoryType = StoryObj<typeof AdminStripeRecordsItem>

const meta: Meta<typeof AdminStripeRecordsItem> = {
    component: AdminStripeRecordsItem,
    title: '07-Pages/Admin/AdminStripeRecords/AdminStripeRecordsItem',
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
            api_version: '1',
            created: Date.now(),
            object: 'AdminStripeRecordsItem',
            type: 'AdminStripeRecordsItem',
            status: 'UNKNOWN',
            ts: Date.now(),
            event_id: '523452345',
            request: 'dsfgsdfgsdfg',
            raw: 'AdminStripeRecordsItem'
        }
    }
}
