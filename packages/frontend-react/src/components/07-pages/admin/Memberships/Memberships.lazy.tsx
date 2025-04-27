import { lazy, Suspense, type JSX } from 'react'

import type { MembershipsProps } from './Memberships.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const MembershipsLazy = lazy(async () => await import('./Memberships'))

const Memberships = (props: JSX.IntrinsicAttributes & MembershipsProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <MembershipsLazy {...props} />
    </Suspense>
)

export default Memberships
