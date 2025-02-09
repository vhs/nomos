import { lazy, Suspense, type JSX } from 'react'

import type { PrivilegesSelectorCardProps } from './PrivilegesSelectorCard.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyPrivilegesSelectorCard = lazy(async () => await import('./PrivilegesSelectorCard'))

const PrivilegesSelectorCard = (props: JSX.IntrinsicAttributes & PrivilegesSelectorCardProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyPrivilegesSelectorCard {...props} />
    </Suspense>
)

export default PrivilegesSelectorCard
