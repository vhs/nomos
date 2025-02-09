import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import AdminTemplateNameItem from './AdminTemplateNameItem'

type StoryType = StoryObj<typeof AdminTemplateNameItem>

const meta: Meta<typeof AdminTemplateNameItem> = {
    component: AdminTemplateNameItem,
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
        data: [{ id: 1, title: 'AdminTemplateNameItem' }]
    }
}
