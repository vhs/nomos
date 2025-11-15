import { lazy, Suspense, type JSX } from 'react'

import type { CurrentUserPrivilegesCardProps } from './CurrentUserPrivilegesCard.types'

import LoadingOverlay from '@/components/03-particles/LoadingOverlay/LoadingOverlay'

const LazyCurrentUserPrivilegesCard = lazy(async () => await import('./CurrentUserPrivilegesCard'))

const CurrentUserPrivilegesCard = (props: JSX.IntrinsicAttributes & CurrentUserPrivilegesCardProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyCurrentUserPrivilegesCard {...props} />
    </Suspense>
)

export default CurrentUserPrivilegesCard
