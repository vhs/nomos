import { lazy, Suspense, type JSX } from 'react'

import type { ProfileProps } from './Profile.types'

import LoadingOverlay from '@/components/03-particles/LoadingOverlay/LoadingOverlay'

const ProfileLazy = lazy(async () => await import('./Profile'))

const Profile = (props: JSX.IntrinsicAttributes & ProfileProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <ProfileLazy {...props} />
    </Suspense>
)

export default Profile
