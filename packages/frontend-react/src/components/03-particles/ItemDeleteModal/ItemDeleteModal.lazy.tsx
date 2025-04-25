import { lazy, Suspense, type JSX } from 'react'

import type { ItemDeleteModalProps } from './ItemDeleteModal.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyItemDeleteModal = lazy(async () => await import('./ItemDeleteModal'))

const ItemDeleteModal = (props: JSX.IntrinsicAttributes & ItemDeleteModalProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyItemDeleteModal {...props} />
    </Suspense>
)

export default ItemDeleteModal
