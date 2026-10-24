import type { FieldDefinitions, FilterDefinitions } from '@/lib/db/utils/query-filters'

export const AccessLogsFields: FieldDefinitions = [
    { title: 'Time', field: 'time' },
    { title: 'Key', field: 'key' },
    { title: 'Type', field: 'type' },
    { title: 'User ID', field: 'userid' },
    { title: 'Authorized', field: 'authorized' },
    { title: 'From IP', field: 'from_ip' }
]

export const AccessLogsFilters: FilterDefinitions = [
    {
        id: 'unauthorized',
        label: 'Failed Attempts',
        filter: {
            column: 'authorized',
            operator: '=',
            value: '0'
        }
    }
]
