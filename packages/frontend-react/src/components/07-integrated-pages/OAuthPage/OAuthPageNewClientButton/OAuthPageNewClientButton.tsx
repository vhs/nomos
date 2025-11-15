import { useMemo, type FC } from 'react'

import { useLocation } from '@tanstack/react-router'

import type { OAuthPageNewClientButtonLinkOpts, OAuthPageNewClientButtonProps } from './OAuthPageNewClientButton.types'
import type { FileRoutesByFullPath } from '@/routeTree.gen'

import LinkButton from '@/components/02-molecules/LinkButton/LinkButton'

import { useOAuthPageContext } from '../OAuthPage.context'

const OAuthPageNewClientButton: FC<OAuthPageNewClientButtonProps> = () => {
    const { basePath, scope } = useOAuthPageContext()

    const { pathname } = useLocation()

    const { to, mask, title }: OAuthPageNewClientButtonLinkOpts = useMemo(
        () => ({
            to: `${basePath}/$/new` as keyof FileRoutesByFullPath,
            mask: {
                to: `/${basePath}/new` as keyof FileRoutesByFullPath
            },
            title: `Create ${scope === 'system' ? 'System' : 'User'} OAuth Client`
        }),
        [basePath, scope]
    )

    return (
        <div data-testid='OAuthCreateNewButton'>
            <LinkButton variant='primary' from={pathname as keyof FileRoutesByFullPath} to={to} mask={mask}>
                {title}
            </LinkButton>
        </div>
    )
}

export default OAuthPageNewClientButton
