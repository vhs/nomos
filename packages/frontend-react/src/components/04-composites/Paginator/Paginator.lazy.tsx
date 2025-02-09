import { lazy, Suspense, type JSX } from 'react'

import type { PaginatorProps } from './Paginator.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyPaginator = lazy(async () => await import('./Paginator'))

const Paginator = (props: JSX.IntrinsicAttributes & PaginatorProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyPaginator {...props} />
    </Suspense>
)

export default Paginator
