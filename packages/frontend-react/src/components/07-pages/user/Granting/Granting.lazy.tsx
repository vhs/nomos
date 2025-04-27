import { lazy, Suspense, type JSX } from 'react'

import type { GrantingProps } from './Granting.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const GrantingLazy = lazy(async () => await import('./Granting'))

const Granting = (props: JSX.IntrinsicAttributes & GrantingProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <GrantingLazy {...props} />
    </Suspense>
)

export default Granting
