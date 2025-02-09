import { lazy, Suspense, type JSX } from 'react'

import type { PrivilegesListProps } from './PrivilegesList.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyPrivilegesList = lazy(async () => await import('./PrivilegesList'))

const PrivilegesList = (props: JSX.IntrinsicAttributes & PrivilegesListProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyPrivilegesList {...props} />
    </Suspense>
)

export default PrivilegesList
