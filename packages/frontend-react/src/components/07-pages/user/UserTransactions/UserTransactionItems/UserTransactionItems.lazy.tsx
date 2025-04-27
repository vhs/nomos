import { lazy, Suspense, type JSX } from 'react'

import type { UserTransactionItemsProps } from './UserTransactionItems.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const UserTransactionItemsLazy = lazy(async () => await import('./UserTransactionItems'))

const UserTransactionItems = (props: JSX.IntrinsicAttributes & UserTransactionItemsProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <UserTransactionItemsLazy {...props} />
    </Suspense>
)

export default UserTransactionItems
