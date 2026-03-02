import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import FormRow from './FormRow'

type StoryType = StoryObj<typeof FormRow>

const meta: Meta<typeof FormRow> = {
    component: FormRow,
    title: '02-Molecules/FormRow',
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
        children: 'FormRow'
    }
}
