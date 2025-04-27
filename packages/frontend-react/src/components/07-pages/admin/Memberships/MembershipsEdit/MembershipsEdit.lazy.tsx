import { lazy, Suspense, type JSX } from 'react'

import type { MembershipsEditProps } from './MembershipsEdit.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const MembershipsEditLazy = lazy(async () => await import('./MembershipsEdit'))

const MembershipsEdit = (props: JSX.IntrinsicAttributes & MembershipsEditProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <MembershipsEditLazy {...props} />
    </Suspense>
)

export default MembershipsEdit
