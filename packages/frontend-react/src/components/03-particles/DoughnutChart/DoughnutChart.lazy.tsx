import { lazy, Suspense, type JSX } from 'react'

import type { DoughnutChartProps } from './DoughnutChart.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyDoughnutChart = lazy(async () => await import('./DoughnutChart'))

const DoughnutChart = (props: JSX.IntrinsicAttributes & DoughnutChartProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyDoughnutChart {...props} />
    </Suspense>
)

export default DoughnutChart
