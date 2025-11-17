import type { ReactNode } from 'react'

import type { ColProps } from '@/components/01-atoms/Col/Col.types'

export interface FormColProps extends ColProps {
    children?: ReactNode
    error?: unknown
}
