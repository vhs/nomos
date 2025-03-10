import type { FC } from 'react'

import { Link } from '@tanstack/react-router'
import MD5 from 'crypto-js/md5'

import type { UserProfileCardProps } from './UserProfileCard.types'

import useAuth from '@/lib/hooks/useAuth'

const UserProfileCard: FC<UserProfileCardProps> = () => {
    const { isAuthenticated, currentUser } = useAuth()

    if (!isAuthenticated || currentUser == null) {
        return <span>Loading...</span>
    } else {
        const userEmail = currentUser.email

        const emailHash: string = MD5(userEmail).toString()

        const gravatarUrl = `https://www.gravatar.com/avatar/${emailHash}?s=64&d=identicon`

        return (
            <div className='inline-flex'>
                <div className='inline-flex'>
                    <img alt='gravatar' src={gravatarUrl} className='max-h-12 max-w-11' />
                </div>
                <div className='inline-flex flex-col text-center'>
                    <div className='text mx-auto text-ellipsis'>
                        <Link to='/profile'>@{currentUser.username}</Link>
                    </div>
                    <div className='mx-auto'>{currentUser.membership?.title}</div>
                </div>
            </div>
        )
    }
}

export default UserProfileCard
