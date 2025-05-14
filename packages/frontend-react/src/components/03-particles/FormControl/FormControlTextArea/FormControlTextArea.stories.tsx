import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import FormControlTextArea from './FormControlTextArea'

type StoryType = StoryObj<typeof FormControlTextArea>

const meta: Meta<typeof FormControlTextArea> = {
    component: FormControlTextArea,
    title: '03-Particles/FormControl/FormControlTextArea',
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
        children: 'FormControlTextArea'
    }
}
