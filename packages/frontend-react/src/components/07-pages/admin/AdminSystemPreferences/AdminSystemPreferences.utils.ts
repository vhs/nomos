import type { FieldDefinitions, FilterDefinitions } from '@/types/query-filters'

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
