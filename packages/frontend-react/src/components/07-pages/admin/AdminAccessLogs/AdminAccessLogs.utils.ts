import type { FilterDefinition } from '@/components/05-materials/TablePage/TablePage.types'

export const AdminAccessLogsFields = [
    { title: 'Time', field: 'time' },
    { title: 'Key', field: 'key' },
    { title: 'Type', field: 'type' },
    { title: 'User ID', field: 'userid' },
    { title: 'Authorized', field: 'authorized' },
    { title: 'From IP', field: 'from_ip' }
]

export const AdminAccessLogsFilters: FilterDefinition[] = [
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
