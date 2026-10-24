import { lazy, Suspense, type JSX } from 'react'

import type { StripeRecordsProps } from './StripeRecords.types'

import LoadingOverlay from '@/components/03-particles/LoadingOverlay/LoadingOverlay'

const StripeRecordsLazy = lazy(async () => await import('./StripeRecords'))

const StripeRecords = (props: JSX.IntrinsicAttributes & StripeRecordsProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <StripeRecordsLazy {...props} />
    </Suspense>
)

export default StripeRecords
