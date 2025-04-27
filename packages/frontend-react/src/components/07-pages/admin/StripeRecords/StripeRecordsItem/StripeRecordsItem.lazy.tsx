import { lazy, Suspense, type JSX } from 'react'

import type { StripeRecordsItemProps } from './StripeRecordsItem.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const StripeRecordsItemLazy = lazy(async () => await import('./StripeRecordsItem'))

const StripeRecordsItem = (props: JSX.IntrinsicAttributes & StripeRecordsItemProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <StripeRecordsItemLazy {...props} />
    </Suspense>
)

export default StripeRecordsItem
