import type { ReactNode } from 'react'

import type { RowProps } from '@/components/01-atoms/Row/Row.types'

export interface FormRowProps extends RowProps {
    children?: ReactNode
    error?: unknown
}
