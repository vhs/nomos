import type { FieldDefinition, FilterDefinition } from '@/components/05-materials/TablePage/TablePage.types'

export const AdminSystemPreferencesFields: FieldDefinition[] = [
    { title: 'Key', field: 'key' },
    { title: 'Value', field: 'value' },
    { title: 'Enabled', field: 'enabled' },
    { title: 'Notes', field: 'notes' },
    { title: 'Privileges', field: 'privileges', hidden: true }
]

export const AdminSystemPreferencesFilters: FilterDefinition[] = [
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
