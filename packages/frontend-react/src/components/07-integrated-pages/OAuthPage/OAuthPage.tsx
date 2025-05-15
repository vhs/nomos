import { useMemo, type FC } from 'react'

import { useLocation } from '@tanstack/react-router'

import type { OAuthPageContextValue, OAuthPageProps } from './OAuthPage.types'

import { getParsedOAuthPath } from './OAuthPage.utils'
import OAuthPageClientView from './OAuthPageClientView/OAuthPageClientView'
import OAuthPageContainer from './OAuthPageContainer/OAuthPageContainer'
import OAuthPageDefaultView from './OAuthPageDefaultView/OAuthPageDefaultView'

const OAuthPage: FC<OAuthPageProps> = ({ basePath, scope }) => {
    scope = scope ?? 'user'

    const { pathname } = useLocation()

    const { createModal, editModal, appClientId, activeView } = useMemo(
        () => getParsedOAuthPath(basePath, pathname),
        [basePath, pathname]
    )

    const contextValue: OAuthPageContextValue = useMemo(() => {
        return {
            activeView,
            basePath,
            scope
        }
    }, [activeView, basePath, scope])

    if (activeView === 'clients')
        return (
            <OAuthPageContainer
                data-testid='OAuthPage'
                contextValue={contextValue}
                createModal={createModal}
                editModal={editModal}
                appClientId={appClientId}
                {...contextValue}
            >
                <OAuthPageClientView />
            </OAuthPageContainer>
        )

    return (
        <OAuthPageContainer
            data-testid='OAuthPage'
            contextValue={contextValue}
            createModal={createModal}
            editModal={editModal}
            appClientId={appClientId}
            {...contextValue}
        >
            <OAuthPageDefaultView basePath={basePath} />
        </OAuthPageContainer>
    )
}

export default OAuthPage
