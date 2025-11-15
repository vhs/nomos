import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import WebHooksItem from './WebHooksItem'

type StoryType = StoryObj<typeof WebHooksItem>

const meta: Meta<typeof WebHooksItem> = {
    component: WebHooksItem,
    title: '07-integrated-Pages/WebHooksPage/WebHooksItem',
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
        data: {
            id: 1,
            name: self.crypto.randomUUID(),
            description: self.crypto.randomUUID(),
            enabled: false,
            userid: 0,
            url: 'https://webhhooks.example.com/nomos',
            translation: '',
            headers: '',
            method: 'CONNECT',
            eventid: 0
        }
    }
}
