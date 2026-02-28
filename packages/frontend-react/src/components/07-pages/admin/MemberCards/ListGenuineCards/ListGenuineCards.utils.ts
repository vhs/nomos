import type { FieldDefinitions, FilterDefinitions } from '@/lib/db/utils/query-filters'

export const ListGenuineCardsFields: FieldDefinitions = [
    { field: 'key', title: 'Card' },
    { field: 'created', title: 'Created' },
    { field: 'issued', title: 'Issued' },
    { field: 'active', title: 'Active' },
    { field: 'paymentid', title: 'Payment Id' },
    { field: 'userid', title: 'User Id' },
    { field: 'owneremail', title: 'Owner Email' },
    { field: 'notes', title: 'Notes' }
]

export const PrimaryListGenuineCardsFilters: FilterDefinitions = [
    {
        id: 'issued',
        label: 'Pending Payment',
        filter: {
            column: 'issued',
            operator: 'is not null'
        }
    }
]
