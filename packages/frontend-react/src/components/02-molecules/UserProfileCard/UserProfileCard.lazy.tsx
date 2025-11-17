import { lazy, Suspense, type JSX } from 'react'

import type { UserProfileCardProps } from './UserProfileCard.types'

import LoadingOverlay from '@/components/03-particles/LoadingOverlay/LoadingOverlay'

const LazyUserProfileCard = lazy(async () => await import('./UserProfileCard'))

const UserProfileCard = (props: JSX.IntrinsicAttributes & UserProfileCardProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyUserProfileCard {...props} />
    </Suspense>
)

export default UserProfileCard
