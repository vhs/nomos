import type { ReactNode } from 'react'

import type { ReactAction } from '@/types/ui'

export interface OverlayProps {
    children?: ReactNode
    handler?: ReactAction<boolean>
}
