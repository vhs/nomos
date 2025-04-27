import { lazy, Suspense, type JSX } from 'react'

import type { TransactionsProps } from './Transactions.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const TransactionsLazy = lazy(async () => await import('./Transactions'))

const Transactions = (props: JSX.IntrinsicAttributes & TransactionsProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <TransactionsLazy {...props} />
    </Suspense>
)

export default Transactions
