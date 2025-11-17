import type { ElementType, ComponentType } from 'react'

export type ComplexChartProps<T extends ComponentType = ComponentType> = Omit<T, 'height' | 'width'> & {
    height?: number
    width?: number
    component: ElementType
}
