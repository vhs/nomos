import type { JSX, ReactNode } from 'react'

export interface ConditionalProps {
    condition: boolean
    fallback?: JSX.Element
    children?: ReactNode
}
