import { lazy, Suspense, type JSX } from 'react'

import type { ModalFooterProps } from './ModalFooter.types'

import LoadingOverlay from '@/components/03-particles/LoadingOverlay/LoadingOverlay'

const LazyModalFooter = lazy(async () => await import('./ModalFooter'))

const ModalFooter = (props: JSX.IntrinsicAttributes & ModalFooterProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyModalFooter {...props} />
    </Suspense>
)

export default ModalFooter
