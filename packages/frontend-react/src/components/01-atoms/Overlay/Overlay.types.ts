import type { ReactNode } from 'react'

import type { ReactAction } from '@/types/custom'

export interface OverlayProps {
    children?: ReactNode
    handler?: ReactAction<boolean>
}
