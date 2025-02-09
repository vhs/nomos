export const AdminMembershipFields = [
    { title: 'Title', field: 'title' },
    { title: 'Code', field: 'code' },
    { title: 'Description', field: 'description' },
    { title: 'Price', field: 'price' },
    { title: 'Active', field: 'active' },
    { title: 'Private', field: 'private' }
]

export const AdminMembershipFilters = [
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
