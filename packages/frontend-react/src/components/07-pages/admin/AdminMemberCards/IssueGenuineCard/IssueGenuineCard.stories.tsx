import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import IssueGenuineCard from './IssueGenuineCard'

type StoryType = StoryObj<typeof IssueGenuineCard>

const meta: Meta<typeof IssueGenuineCard> = {
    component: IssueGenuineCard,
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
        children: 'IssueGenuineCard'
    }
}
