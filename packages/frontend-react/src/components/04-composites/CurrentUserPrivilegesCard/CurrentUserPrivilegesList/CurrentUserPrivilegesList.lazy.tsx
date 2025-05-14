import { lazy, Suspense, type JSX } from 'react'

import type { CurrentUserPrivilegesListProps } from './CurrentUserPrivilegesList.types'

import LoadingOverlay from '@/components/03-particles/LoadingOverlay/LoadingOverlay'

const LazyCurrentUserPrivilegesList = lazy(async () => await import('./CurrentUserPrivilegesList'))

const CurrentUserPrivilegesList = (props: JSX.IntrinsicAttributes & CurrentUserPrivilegesListProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyCurrentUserPrivilegesList {...props} />
    </Suspense>
)

export default CurrentUserPrivilegesList
