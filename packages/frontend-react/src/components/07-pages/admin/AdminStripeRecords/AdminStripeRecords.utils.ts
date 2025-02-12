import type { FilterDefinition } from '@/components/05-materials/TablePage/TablePage.types'

export const AdminStripeRecordsFields = [
    { title: 'Timestamp', field: 'ts' },
    { title: 'Status', field: 'status' },
    { title: 'Created', field: 'created' },
    { title: 'Event Id', field: 'event_id' },
    { title: 'Type', field: 'type' },
    { title: 'Object', field: 'object' },
    { title: 'Request', field: 'request' },
    { title: 'API Version', field: 'api_version' },
    { title: 'Raw', field: 'raw' }
]

export const AdminStripeRecordsFilters: FilterDefinition[] = [
    {
        id: 'pending',
        label: 'Show Pending',
        filter: {
            column: 'payment_status',
            operator: '=',
            value: '0'
        }
    },
    {
        id: 'orphaned',
        label: 'Show Orphaned',
        filter: {
            column: 'validation',
            operator: '=',
            value: 'INVALID'
        }
    }
]
