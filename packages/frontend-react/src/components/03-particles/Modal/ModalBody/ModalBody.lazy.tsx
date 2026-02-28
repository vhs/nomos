import { lazy, Suspense, type JSX } from 'react'

import type { ModalBodyProps } from './ModalBody.types'

import LoadingOverlay from '@/components/03-particles/LoadingOverlay/LoadingOverlay'

const LazyModalBody = lazy(async () => await import('./ModalBody'))

const ModalBody = (props: JSX.IntrinsicAttributes & ModalBodyProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyModalBody {...props} />
    </Suspense>
)

export default ModalBody
