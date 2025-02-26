import type { ReactNode } from 'react'

import type { FileRoutesByFullPath } from '@/routeTree.gen'

import type { ButtonProps } from '@/components/01-atoms/Button/Button.types'

export interface OverlayCardProps {
    actions?: ReactNode[]
    children: ReactNode
    className?: string
    show?: boolean
    title: string
    closeLabel?: string
    closeVariant?: ButtonProps['variant']
    onClose?: () => boolean
    redirectTo?: keyof FileRoutesByFullPath
}
