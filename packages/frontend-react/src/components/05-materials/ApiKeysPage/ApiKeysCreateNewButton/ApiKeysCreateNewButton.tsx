import { useMemo, type FC } from 'react'

import { useLocation } from '@tanstack/react-router'

import type { ApiKeyCreateNewButtonLinkOpts, ApiKeysCreateNewButtonProps } from './ApiKeysCreateNewButton.types'
import type { FileRoutesByFullPath } from '@/routeTree.gen'

import LinkButton from '@/components/02-molecules/LinkButton/LinkButton'

import { useApiKeysPageContext } from '../ApiKeysPage.context'

const ApiKeysCreateNewButton: FC<ApiKeysCreateNewButtonProps> = () => {
    const { scope } = useApiKeysPageContext()

    const { pathname } = useLocation()

    const { to, mask, title }: ApiKeyCreateNewButtonLinkOpts = useMemo(
        () => ({
            to: `${pathname}/$/new` as keyof FileRoutesByFullPath,
            mask: {
                to: `${pathname}/new` as keyof FileRoutesByFullPath
            },
            title: `Create ${scope === 'system' ? 'System' : 'Api'} Key`
        }),
        [pathname, scope]
    )

    return (
        <div data-testid='ApiKeysCreateNewButton'>
            <LinkButton variant='primary' from={pathname as keyof FileRoutesByFullPath} to={to} mask={mask}>
                {title}
            </LinkButton>
        </div>
    )
}

export default ApiKeysCreateNewButton
