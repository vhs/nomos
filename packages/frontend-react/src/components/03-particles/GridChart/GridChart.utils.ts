import type { CSSProperties } from 'react'

import Gradient from 'javascript-color-gradient'

import type { GridChartStyleProps } from './GridChart.types'

export const generateStyle = (props: GridChartStyleProps): CSSProperties => {
    const styleObject: CSSProperties = {}

    if (props.height != null) styleObject.height = `${props.height}px`
    if (props.width != null) styleObject.width = `${props.width}px`

    return styleObject
}

export const generateColKey = (dataRow: number[], rowIdx: number, colIdx: number): string => {
    return dataRow.join('') + '-' + rowIdx + '-' + colIdx
}

export const getColorArray = (firstColor: string, secondColor: string, steps: number): string[] => {
    const gradient = new Gradient().setColorGradient(firstColor, secondColor).setMidpoint(steps + 1)

    return gradient.getColors()
}
