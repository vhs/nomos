import type { FC } from 'react'

import type { WaitingRoomProps } from './WaitingRoom.types'

import useAuth from '@/lib/hooks/useAuth'

import LoadingOverlay from '../LoadingOverlay/LoadingOverlay'

const WaitingRoom: FC<WaitingRoomProps> = ({ children }) => {
    const { authenticationState, currentUser } = useAuth()

    if (authenticationState === -1 || (authenticationState === 1 && currentUser == null)) return <LoadingOverlay />

    return <>{children}</>
}

export default WaitingRoom
