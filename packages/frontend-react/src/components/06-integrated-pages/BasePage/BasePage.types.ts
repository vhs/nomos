import type { ReactNode } from 'react'

export interface BasePageProps {
    title: string
    embedded?: boolean
    children?: ReactNode
    actions?: ReactNode[]
}
