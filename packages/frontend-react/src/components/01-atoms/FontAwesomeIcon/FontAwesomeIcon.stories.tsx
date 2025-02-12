import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import FontAwesomeIcon from './FontAwesomeIcon'

type StoryType = StoryObj<typeof FontAwesomeIcon>

const meta: Meta<typeof FontAwesomeIcon> = {
    component: FontAwesomeIcon,
    title: '01-Atoms/FontAwesomeIcon',
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
        icon: '42-group'
    }
}
