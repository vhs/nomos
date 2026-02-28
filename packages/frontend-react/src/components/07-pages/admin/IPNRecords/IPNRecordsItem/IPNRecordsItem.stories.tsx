/* eslint-disable @typescript-eslint/naming-convention */
import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import IPNRecordsItem from './IPNRecordsItem'

type StoryType = StoryObj<typeof IPNRecordsItem>

const meta: Meta<typeof IPNRecordsItem> = {
    component: IPNRecordsItem,
    title: '07-Pages/Admin/IPNRecords/IPNRecordsItem',
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
            created: Date.now(),
            item_name: 'IPNRecordsItem',
            item_number: '123345643634',
            payer_email: 'payer@example.com',
            payment_amount: '75.00',
            payment_currency: 'CAD',
            payment_status: 'INVALID',
            validation: 'INVALID',
            raw: 'SOMEJSON'
        }
    }
}
