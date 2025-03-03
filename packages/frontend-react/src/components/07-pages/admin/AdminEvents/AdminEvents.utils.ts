import type { FieldDefinitions, FilterDefinitions } from '@/lib/db/utils/query-filters'

export const AdminEventsFields: FieldDefinitions = [
    { title: 'Name', field: 'name' },
    { title: 'Domain', field: 'domain' },
    { title: 'Event', field: 'event' },
    { title: 'Description', field: 'description' },
    { title: 'Enabled', field: 'enabled' },
    { title: 'Privileges', field: 'privileges' }
]

export const AdminEventsFilters: FilterDefinitions = []
