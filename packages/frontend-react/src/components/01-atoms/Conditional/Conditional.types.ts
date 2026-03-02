import type { ReactNode } from 'react'

export interface ConditionalProps {
    condition: boolean
    fallback?: ReactNode
    children?: ReactNode
}
