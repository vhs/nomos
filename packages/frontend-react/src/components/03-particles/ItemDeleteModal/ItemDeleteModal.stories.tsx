import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import ItemDeleteModal from './ItemDeleteModal'

type StoryType = StoryObj<typeof ItemDeleteModal>

const meta: Meta<typeof ItemDeleteModal> = {
    component: ItemDeleteModal,
    title: '03-Particles/ItemDeleteModal',
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
        children: 'ItemDeleteModal'
    }
}
