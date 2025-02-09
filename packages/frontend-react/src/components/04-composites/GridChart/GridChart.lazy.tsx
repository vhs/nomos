import { lazy, Suspense, type JSX } from 'react'

import type { GridChartProps } from './GridChart.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyGridChart = lazy(async () => await import('./GridChart'))

const GridChart = (props: JSX.IntrinsicAttributes & GridChartProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyGridChart {...props} />
    </Suspense>
)

export default GridChart
