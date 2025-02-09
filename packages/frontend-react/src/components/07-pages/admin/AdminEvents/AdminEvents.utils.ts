import type { FieldDefinition, FilterDefinition } from '@/components/05-materials/TablePage/TablePage.types'

export const AdminEventsFields: FieldDefinition[] = [
    { title: 'Name', field: 'name' },
    { title: 'Domain', field: 'domain' },
    { title: 'Event', field: 'event' },
    { title: 'Description', field: 'description' },
    { title: 'Enabled', field: 'enabled' },
    { title: 'Privileges', field: 'privileges' }
]

export const AdminEventsFilters: FilterDefinition[] = []
