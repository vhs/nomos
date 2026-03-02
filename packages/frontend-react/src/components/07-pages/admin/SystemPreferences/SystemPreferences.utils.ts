import type { SystemPreferencesNewSchema, SystemPreferenceSchema } from './SystemPreferences.types'

import type { FieldDefinitions, FilterDefinitions } from '@/lib/db/utils/query-filters'

export const SystemPreferencesFields: FieldDefinitions = [
    { title: 'Key', field: 'key' },
    { title: 'Value', field: 'value' },
    { title: 'Enabled', field: 'enabled' },
    { title: 'Notes', field: 'notes' },
    { title: 'Privileges', field: 'privileges', hidden: true }
]

export const SystemPreferencesFilters: FilterDefinitions = [
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

export const SystemPreferencesNewDefaultValues: SystemPreferencesNewSchema = {
    key: '',
    value: '',
    enabled: false,
    notes: ''
}

export const SystemPreferencesItemFields = ['key', 'value', 'enabled', 'notes', 'privileges']

export const SystemPreferenceDefaultValues: SystemPreferenceSchema = {
    key: '',
    value: '',
    enabled: false,
    notes: ''
}
