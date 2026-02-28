import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

// import { mockHandlers } from '@/lib/mocking/handlers'

import BasePage from './BasePage'

type StoryType = StoryObj<typeof BasePage>

const meta: Meta<typeof BasePage> = {
    component: BasePage,
    title: '04-Composites/BasePage',
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
        children: 'BasePage',
        title: '04-Composites/BasePage'
    }
}
