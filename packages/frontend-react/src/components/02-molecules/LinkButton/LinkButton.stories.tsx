import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import LinkButton from './LinkButton'

type StoryType = StoryObj<typeof LinkButton>

const meta: Meta<typeof LinkButton> = {
    component: LinkButton,
    title: '02-Molecules/LinkButton',
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
        children: 'LinkButton'
    }
}
