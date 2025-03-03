import type { AdminMembershipsForm } from './AdminMemberships.types'

import type { FieldDefinitions, FilterDefinitions } from '@/lib/db/utils/query-filters'

export const AdminMembershipFields: FieldDefinitions = [
    { title: 'Title', field: 'title' },
    { title: 'Code', field: 'code' },
    { title: 'Description', field: 'description' },
    { title: 'Price', field: 'price' },
    { title: 'Active', field: 'active' },
    { title: 'Private', field: 'private' }
]

export const AdminMembershipFilters: FilterDefinitions = [
    {
        id: 'Active Memberships',
        label: 'Active Memberships',
        filter: {
            column: 'active',
            operator: '=',
            value: '1'
        }
    },
    {
        id: 'Private Memberships',
        label: 'Private Memberships',
        filter: {
            column: 'private',
            operator: '=',
            value: '1'
        }
    }
]

export const AdminMembershipsDefaultValues: AdminMembershipsForm = {
    code: '',
    title: '',
    description: '',
    price: 0,
    period: 'D',
    activeFlag: false,
    privateFlag: false,
    recurringFlag: false,
    trialFlag: false,
    interval: 0
}
