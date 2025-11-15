import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import FormControlContainer from './FormControlContainer'

type StoryType = StoryObj<typeof FormControlContainer>

const meta: Meta<typeof FormControlContainer> = {
    component: FormControlContainer,
    title: '03-Particles/FormControl/FormControlContainer',
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
        children: 'FormControlContainer'
    }
}
