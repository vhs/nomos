import { lazy, Suspense, type JSX } from 'react'

import type { PrivilegePillProps } from './PrivilegePill.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyPrivilegePill = lazy(async () => await import('./PrivilegePill'))

const PrivilegePill = (props: JSX.IntrinsicAttributes & PrivilegePillProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyPrivilegePill {...props} />
    </Suspense>
)

export default PrivilegePill
