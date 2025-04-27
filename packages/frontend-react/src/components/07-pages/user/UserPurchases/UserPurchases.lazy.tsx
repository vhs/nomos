import { lazy, Suspense, type JSX } from 'react'

import type { UserPurchasesProps } from './UserPurchases.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const UserPurchasesLazy = lazy(async () => await import('./UserPurchases'))

const UserPurchases = (props: JSX.IntrinsicAttributes & UserPurchasesProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <UserPurchasesLazy {...props} />
    </Suspense>
)

export default UserPurchases
