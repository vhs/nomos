import type { FC } from 'react'

import { Link } from '@tanstack/react-router'

import Conditional from '@/components/01-atoms/Conditional/Conditional'
import NavBar from '@/components/01-atoms/NavBar/NavBar'
import UserProfileCard from '@/components/03-particles/UserProfileCard/UserProfileCard'

import useAuth from '@/lib/hooks/useAuth'

const TopBar: FC = () => {
    const { isAuthenticated } = useAuth()

    return (
        <NavBar>
            <div className='flex w-full justify-between'>
                <Link to='/'>
                    <img className='h-12' src='/images/logo.png' alt='VHS logo' />
                </Link>
                <Conditional condition={isAuthenticated}>
                    <div>
                        <UserProfileCard />
                    </div>
                </Conditional>
            </div>
        </NavBar>
    )
}

export default TopBar
