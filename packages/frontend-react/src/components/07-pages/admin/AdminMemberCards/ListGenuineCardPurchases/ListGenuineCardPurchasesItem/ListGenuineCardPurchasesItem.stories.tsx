import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import ListGenuineCardPurchasesItem from './ListGenuineCardPurchasesItem'

type StoryType = StoryObj<typeof ListGenuineCardPurchasesItem>

const meta: Meta<typeof ListGenuineCardPurchasesItem> = {
    component: ListGenuineCardPurchasesItem,
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
        children: 'ListGenuineCardPurchasesItem'
    }
}
