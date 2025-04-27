import { lazy, Suspense, type JSX } from 'react'

import type { UserTransactionsProps } from './UserTransactions.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const UserTransactionsLazy = lazy(async () => await import('./UserTransactions'))

const UserTransactions = (props: JSX.IntrinsicAttributes & UserTransactionsProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <UserTransactionsLazy {...props} />
    </Suspense>
)

export default UserTransactions
