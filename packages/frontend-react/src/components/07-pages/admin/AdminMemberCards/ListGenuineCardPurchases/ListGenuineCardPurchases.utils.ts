import { FieldDefinitions, FilterDefinitions, Filters } from '@/lib/db/utils/query-filters'

export const ListGenuineCardPurchasesFields: FieldDefinitions = [
    { field: 'date', title: 'Date' },
    { field: 'status', title: 'Status' },
    { field: 'txn_id', title: 'TXN ID' },
    { field: ['payer_fname', 'payer_lname', 'payer_email', 'user_id'], title: 'User' },
    { field: 'pp', title: 'Processor' },
    { field: ['item_name', 'item_number'], title: 'Item' },
    { field: ['rate_amount', 'currency'], title: 'Price' }
]

export const DefaultListGenuineCardPurchasesFilters: Filters = [
    {
        column: 'item_number',
        operator: '=',
        value: 'vhs_card_2015'
    }
]

export const PrimaryListGenuineCardPurchasesFilters: FilterDefinitions = [
    {
        id: 'showPending',
        label: 'Pending Payments',
        filter: {
            column: 'status',
            operator: '=',
            value: '0'
        }
    },
    {
        id: 'showOrphaned',
        label: 'Orphaned Payments',
        filter: {
            left: {
                column: 'user_id',
                operator: '=',
                value: '0'
            },
            operator: 'and',
            right: {
                column: 'status',
                operator: '=',
                value: '1'
            }
        }
    }
]
