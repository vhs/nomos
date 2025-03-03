import type { ApiKeysActiveView, ApiKeysDictionary } from './ApiKeysPage.types'

export const ApiKeysTerms: ApiKeysDictionary = {
    title: { user: 'Manage API Keys', system: 'Manage System API Keys' },
    manageTableDescription: { user: 'Your API Keys', system: 'System API Keys' },
    deleteApiKeyError: {
        user: 'Unexpected error while deleting API key',
        system: 'Unexpected error while deleting system key'
    },
    deleteApiKeyPending: { user: 'Deleting new API key', system: 'Creating new system key' },
    deleteApiKeySuccess: { user: 'Deleted API key', system: 'Deleted system key' },
    newApiKeyError: {
        user: 'Unexpected error while creating new API key',
        system: 'Unexpected error while creating new system key'
    },
    newApiKeyPending: { user: 'Creating new API key', system: 'Creating new system key' },
    newApiKeySuccess: { user: 'Created new API key', system: 'Created new system key' },
    updateApiKeyError: {
        user: 'Unexpected error while updating API key',
        system: 'Unexpected error while updating system key'
    },
    updateApiKeyPending: { user: 'Updating API key', system: 'Updating system key' },
    updateApiKeySuccess: { user: 'Updated API key', system: 'Updated system key' }
}

export const ApiKeysMenu: Record<ApiKeysActiveView, string> = {
    list: 'Manage',
    usage: 'Usage',
    help: 'Help'
}
