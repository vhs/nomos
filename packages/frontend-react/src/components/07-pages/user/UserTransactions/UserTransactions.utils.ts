import type { FieldDefinitions, FilterDefinitions } from '@/lib/db/utils/query-filters'

export const UserTransactionFields: FieldDefinitions = [
    { title: 'Date', field: 'date' },
    { title: 'Transaction ID', field: 'txn_id' },
    { title: 'Payer Name', field: 'payer_fname,payer_lname' },
    { title: 'Payer Email', field: 'payer_email' },
    { title: 'PayPal', field: 'pp' },
    { title: 'Amount', field: 'amount' },
    { title: 'Status', field: 'status' }
]

export const UserTransactionFilters: FilterDefinitions = [
    {
        id: 'pending_payments',
        label: 'Pending Payments',
        filter: {
            column: 'status',
            operator: '=',
            value: '0'
        }
    }
]
