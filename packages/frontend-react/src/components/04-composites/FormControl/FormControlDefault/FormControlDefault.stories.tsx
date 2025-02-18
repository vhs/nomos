import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import FormControlDefault from './FormControlDefault'

type StoryType = StoryObj<typeof FormControlDefault>

const meta: Meta<typeof FormControlDefault> = {
    component: FormControlDefault,
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
        children: 'FormControlDefault'
    }
}
