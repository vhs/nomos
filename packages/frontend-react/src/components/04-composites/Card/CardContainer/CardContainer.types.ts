import type { MouseEventHandler, ReactNode } from 'react'

export interface CardContainerProps {
    children?: ReactNode
    className?: string

    error?: boolean

    onMouseLeave?: MouseEventHandler<HTMLDivElement>
}
