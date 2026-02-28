import { lazy, Suspense, type JSX } from 'react'

import type { MembershipSelectorCardProps } from './MembershipSelectorCard.types'

import LoadingOverlay from '@/components/03-particles/LoadingOverlay/LoadingOverlay'

const LazyMembershipSelectorCard = lazy(async () => await import('./MembershipSelectorCard'))

const MembershipSelectorCard = (props: JSX.IntrinsicAttributes & MembershipSelectorCardProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyMembershipSelectorCard {...props} />
    </Suspense>
)

export default MembershipSelectorCard
