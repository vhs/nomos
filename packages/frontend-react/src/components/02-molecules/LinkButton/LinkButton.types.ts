import type { ReactNode } from 'react'

import type { LinkProps } from '@tanstack/react-router'

import type { ButtonProps } from '@/components/02-molecules/Button/Button.types'

export interface LinkButtonProps extends ButtonProps, LinkProps {
    children: ReactNode
}
