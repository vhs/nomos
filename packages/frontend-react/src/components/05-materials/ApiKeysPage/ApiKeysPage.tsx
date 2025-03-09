import { useMemo, type FC } from 'react'

import { useLocation } from '@tanstack/react-router'

import type { ApiKeysPageContextValue, ApiKeysPageProps } from './ApiKeysPage.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

import ApiKeysHelpPage from './ApiKeysHelpPage/ApiKeysHelpPage.lazy'
import ApiKeysListPage from './ApiKeysListPage/ApiKeysListPage.lazy'
import { useAvailablePrivileges, useAvailableKeys } from './ApiKeysPage.hooks'
import { getParsedApiKeysPath } from './ApiKeysPage.utils'
import ApiKeysPageContainer from './ApiKeysPageContainer/ApiKeysPageContainer.lazy'
import ApiKeysUsagePage from './ApiKeysUsagePage/ApiKeysUsagePage.lazy'

const ApiKeysPage: FC<ApiKeysPageProps> = ({ basePath, scope }) => {
    scope = scope ?? 'user'

    const { pathname } = useLocation()

    const { createModal, editModal, keyId, activeView } = useMemo(
        () => getParsedApiKeysPath(basePath, pathname),
        [basePath, pathname]
    )

    const { data: availablePrivileges } = useAvailablePrivileges(scope)
    const { data: availableKeys } = useAvailableKeys(scope)

    const loading = useMemo(
        () => [availablePrivileges, availableKeys].some((inp) => !Array.isArray(inp) || inp.length === 0),
        [availablePrivileges, availableKeys]
    )

    const contextValue: ApiKeysPageContextValue = useMemo(() => {
        return {
            activeView,
            availableKeys: availableKeys ?? [],
            availablePrivileges: availablePrivileges ?? [],
            basePath,
            scope
        }
    }, [activeView, availableKeys, availablePrivileges, basePath, scope])

    if (loading || !Array.isArray(availablePrivileges) || !Array.isArray(availableKeys)) return <LoadingOverlay />

    if (activeView === 'help')
        return (
            <ApiKeysPageContainer
                contextValue={contextValue}
                createModal={createModal}
                editModal={editModal}
                keyId={keyId}
                {...contextValue}
            >
                <ApiKeysHelpPage />
            </ApiKeysPageContainer>
        )

    if (activeView === 'usage')
        return (
            <ApiKeysPageContainer
                contextValue={contextValue}
                createModal={createModal}
                editModal={editModal}
                keyId={keyId}
                {...contextValue}
            >
                <ApiKeysUsagePage />
            </ApiKeysPageContainer>
        )

    return (
        <ApiKeysPageContainer
            contextValue={contextValue}
            createModal={createModal}
            editModal={editModal}
            keyId={keyId}
            {...contextValue}
        >
            <ApiKeysListPage />
        </ApiKeysPageContainer>
    )
}

export default ApiKeysPage
