import type { FieldDefinitions, FilterDefinitions } from '@/lib/db/utils/query-filters'

export const IPNRecordsFields: FieldDefinitions = [
    { title: 'Created', field: 'created' },
    { title: 'Validated', field: 'validation' },
    { title: 'Payment Status', field: 'payment_status' },
    { title: 'Payment Amount', field: 'payment_amount' },
    { title: 'Payment Currency', field: 'payment_currency' },
    { title: 'Payer Email', field: 'payer_email' },
    { title: 'Item Name', field: 'item_name' },
    { title: 'Item Number', field: 'item_number' },
    { title: 'Raw', field: 'raw' }
]

export const IPNRecordsFilters: FilterDefinitions = [
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
