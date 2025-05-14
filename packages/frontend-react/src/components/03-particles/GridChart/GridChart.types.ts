export interface GridChartStyleProps {
    gradientFill?: boolean
    height?: number
    width?: number
}

export interface GridChartProps extends GridChartStyleProps {
    title?: string
    data: number[][]
    labels: string[][]
    showValues?: boolean
    showNullValues?: boolean
}

export interface GridChartRowProps extends Partial<GridChartProps> {
    dataRow: number[]
    dataRowIdx: number
    colorArr: string[]
    label?: string
    showValues?: boolean
    showNullValues?: boolean
}

export interface GridChartColLabelsProps extends Pick<GridChartProps, 'labels'> {}
