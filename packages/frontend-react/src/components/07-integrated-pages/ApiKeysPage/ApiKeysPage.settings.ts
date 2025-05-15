import type { ApiKeysActiveView, ApiKeysDictionary } from './ApiKeysPage.types'

export const ApiKeysTerms: ApiKeysDictionary = {
    title: { user: 'Manage API Keys', system: 'Manage System API Keys' },
    manageTableDescription: { user: 'Your API Keys', system: 'System API Keys' },
    deleteApiKeysError: {
        user: 'Unexpected error while deleting API key',
        system: 'Unexpected error while deleting system key'
    },
    deleteApiKeysPending: { user: 'Deleting new API key', system: 'Creating new system key' },
    deleteApiKeysSuccess: { user: 'Deleted API key', system: 'Deleted system key' },
    newApiKeysError: {
        user: 'Unexpected error while creating new API key',
        system: 'Unexpected error while creating new system key'
    },
    newApiKeysPending: { user: 'Creating new API key', system: 'Creating new system key' },
    newApiKeysSuccess: { user: 'Created new API key', system: 'Created new system key' },
    updateApiKeysError: {
        user: 'Unexpected error while updating API key',
        system: 'Unexpected error while updating system key'
    },
    updateApiKeysPending: { user: 'Updating API key', system: 'Updating system key' },
    updateApiKeysSuccess: { user: 'Updated API key', system: 'Updated system key' }
}

export const ApiKeysMenu: Record<ApiKeysActiveView, string> = {
    list: 'Manage',
    usage: 'Usage',
    help: 'Help'
}
