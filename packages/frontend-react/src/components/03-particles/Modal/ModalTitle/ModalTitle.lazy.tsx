import { lazy, Suspense, type JSX } from 'react'

import type { ModalTitleProps } from './ModalTitle.types'

import LoadingOverlay from '@/components/03-particles/LoadingOverlay/LoadingOverlay'

const LazyModalTitle = lazy(async () => await import('./ModalTitle'))

const ModalTitle = (props: JSX.IntrinsicAttributes & ModalTitleProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyModalTitle {...props} />
    </Suspense>
)

export default ModalTitle
