import { lazy, Suspense, type JSX } from 'react'

import type { IPNRecordsProps } from './IPNRecords.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const IPNRecordsLazy = lazy(async () => await import('./IPNRecords'))

const IPNRecords = (props: JSX.IntrinsicAttributes & IPNRecordsProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <IPNRecordsLazy {...props} />
    </Suspense>
)

export default IPNRecords
