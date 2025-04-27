import { lazy, Suspense, type JSX } from 'react'

import type { TransactionItemsProps } from './TransactionItems.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const TransactionItemsLazy = lazy(async () => await import('./TransactionItems'))

const TransactionItems = (props: JSX.IntrinsicAttributes & TransactionItemsProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <TransactionItemsLazy {...props} />
    </Suspense>
)

export default TransactionItems
