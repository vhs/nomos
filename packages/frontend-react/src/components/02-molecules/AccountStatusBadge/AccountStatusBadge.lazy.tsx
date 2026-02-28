import { lazy, Suspense, type JSX } from 'react'

import type { AccountStatusBadgeProps } from './AccountStatusBadge.types'

import LoadingOverlay from '@/components/03-particles/LoadingOverlay/LoadingOverlay'

const LazyAccountStatusBadge = lazy(async () => await import('./AccountStatusBadge'))

const AccountStatusBadge = (props: JSX.IntrinsicAttributes & AccountStatusBadgeProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyAccountStatusBadge {...props} />
    </Suspense>
)

export default AccountStatusBadge
