import type { MouseEventHandler, ReactNode } from 'react'

export type ColBreakPoint = 'default' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export type ColBreakPointRecord = Partial<Record<ColBreakPoint, string | number>>

export interface ColProps extends ColBreakPointRecord {
    children?: ReactNode
    className?: string
    onClick?: MouseEventHandler<HTMLDivElement>
}
