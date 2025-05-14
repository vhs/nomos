import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import NotFoundComponent from './NotFoundComponent'

type StoryType = StoryObj<typeof NotFoundComponent>

const meta: Meta<typeof NotFoundComponent> = {
    component: NotFoundComponent,
    title: '02-Molecules/NotFoundComponent',
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
        children: 'NotFoundComponent'
    }
}
