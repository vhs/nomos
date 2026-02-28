import moment from 'moment'

import type { FieldDefinitions, FilterDefinitions } from '@/lib/db/utils/query-filters'

export const OAuthPageClientViewFields: FieldDefinitions = [
    { title: 'Name', field: 'name' },
    { title: 'Description', field: 'description' },
    { title: 'Url', field: 'url' },
    { title: 'Redirecturi', field: 'redirecturi' },
    { title: 'Owner', field: ['userid', 'user'] },
    { title: 'Client Id', field: 'id' },
    { title: 'Client Secret', field: 'secret' },
    { title: 'Header', field: ['id', 'secret'] },
    { title: 'Expires', field: 'expires' },
    { title: 'Enabled', field: 'enabled' }
]

export const OAuthPageClientViewFilters: FilterDefinitions = [
    {
        id: 'showExpired',
        label: 'Show Expired',
        filter: {
            column: 'expires',
            operator: '<=',
            value: moment().format('YYYY-MM-DD hh:mm:ss')
        }
    }
]
