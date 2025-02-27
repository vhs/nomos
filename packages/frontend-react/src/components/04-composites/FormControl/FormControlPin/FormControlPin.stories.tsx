import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import FormControlPin from './FormControlPin'

type StoryType = StoryObj<typeof FormControlPin>

const meta: Meta<typeof FormControlPin> = {
    component: FormControlPin,
    title: '04-Composites/FormControl/FormControlPin',
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
        children: 'FormControlPin'
    }
}
