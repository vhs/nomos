import { useEffect } from 'react'

import { useRouter } from '@tanstack/react-router'

import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import ApiKeys from './ApiKeys'

type StoryType = StoryObj<typeof ApiKeys>

const meta: Meta<typeof ApiKeys> = {
    component: ApiKeys,
    title: '07-Pages/User/ApiKeys',
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
} satisfies Meta<typeof ApiKeys>

export default meta

export const Default: StoryType = {}
