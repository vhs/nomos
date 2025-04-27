/* eslint-disable @typescript-eslint/naming-convention */
import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import StripeRecordsItem from './StripeRecordsItem'

type StoryType = StoryObj<typeof StripeRecordsItem>

const meta: Meta<typeof StripeRecordsItem> = {
    component: StripeRecordsItem,
    title: '07-Pages/Admin/StripeRecords/StripeRecordsItem',
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
            object: 'StripeRecordsItem',
            type: 'StripeRecordsItem',
            status: 'UNKNOWN',
            ts: Date.now(),
            event_id: '523452345',
            request: 'dsfgsdfgsdfg',
            raw: 'StripeRecordsItem'
        }
    }
}
