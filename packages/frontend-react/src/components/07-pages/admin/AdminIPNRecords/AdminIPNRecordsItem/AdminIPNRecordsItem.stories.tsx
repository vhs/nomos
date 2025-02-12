/* eslint-disable @typescript-eslint/naming-convention */
import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import AdminIPNRecordsItem from './AdminIPNRecordsItem'

type StoryType = StoryObj<typeof AdminIPNRecordsItem>

const meta: Meta<typeof AdminIPNRecordsItem> = {
    component: AdminIPNRecordsItem,
    title: '07-Pages/Admin/AdminIPNRecords/AdminIPNRecordsItem',
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
            item_name: 'AdminIPNRecordsItem',
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
