import { lazy, Suspense, type JSX } from 'react'

import type { MembershipsItemProps } from './MembershipsItem.types'

import LoadingOverlay from '@/components/03-particles/LoadingOverlay/LoadingOverlay'

const MembershipsItemLazy = lazy(async () => await import('./MembershipsItem'))

const MembershipsItem = (props: JSX.IntrinsicAttributes & MembershipsItemProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <MembershipsItemLazy {...props} />
    </Suspense>
)

export default MembershipsItem
