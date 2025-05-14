import type { FC } from 'react'

import { RouterProvider } from '@tanstack/react-router'
import { SWRConfig } from 'swr'

import WaitingRoom from '@/components/04-composites/WaitingRoom/WaitingRoom'
import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'
import ConfigProvider from '@/components/09-providers/ConfigProvider/ConfigProvider'

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
            <ConfigProvider>
                <AuthenticationProvider>
                    <WaitingRoom>
                        <InnerApp />
                    </WaitingRoom>
                </AuthenticationProvider>
            </ConfigProvider>
        </SWRConfig>
    )
}

export default App
