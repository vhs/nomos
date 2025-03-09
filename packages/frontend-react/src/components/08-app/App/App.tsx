import type { FC } from 'react'

import { RouterProvider } from '@tanstack/react-router'
import { SWRConfig } from 'swr'

import WaitingRoom from '@/components/02-molecules/WaitingRoom/WaitingRoom'
import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import { fetcher } from '@/lib/fetcher'
import useAuth from '@/lib/hooks/useAuth'

import { router } from '@/router'

const InnerApp: FC = () => {
    const auth = useAuth()

    return <RouterProvider router={router} context={{ auth }} />
}

const App: FC = () => {
    return (
        <SWRConfig
            value={{
                fetcher
            }}
        >
            <AuthenticationProvider>
                <WaitingRoom>
                    <InnerApp />
                </WaitingRoom>
            </AuthenticationProvider>
        </SWRConfig>
    )
}

export default App
