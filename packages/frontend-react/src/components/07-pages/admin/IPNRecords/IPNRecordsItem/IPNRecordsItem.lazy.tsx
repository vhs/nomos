import { lazy, Suspense, type JSX } from 'react'

import type { IPNRecordsItemProps } from './IPNRecordsItem.types'

import LoadingOverlay from '@/components/03-particles/LoadingOverlay/LoadingOverlay'

const IPNRecordsItemLazy = lazy(async () => await import('./IPNRecordsItem'))

const IPNRecordsItem = (props: JSX.IntrinsicAttributes & IPNRecordsItemProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <IPNRecordsItemLazy {...props} />
    </Suspense>
)

export default IPNRecordsItem
