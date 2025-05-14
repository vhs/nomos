import type { ReactNode } from 'react'

import type { LinkButtonProps } from '@/components/02-molecules/LinkButton/LinkButton.types'

export interface ApiKeysCreateNewButtonProps {
    children?: ReactNode
    basePath: string
}

export interface ApiKeysCreateNewButtonLinkOpts {
    to: LinkButtonProps['to']
    mask: LinkButtonProps['mask']
    title: ReactNode
}
