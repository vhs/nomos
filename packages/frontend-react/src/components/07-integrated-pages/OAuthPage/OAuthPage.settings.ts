import type { OAuthPageActiveView, OAuthPagehDictionary } from './OAuthPage.types'

export const OAuthTerms: OAuthPagehDictionary = {
    title: 'Manage OAuth',
    manageTableDescription: { user: 'Your OAuth Clients', system: 'System OAuth Clients' },
    deleteOAuthError: {
        user: 'Unexpected error while deleting OAuth clients',
        system: 'Unexpected error while deleting OAuth client'
    },
    deleteOAuthPending: { user: 'Deleting new OAuth client', system: 'Creating new system OAuth client' },
    deleteOAuthSuccess: { user: 'Deleted OAuth client', system: 'Deleted system OAuth client' },
    newOAuthError: {
        user: 'Unexpected error while creating new OAuth client',
        system: 'Unexpected error while creating new OAuth client'
    },
    newOAuthPending: { user: 'Creating new OAuth client', system: 'Creating new system OAuth client' },
    newOAuthSuccess: { user: 'Created new OAuth client', system: 'Created new system OAuth client' },
    updateOAuthError: {
        user: 'Unexpected error while updating OAuth client',
        system: 'Unexpected error while updating OAuth client'
    },
    updateOAuthPending: { user: 'Updating OAuth client', system: 'Updating OAuth client' },
    updateOAuthSuccess: { user: 'Updated OAuth client', system: 'Updated OAuth client' }
}
export const OAuthMenu: Record<OAuthPageActiveView, string> = {
    '': 'Default',
    'clients': 'OAuth Clients'
}
