import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import LandingPage from './LandingPage'

type StoryType = StoryObj<typeof LandingPage>

const meta: Meta<typeof LandingPage> = {
    component: LandingPage,
    title: '07-Pages/common/LandingPage',
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
        children: 'LandingPage'
    }
}
