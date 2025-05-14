import type { ReactNode } from 'react'

import type { LinkButtonProps } from '@/components/02-molecules/LinkButton/LinkButton.types'

export interface OAuthPageNewClientButtonProps {
    children?: ReactNode
    basePath: string
}

export interface OAuthPageNewClientButtonLinkOpts {
    to: LinkButtonProps['to']
    mask: LinkButtonProps['mask']
    title: ReactNode
}
