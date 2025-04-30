import { useCallback, useEffect, useMemo, useState, type FC } from 'react'

import useSWR from 'swr'

import type {
    ConfigProviderContextReady,
    ConfigProviderContextValue,
    ConfigProviderProps,
    ConfigState,
    SiteConfig
} from './ConfigProvider.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

import { ConfigProviderContext } from './ConfigProvider.context'
import { isSiteConfig } from './ConfigProvider.guards'
import { zConfigStateError, zConfigStateLoading, zConfigStateReady } from './ConfigProvider.schemas'

const ConfigProvider: FC<ConfigProviderProps> = ({ children }) => {
    const [config, setConfig] = useState<SiteConfig | undefined>(undefined)
    const [state, setState] = useState<ConfigState>('loading')

    const { data, isLoading, error } = useSWR<SiteConfig, Error>('/config.json')

    useEffect(() => {
        if (isLoading) {
            setState(zConfigStateLoading.value)
        } else if (error != null) {
            setState(zConfigStateError.value)
        } else {
            if (isSiteConfig(data)) {
                setConfig(data)
                setState(zConfigStateReady.value)
            } else {
                setState(zConfigStateError.value)
            }
        }
    }, [data, isLoading, error])

    const getFullUri = useCallback(
        (endpoint: string): string | null => {
            if (state === 'ready' && config?.baseApiUri != null)
                return [config.baseApiUri, endpoint].join(endpoint[0] === '/' ? '' : '/')

            return null
        },
        [config?.baseApiUri, state]
    )

    const contextValue: ConfigProviderContextValue = useMemo(() => {
        if (state === 'ready' && isSiteConfig(config)) {
            const readyConfig: ConfigProviderContextReady = {
                config,
                getFullUri,
                state
            }

            return readyConfig
        } else if (state === 'loading')
            return {
                getFullUri,
                state
            }
        else if (state === 'error')
            return {
                getFullUri,
                state
            }
        else throw new Error('Invalid context exception')
    }, [config, getFullUri, state])

    if (state === 'loading') <LoadingOverlay />

    return (
        <ConfigProviderContext.Provider value={contextValue} data-testid='ConfigProvider'>
            {children}
        </ConfigProviderContext.Provider>
    )
}

export default ConfigProvider
