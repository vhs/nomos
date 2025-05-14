import { lazy, Suspense, type JSX } from 'react'

import type { DashboardProps } from './Dashboard.types'

import LoadingOverlay from '@/components/03-particles/LoadingOverlay/LoadingOverlay'

const DashboardLazy = lazy(async () => await import('./Dashboard'))

const Dashboard = (props: JSX.IntrinsicAttributes & DashboardProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <DashboardLazy {...props} />
    </Suspense>
)

export default Dashboard
