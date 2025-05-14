import { lazy, Suspense, type JSX } from 'react'

import type { ReportsProps } from './Reports.types'

import LoadingOverlay from '@/components/03-particles/LoadingOverlay/LoadingOverlay'

const ReportsLazy = lazy(async () => await import('./Reports'))

const Reports = (props: JSX.IntrinsicAttributes & ReportsProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <ReportsLazy {...props} />
    </Suspense>
)

export default Reports
