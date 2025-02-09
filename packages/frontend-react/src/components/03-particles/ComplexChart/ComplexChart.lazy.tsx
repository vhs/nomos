import { lazy, Suspense, type JSX } from 'react'

import type { ComplexChartProps } from './ComplexChart.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyComplexChart = lazy(async () => await import('./ComplexChart'))

const ComplexChart = (props: JSX.IntrinsicAttributes & ComplexChartProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyComplexChart {...props} />
    </Suspense>
)

export default ComplexChart
