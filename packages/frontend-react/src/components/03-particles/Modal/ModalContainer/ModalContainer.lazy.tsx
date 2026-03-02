import { lazy, Suspense, type JSX } from 'react'

import type { ModalContainerProps } from './ModalContainer.types'

import LoadingOverlay from '@/components/03-particles/LoadingOverlay/LoadingOverlay'

const LazyModalContainer = lazy(async () => await import('./ModalContainer'))

const ModalContainer = (props: JSX.IntrinsicAttributes & ModalContainerProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyModalContainer {...props} />
    </Suspense>
)

export default ModalContainer
