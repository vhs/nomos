import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import SpaciousRow from './SpaciousRow'

type StoryType = StoryObj<typeof SpaciousRow>

const meta: Meta<typeof SpaciousRow> = {
    component: SpaciousRow,
    title: '02-Molecules/SpaciousRow',
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
        children: 'SpaciousRow'
    }
}
