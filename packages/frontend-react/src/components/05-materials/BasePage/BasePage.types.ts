import type { ReactNode } from 'react'

export interface BasePageProps {
    title: string
    children?: ReactNode
    actions?: ReactNode[]
}
