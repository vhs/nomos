import type { MouseEventHandler, ReactNode } from 'react'

export interface RowProps {
    children?: ReactNode
    className?: string
    onClick?: MouseEventHandler<HTMLDivElement>
}
