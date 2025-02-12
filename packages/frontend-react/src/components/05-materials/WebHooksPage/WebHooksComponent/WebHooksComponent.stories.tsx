import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import WebHooksComponent from './WebHooksComponent'

type StoryType = StoryObj<typeof WebHooksComponent>

const meta: Meta<typeof WebHooksComponent> = {
    component: WebHooksComponent,
    title: '05-Materials/WebHooksPage/WebHooksComponent',
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
