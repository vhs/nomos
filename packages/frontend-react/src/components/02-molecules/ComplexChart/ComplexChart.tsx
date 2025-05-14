import type { FC } from 'react'

import type { ComplexChartProps } from './ComplexChart.types'

type DimensionProps =
    | Record<string, unknown>
    | { width: number }
    | { height: number }
    | { width: number; height: number }

const ComplexChart: FC<ComplexChartProps> = ({ width, height, component: Component, ...chartProps }) => {
    const dimensionProps: DimensionProps = {}

    if (width != null) dimensionProps.width = width
    if (height != null) dimensionProps.height = height

    return (
        <div data-testid='ComplexChart' style={{ width, height }}>
            <Component {...dimensionProps} {...chartProps} />
        </div>
    )
}

export default ComplexChart
