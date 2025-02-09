import { lazy, Suspense, type JSX } from 'react'

import type { ModalHeaderProps } from './ModalHeader.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyModalHeader = lazy(async () => await import('./ModalHeader'))

const ModalHeader = (props: JSX.IntrinsicAttributes & ModalHeaderProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyModalHeader {...props} />
    </Suspense>
)

export default ModalHeader
