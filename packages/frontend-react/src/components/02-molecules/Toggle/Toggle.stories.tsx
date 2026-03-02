import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

// import { mockHandlers } from '@/lib/mocking/handlers'

import Toggle from './Toggle'

type StoryType = StoryObj<typeof Toggle>

const meta: Meta<typeof Toggle> = {
    component: Toggle,
    title: '02-Molecules/Toggle',
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
    render: () => (
        <>
            <Toggle>Unchecked</Toggle>
            <Toggle checked>Checked</Toggle>
            <Toggle disabled>Default and Disabled</Toggle>
            <Toggle checked={false} disabled={true}>
                Unchecked and Disabled
            </Toggle>
            <Toggle checked={true} disabled={true}>
                Checked and Disabled
            </Toggle>
        </>
    )
}

export const Unchecked = {}

export const Checked = {
    args: { checked: true }
}

export const Disabled = {
    args: { disabled: true }
}
