import { lazy, Suspense, type JSX } from 'react'

import type { TablePageProps } from './TablePage.types'

import LoadingOverlay from '@/components/03-particles/LoadingOverlay/LoadingOverlay'

const LazyTablePage = lazy(async () => await import('./TablePage'))

const TablePage = (props: JSX.IntrinsicAttributes & TablePageProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyTablePage {...props} />
    </Suspense>
)

export default TablePage
