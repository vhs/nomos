import { lazy, Suspense, type JSX } from 'react'

import type { UserProfileProps } from './UserProfile.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyUserProfile = lazy(async () => await import('./UserProfile'))

const UserProfile = (props: JSX.IntrinsicAttributes & UserProfileProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyUserProfile {...props} />
    </Suspense>
)

export default UserProfile
