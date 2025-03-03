import type { ApiKeysActiveView, ApiKeysDictionary } from './ApiKeysPage.types'

export const ApiKeysTerms: ApiKeysDictionary = {
    title: { user: 'Manage API Keys', system: 'Manage System API Keys' },
    manageTableDescription: { user: 'Your API Keys', system: 'System API Keys' }
}

export const ApiKeysMenu: Record<ApiKeysActiveView, string> = {
    list: 'Manage',
    usage: 'Usage',
    help: 'Help'
}
