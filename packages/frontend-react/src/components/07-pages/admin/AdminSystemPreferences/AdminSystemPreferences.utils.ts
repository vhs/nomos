import type { AdminSystemPreferencesNewSchema, SystemPreferenceSchema } from './AdminSystemPreferences.types'

import type { FieldDefinitions, FilterDefinitions } from '@/lib/db/utils/query-filters'

export const AdminSystemPreferencesFields: FieldDefinitions = [
    { title: 'Key', field: 'key' },
    { title: 'Value', field: 'value' },
    { title: 'Enabled', field: 'enabled' },
    { title: 'Notes', field: 'notes' },
    { title: 'Privileges', field: 'privileges', hidden: true }
]

export const AdminSystemPreferencesFilters: FilterDefinitions = [
    {
        id: 'showEnabled',
        label: 'Show Enabled',
        filter: {
            column: 'enabled',
            operator: '=',
            value: true
        }
    },
    {
        id: 'showDisabled',
        label: 'Show Disabled',
        filter: {
            column: 'enabled',
            operator: '=',
            value: false
        }
    }
]

export const AdminSystemPreferencesNewDefaultValues: AdminSystemPreferencesNewSchema = {
    key: '',
    value: '',
    enabled: false,
    notes: ''
}

export const AdminSystemPreferencesItemFields = ['key', 'value', 'enabled', 'notes', 'privileges']

export const SystemPreferenceDefaultValues: SystemPreferenceSchema = {
    key: '',
    value: '',
    enabled: false,
    notes: ''
}
