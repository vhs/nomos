import type { ReactNode } from 'react'

export type PageSelectFn = (newPage: number) => void

interface PageSelectFnProps {
    pageSelectFn: PageSelectFn
}

export interface PaginatorProps extends PageSelectFnProps {
    currentPage: number
    size: number
    count: number | undefined | null
    disabled?: boolean
    children?: ReactNode
}

export interface PaginatorDisabledFeatures {
    first?: boolean
    previous?: boolean
    backward?: boolean
    forward?: boolean
    next?: boolean
    last?: boolean
}

export interface PaginatorItemsProps extends PageSelectFnProps {
    count: number | undefined | null
    currentPage: number
    size: number
    totalPages: number
}

export type PaginatorItemVariants = 'first' | 'prev' | 'next' | 'last' | 'backward' | 'forward'

export interface PaginatorItemProps {
    variant?: PaginatorItemVariants
    active?: boolean
    disabled?: boolean
    children?: ReactNode
    onClick?: () => void
}
