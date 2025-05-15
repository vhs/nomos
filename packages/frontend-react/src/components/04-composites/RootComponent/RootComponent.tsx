import type { FC } from 'react'

import { Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Bounce, ToastContainer } from 'react-toastify'

import type { RootComponentProps } from './RootComponent.types'

import Conditional from '@/components/01-atoms/Conditional/Conditional'
import Container from '@/components/01-atoms/Container/Container'
import TopBar from '@/components/03-particles/TopBar/TopBar'

const RootComponent: FC<RootComponentProps> = () => {
    return (
        <Container fluid>
            <TopBar />

            <Outlet />

            <ToastContainer
                position='bottom-left'
                autoClose={5000}
                newestOnTop
                closeOnClick
                pauseOnHover
                theme='light'
                transition={Bounce}
                className='z-infinity-and-beyond'
            />

            <Conditional condition={process.env.NODE_ENV === 'development'}>
                <TanStackRouterDevtools />
            </Conditional>
        </Container>
    )
}

export default RootComponent
