import { useEffect } from 'react'

import { useRouter } from '@tanstack/react-router'

import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import ApiKeysPage from './ApiKeysPage'

type StoryType = StoryObj<typeof ApiKeysPage>

const meta: Meta<typeof ApiKeysPage> = {
    component: ApiKeysPage,
    title: '05-Materials/ApiKeysPage',
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
} satisfies Meta<typeof ApiKeysPage>

export default meta

export const Default: StoryType = {}
