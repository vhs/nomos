import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import ListGenuineCardPurchasesItem from './ListGenuineCardPurchasesItem'

type StoryType = StoryObj<typeof ListGenuineCardPurchasesItem>

const meta: Meta<typeof ListGenuineCardPurchasesItem> = {
    component: ListGenuineCardPurchasesItem,
    title: '07-Pages/Admin/MemberCards/ListGenuineCardPurchases/ListGenuineCardPurchasesItem',
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
    args: {}
}
