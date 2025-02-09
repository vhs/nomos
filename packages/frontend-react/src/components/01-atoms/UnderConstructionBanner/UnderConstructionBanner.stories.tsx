import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import UnderConstructionBanner from './UnderConstructionBanner'

type StoryType = StoryObj<typeof UnderConstructionBanner>

const meta: Meta<typeof UnderConstructionBanner> = {
    component: UnderConstructionBanner,
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
        children: 'UnderConstructionBanner'
    }
}
