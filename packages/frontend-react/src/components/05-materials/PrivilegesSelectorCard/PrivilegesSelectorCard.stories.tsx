import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import PrivilegesSelectorCard from './PrivilegesSelectorCard'

type StoryType = StoryObj<typeof PrivilegesSelectorCard>

const meta: Meta<typeof PrivilegesSelectorCard> = {
    component: PrivilegesSelectorCard,
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
        availablePrivileges: [
            { name: 'Privilege1', code: 'privilege1' },
            { name: 'privilege2', code: 'privilege2' }
        ],
        onUpdate: (mutation) => {
            console.log(mutation)
        }
    }
}
