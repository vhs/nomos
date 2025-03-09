import { useEffect } from 'react'

import { useRouter } from '@tanstack/react-router'

import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import UserApiKeys from './UserApiKeys'

type StoryType = StoryObj<typeof UserApiKeys>

const meta: Meta<typeof UserApiKeys> = {
    component: UserApiKeys,
    title: '07-Pages/User/UserApiKeys',
    decorators: [
        (Story) => (
            <AuthenticationProvider>
                <Story />
            </AuthenticationProvider>
        ),
        (Story) => {
            const router = useRouter()

            useEffect(() => {
                router.__store.setState((prev) => {
                    return {
                        ...prev,
                        location: { ...prev.location, pathname: '/apikeys' }
                    }
                })
            }, [router])

            return <Story />
        }
    ]
} satisfies Meta<typeof UserApiKeys>

export default meta

export const Default: StoryType = {}
