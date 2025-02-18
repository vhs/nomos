import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import FormControlDropdown from './FormControlDropdown'

type StoryType = StoryObj<typeof FormControlDropdown>

const meta: Meta<typeof FormControlDropdown> = {
    component: FormControlDropdown,
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
        children: 'FormControlDropdown'
    }
}
