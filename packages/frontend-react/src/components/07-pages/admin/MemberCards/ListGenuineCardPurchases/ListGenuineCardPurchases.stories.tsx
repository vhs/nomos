import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import ListGenuineCardPurchases from './ListGenuineCardPurchases'

type StoryType = StoryObj<typeof ListGenuineCardPurchases>

const meta: Meta<typeof ListGenuineCardPurchases> = {
    component: ListGenuineCardPurchases,
    title: '07-Pages/Admin/MemberCards/ListGenuineCardPurchases',
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
        children: 'ListGenuineCardPurchases'
    }
}
