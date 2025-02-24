import type { FC } from 'react'

import type { WaitingRoomProps } from './WaitingRoom.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

import useAuth from '@/lib/hooks/useAuth'

const WaitingRoom: FC<WaitingRoomProps> = ({ children }) => {
    const { authenticationState, currentUser } = useAuth()

    if (authenticationState === -1 || (authenticationState === 1 && currentUser == null)) return <LoadingOverlay />

    return <>{children}</>
}

export default WaitingRoom
