import { lazy, Suspense, type JSX } from 'react'

import type { UserAccessHistoryProps } from './UserAccessHistory.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const UserAccessHistoryLazy = lazy(async () => await import('./UserAccessHistory'))

const UserAccessHistory = (props: JSX.IntrinsicAttributes & UserAccessHistoryProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <UserAccessHistoryLazy {...props} />
    </Suspense>
)

export default UserAccessHistory
